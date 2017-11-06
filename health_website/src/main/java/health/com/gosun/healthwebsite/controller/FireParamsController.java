/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.annotations.Synchronize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.example.qpid.DeviceStatusReceiver;
import com.gosun.healthwebsite.entity.DeviceSignalOperation;
import com.gosun.healthwebsite.entity.SysEquipment;
import com.gosun.healthwebsite.entity.UIFsuInfo;
import com.gosun.healthwebsite.model.DealResult;
import com.gosun.healthwebsite.model.FireParamSetTips;
import com.gosun.healthwebsite.model.FireParamTree;
import com.gosun.healthwebsite.model.GlobalModel;
import com.gosun.healthwebsite.service.LogService;
import com.gosun.healthwebsite.service.SysEquipmentService;
import com.gosun.healthwebsite.service.UIFsuInfoService;
import com.gosun.sas.dto.User;
import com.gosun.sas.utils.UserUtil;
import com.gosun.service.entity.OrgRsp;
import com.gosun.service.org.IOrgService;
import com.mysql.jdbc.StringUtils;

/**
 * @ClassName: ServerInfoController
 * @Description: TODO
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/fire_param")
public class FireParamsController {

	private Collection<OrgRsp> col;
	@Autowired
	private IOrgService orgService;
	@Autowired
	private SysEquipmentService equipmentService;
	@Autowired
	private UIFsuInfoService fsuService;
	@Autowired
	private LogService logService;
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		return new ModelAndView("fireparam/index");
	}

	@RequestMapping(value = { "/modify", "" })
	public ModelAndView modify() {
		return new ModelAndView("param/modify");
	}

	/**
	 * 跳转到电气火灾设备设置结果详情页
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/detail")
	public ModelAndView detail(HttpServletRequest request) {
		// 设备唯一标识equipmentId
		request.setAttribute("equipmentId", request.getParameter("equipmentId"));
		return new ModelAndView("fireparam/detail");
	}

	/**
	 * 获取某个设备设置详情
	 * 
	 * @return
	 */
	@RequestMapping(value = "/initOneFireParams")
	@ResponseBody
	public String initOneFireParams(DeviceSignalOperation ope) {
		Map<String,String>signalMap = new HashMap<String,String>();
		signalMap.put("ID","9999999999");
		ope.setSignalMap(signalMap);
		Map<String, String> data = fsuService.getTSemaphore(ope);
		return JSONObject.fromObject(data).toString();
	}

	/**
	 * 系统设置 电气-火灾 左侧树
	 * 
	 * @return
	 */
	@RequestMapping(value = "/fireParamTree.do")
	public String getFireParamTree() {
		User currUser = UserUtil.getUser();
		if (currUser != null) {
			if (!currUser.getLoginName().equals("sysadmin")
					&& !currUser.getLoginName().equals("admin")) {
				col = new ArrayList<OrgRsp>();
				col.add(orgService.getOrgInfoByOrgId(currUser.getOrgId()));
				List<OrgRsp> list = orgService
						.getChildrenOrgByParentOrgId(currUser.getOrgId());
				getData(list);
				return JSONArray.fromObject(col).toString();
			} else {
				// 这里拿到的是所有的组织机构
				List<OrgRsp> list = orgService.getAllOrgRsp();

				List<FireParamTree> treeList = new ArrayList<>();
				Map<Integer, FireParamTree> fireParamTreeMap = new HashMap<>();
				// 重新设置idStr(后面的设备id不是int，不符合格式)
				// 重新设置显示图标
				for (OrgRsp orgRsp : list) {
					FireParamTree fireParamNode = new FireParamTree();
					try {
						BeanUtils.copyProperties(fireParamNode, orgRsp);
					} catch (IllegalAccessException | InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					fireParamNode.setIdStr(orgRsp.getId() + "");
					fireParamNode.setIcon(getIcon(fireParamNode.getPath()
							.split("#").length));
					fireParamTreeMap.put(fireParamNode.getId(), fireParamNode);
				}

				// 获取设备
				Map<String, Object> searchParams = new HashMap<>();
				searchParams.put("EQ_moduleName", "电气火灾探测器");
				Page<SysEquipment> sysEquipments = equipmentService
						.getSysEquipment(searchParams, 1, 100000, "auto");
				int treeId = 100000;
				for (SysEquipment sysEquipment : sysEquipments) {
					treeId++;
					// 获取fsu
					UIFsuInfo fsuInfo = fsuService.findById(sysEquipment
							.getFsuId());
					if (fsuInfo == null) {
						continue;
					}

					FireParamTree fireParamNode = new FireParamTree();
					fireParamNode.setChildren(null);
					fireParamNode.setDutyRange(null);
					fireParamNode.setDutyRangeName(null);
					fireParamNode.setId(treeId);
					fireParamNode.setName(sysEquipment.getName());
					fireParamNode.setOrderNum(0);
					fireParamNode.setParentId(Integer.parseInt(sysEquipment
							.getOrgId() + ""));
					fireParamNode.setPath(sysEquipment.getPath());
					fireParamNode.setIcon(getIcon(fireParamNode.getPath()
							.split("#").length));
					fireParamNode.setIdStr(sysEquipment.getEquipmentId() + "");
					fireParamNode.setC3mDeviceId(sysEquipment.getC3MDeviceId());
					fireParamNode.setHost(fsuInfo.getName());
					fireParamNode.setHostIp(fsuInfo.getNetAddress());
					fireParamNode.setOrgPath(fsuInfo.getPathName());
					fireParamNode.setFsuId(fsuInfo.getFsuId());
					fireParamNode.setHostPort(fsuInfo.getNetPort());
					treeList.add(fireParamNode);
					// 过滤掉没有设备的分行节点
					String[] parentIds = fireParamNode.getPath().split("#");
					for (String pId : parentIds) {
						if (StringUtils.isNullOrEmpty(pId)
								|| pId.equals(fireParamNode.getIdStr())) {
							continue;
						}
						if (fireParamTreeMap.containsKey(Integer.parseInt(pId))) {
							FireParamTree param = fireParamTreeMap.get(Integer
									.parseInt(pId));
							if (!treeList.contains(param)) {
								treeList.add(param);
							}
						}
					}
				}
				return JSONArray.fromObject(treeList).toString();
			}
		}
		return null;
	}

	@RequestMapping(value = "/setFireParam.do", method = RequestMethod.POST)
	@ResponseBody
	public String setFireParam(HttpServletRequest request) throws InterruptedException {
		String userAccount = UserUtil.getUser().getAccountId() + "";
		DealResult result = new DealResult();
		result.setRet(false);
		Map<String, String[]> settingParams = request.getParameterMap();
		
		//存储设备要修改的参数信息
		Map<String,String> signalMap = new HashMap<String,String>();
		for (Entry<String, String[]> en : settingParams.entrySet()) {
			//额外参数去除掉
			if ("equipmentIds".equals(en.getKey())) {
				continue;
			}
			for(String str:en.getValue()){
				signalMap.put(en.getKey(),str);
			}
		}
		// 存储设备其他信息
		List<DeviceSignalOperation> devices = new ArrayList<DeviceSignalOperation>();
		Object[] obj = JSONArray.fromObject(
				settingParams.get("equipmentIds")[0]).toArray();
		for(int i=0; i<obj.length;i++){
			DeviceSignalOperation device = (DeviceSignalOperation) JSONObject
					.toBean(JSONObject.fromObject(obj[i]),
							DeviceSignalOperation.class);
				device.setSignalMap(signalMap);
				device.setUserId(UserUtil.getUser().getAccountId());
				devices.add(device);
			}
			
		
		// 初始化设置提示
		FireParamSetTips initTips = new FireParamSetTips();
		initTips.setBottomTips("总共需设置设备" + devices.size() + ",已完成0台，待设置"+ devices.size() + "台");
		//每台设备的提示信息
		Map<String, String>eachRowTips = new HashMap<String,String>();
		// 初始化设置提示
		initTips.setEachRowTips(eachRowTips);
		GlobalModel.USER_SET_TIPS.put(userAccount, initTips);
		//已设置台数；
		int settingNum = 0;
		//设置失败设备台数
		int failedEquNum = 0;
		//总设置成功参数个数
		int successArgNum = 0;
		//遍历设备
		for (DeviceSignalOperation dso : devices) {
					//每台设备设置参数成功数
					int successNum = 0;
					//每台设备设置参数失败数
					int failedNum = 0;
					List<DeviceSignalOperation> dsoList = fsuService.setTSemaphore(dso); //设置结果
					if (dsoList != null && dsoList.size()>0) {
						for(DeviceSignalOperation dsoIndex:dsoList){
							logService.log("设置监控点值"+dsoIndex.getOperationStatus(), "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tSemaphoreID:"+dso.getSignalId());
							if(dsoIndex.getOperationStatus().equals("成功") ){
								successNum++;
							}else{
								failedNum++;
							}
						}
						successArgNum+=successNum;
						eachRowTips.put(dso.getC3mDeviceId(), "共设置参数"+dsoList.size()+"个,成功"+successNum+"个，失败"+failedNum+"个");
						initTips.setEachRowTips(eachRowTips);
						result.setRet(true);
						result.setMessage("成功设置设备"+(devices.size()-failedEquNum)+"台，失败"+failedEquNum+"台！共设置参数"+dsoList.size()*devices.size()+"个,成功"+successArgNum+"个，失败"+(dsoList.size()*devices.size()-successArgNum)+"个");
					} else {
						failedEquNum++;
						logService.log("发生异常,设置监控点值无返回结果", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tSemaphoreIDs:"+dso.getSignalMap().toString());
						eachRowTips.put(dso.getC3mDeviceId(), "设置监控点参数值发生异常,设置失败！");
						initTips.setEachRowTips(eachRowTips);
						result.setRet(false);
						result.setMessage("成功设置设备"+(devices.size()-failedEquNum)+"台，失败"+failedEquNum+"台！");
					}
					settingNum++;
					initTips.setBottomTips("总共需设置设备" + devices.size() + ",已完成"+settingNum+"台，待设置"+(devices.size()-settingNum) + "台");
					GlobalModel.USER_SET_TIPS.put(userAccount, initTips);
				}
		return JSONObject.fromObject(result).toString();
	}


	@RequestMapping(value = "/tips", method = RequestMethod.POST)
	@ResponseBody
	public String getTips() {
		String userAccount = UserUtil.getUser().getAccountId() + "";
		return JSONObject
				.fromObject(GlobalModel.USER_SET_TIPS.get(userAccount))
				.toString();
	}

	// ////////////////////////////////////////////////////////////辅助工具类///////////////////////////////////////////////////////////////////////////
	/**
	 * 根据树节点path的#个数获取树节点图标显示
	 * 
	 * @param i
	 *            树节点path的#个数
	 * @return
	 */
	private String getIcon(int i) {
		switch (i) {
		case 2:
			return "../content/images/tree/zh.png";
		case 3:
			return "../content/images/tree/fh.png";
		case 4:
			return "../content/images/tree/bh.png";
		case 5:
			return "../content/images/tree/bh.png";
		default:
			return "../content/images/tree/bh.png";
		}

	}

	private void getData(List<OrgRsp> list) {
		if (list != null && list.size() > 0) {
			col.addAll(list);
			for (OrgRsp obj : list) {
				List<OrgRsp> result = orgService
						.getChildrenOrgByParentOrgId(obj.getId());
				if (result != null && result.size() > 0) {
					getData(result);
				}
			}
		}
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/multilIndex", "" })
	public ModelAndView mutilIndex() {
		return new ModelAndView("fireparam/multilIndex");
	}
	
	/**
	 * 系统设置 多回路电气-火灾 左侧树
	 * 
	 * @return
	 */
	@RequestMapping(value = "/multilFireParamTree.do")
	public String getMultilFireParamTree() {
		User currUser = UserUtil.getUser();
		if (currUser != null) {
			if (!currUser.getLoginName().equals("sysadmin")
					&& !currUser.getLoginName().equals("admin")) {
				col = new ArrayList<OrgRsp>();
				col.add(orgService.getOrgInfoByOrgId(currUser.getOrgId()));
				List<OrgRsp> list = orgService
						.getChildrenOrgByParentOrgId(currUser.getOrgId());
				getData(list);
				return JSONArray.fromObject(col).toString();
			} else {
				// 这里拿到的是所有的组织机构
				List<OrgRsp> list = orgService.getAllOrgRsp();

				List<FireParamTree> treeList = new ArrayList<>();
				Map<Integer, FireParamTree> fireParamTreeMap = new HashMap<>();
				// 重新设置idStr(后面的设备id不是int，不符合格式)
				// 重新设置显示图标
				for (OrgRsp orgRsp : list) {
					FireParamTree fireParamNode = new FireParamTree();
					try {
						BeanUtils.copyProperties(fireParamNode, orgRsp);
					} catch (IllegalAccessException | InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					fireParamNode.setIdStr(orgRsp.getId() + "");
					fireParamNode.setIcon(getIcon(fireParamNode.getPath()
							.split("#").length));
					fireParamTreeMap.put(fireParamNode.getId(), fireParamNode);
				}

				// 获取设备
				Map<String, Object> searchParams = new HashMap<>();
				searchParams.put("EQ_moduleName", "多回路电气火灾探测器");
				Page<SysEquipment> sysEquipments = equipmentService
						.getSysEquipment(searchParams, 1, 100000, "auto");
				int treeId = 100000;
				for (SysEquipment sysEquipment : sysEquipments) {
					treeId++;
					// 获取fsu
					UIFsuInfo fsuInfo = fsuService.findById(sysEquipment
							.getFsuId());
					if (fsuInfo == null) {
						continue;
					}

					FireParamTree fireParamNode = new FireParamTree();
					fireParamNode.setChildren(null);
					fireParamNode.setDutyRange(null);
					fireParamNode.setDutyRangeName(null);
					fireParamNode.setId(treeId);
					fireParamNode.setName(sysEquipment.getName());
					fireParamNode.setOrderNum(0);
					fireParamNode.setParentId(Integer.parseInt(sysEquipment
							.getOrgId() + ""));
					fireParamNode.setPath(sysEquipment.getPath());
					fireParamNode.setIcon(getIcon(fireParamNode.getPath()
							.split("#").length));
					fireParamNode.setIdStr(sysEquipment.getEquipmentId() + "");
					fireParamNode.setC3mDeviceId(sysEquipment.getC3MDeviceId());
					fireParamNode.setHost(fsuInfo.getName());
					fireParamNode.setHostIp(fsuInfo.getNetAddress());
					fireParamNode.setOrgPath(fsuInfo.getPathName());
					fireParamNode.setFsuId(fsuInfo.getFsuId());
					fireParamNode.setHostPort(fsuInfo.getNetPort());
					treeList.add(fireParamNode);
					// 过滤掉没有设备的分行节点
					String[] parentIds = fireParamNode.getPath().split("#");
					for (String pId : parentIds) {
						if (StringUtils.isNullOrEmpty(pId)
								|| pId.equals(fireParamNode.getIdStr())) {
							continue;
						}
						if (fireParamTreeMap.containsKey(Integer.parseInt(pId))) {
							FireParamTree param = fireParamTreeMap.get(Integer
									.parseInt(pId));
							if (!treeList.contains(param)) {
								treeList.add(param);
							}
						}
					}
				}
				return JSONArray.fromObject(treeList).toString();
			}
		}
		return null;
	}
}
