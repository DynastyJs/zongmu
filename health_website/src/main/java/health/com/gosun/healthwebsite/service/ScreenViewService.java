package com.gosun.healthwebsite.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.utils.date.DateTimeUtils;
import com.gosun.healthwebsite.entity.PscpOrganizePos;
import com.gosun.healthwebsite.model.FalutTrendData;
import com.gosun.healthwebsite.model.FaultTrend;
import com.gosun.healthwebsite.model.FaultTrendColumn;
import com.gosun.healthwebsite.model.FaultTrendColumnData;
import com.gosun.healthwebsite.model.Organization;
import com.gosun.healthwebsite.model.OrganizationData;
import com.gosun.healthwebsite.model.RealTimeFalutData;
import com.gosun.healthwebsite.model.RealTimeFault;
import com.gosun.healthwebsite.model.UntreatedAlarm;
import com.gosun.healthwebsite.model.UntreatedAlarmData;
import com.gosun.healthwebsite.repository.BizAlarmDAO;
import com.gosun.healthwebsite.repository.PscpOrganizePosDao;
import com.gosun.healthwebsite.repository.PscpOrganizePosDaoImpl;
import com.gosun.healthwebsite.repository.UISysDevStatusDAO;
import com.gosun.healthwebsite.repository.UISysDevStatusDaoImpl;
import com.gosun.service.entity.OrgRsp;

//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class ScreenViewService {
	@Autowired
	private UISysDevStatusDAO uISysDevStatusDAO;
	@Autowired
	private UISysDevStatusDaoImpl uISysDevStatusDaoImpl;
	@Autowired
	private PscpOrganizePosDao pscpOrganizePosDao;
	@Autowired
	private PscpOrganizePosDaoImpl pscpOrganizePosDaoImpl;
	@Autowired
	private BizAlarmDAO bizAlarmDAO;
	
	//实时设备数量及故障率
	public RealTimeFault getRealTimeFault(Integer orgId,Integer type){
		RealTimeFault result = new RealTimeFault();
		try{
			List<RealTimeFalutData> data = uISysDevStatusDaoImpl.getRealFaultDate(orgId,getSearchTypeByTypeId(type),getNameByTypeId(type));
			result.setResult("true");
			result.setData(data);
			return result;
		}catch(Exception e){
			e.printStackTrace();
			result.setResult("error");
			result.setMessage(e.getMessage());
			return result;
		}
	}
	
	//故障趋势图
	public FaultTrend getFalutTrendData(Integer orgId,Integer type){
		FaultTrend result = new FaultTrend();
		List<OrgRsp> allOrg = new ArrayList<OrgRsp>();
		try{
			List<FalutTrendData> data = uISysDevStatusDaoImpl.getFalutThrendCount(orgId,getTypeById(type));
			result.setResult("success");
			result.setMessage("");
			result.setData(data);
			return result;
		}catch (Exception e){
			e.printStackTrace();
			result.setResult("error");
			result.setMessage(e.getMessage());
			return result;
		}
	}
	
	//处理报警数量
	public UntreatedAlarm getUntreatedAlarmData(Integer orgId,Integer type,int t){
		UntreatedAlarm result = new UntreatedAlarm();
		List<UntreatedAlarmData> data = new ArrayList<UntreatedAlarmData>();
		try{
			if(t==1){//未处理
				data  = uISysDevStatusDaoImpl.getUntreatedAlarmData(orgId, getTypeById(type));
			}else{//处理中
				data  = uISysDevStatusDaoImpl.getProcessingAlarmData(orgId, getTypeById(type));
			}
			result.setResult("success");
			result.setMessage("");
			result.setData(data);
			return result;
		}catch(Exception e){
			e.printStackTrace();
			result.setResult("error");
			result.setMessage(e.getMessage());
			return result;
		}
	}
	
	//故障趋势图
	public FaultTrendColumn getFaultTrendColumn(Integer orgId,Integer type){
		String beginTime;
		switch(type){
		case 1:
			beginTime = DateTimeUtils.getTime("yyyy/MM/dd hh:mm:ss",DateTimeUtils.getDateByByDaysInt(-365));
			break;
		case 2:
			beginTime = DateTimeUtils.getTime("yyyy/MM/dd hh:mm:ss",DateTimeUtils.getDateByByDaysInt(-31));
			break;
		case 3:
			beginTime = DateTimeUtils.getTime("yyyy/MM/dd hh:mm:ss",DateTimeUtils.getDateByByDaysInt(-1));
			break;
		default:
			return null;
		}
		FaultTrendColumn result = new FaultTrendColumn();
		List<FaultTrendColumnData> data = new ArrayList<FaultTrendColumnData>();
		TreeMap<String,FaultTrendColumnData> map = new TreeMap<String,FaultTrendColumnData>();
		try{
			
			data = uISysDevStatusDaoImpl.getFaultTrendColumnData(orgId, beginTime);
			result.setResult("success");
			result.setMessage("");
			result.setData(data);
			return result;
		}catch(Exception e){
			e.printStackTrace();
			result.setResult("error");
			result.setMessage(e.getMessage());
			return result;
		}
		
	}
	//故障趋势图
	
	private List<FaultTrendColumnData> sort(TreeMap<String,FaultTrendColumnData> map){
		List<FaultTrendColumnData> data = new ArrayList<FaultTrendColumnData>();
		for(int i=1;i<12;i++){
			data.add(map.get(getTypeById(i)));
		}
		return data;
	}
	
	//组织结构
	public Organization getOrganization(List<OrgRsp> p){
		
		Organization result = new Organization();
		List<OrganizationData> data = new ArrayList<OrganizationData>();
		try{
			List<PscpOrganizePos> list = pscpOrganizePosDao.findAllTable();
			
			for(OrgRsp or : p){
				OrganizationData od = new OrganizationData();
				od.setOrganizeId(or.getId());
				od.setOrganizeName(or.getName());
				od.setParientId(or.getParentId());
				od.setOrgainzeCode(or.getOrgCode());
				if(list==null||list.isEmpty()){
					od.setOrgX("-1");
					od.setOrgY("-1");
					od.setAreaName(null);
					od.setLinkMan(null);
					od.setLinkPhoneNumber(null);
					od.setWarrantyMan(null);
					od.setWarrantyPhoneNumber(null);
					od.setArealevel(-1);
					od.setIconkey(-1);
					data.add(od);
					continue;
				}
				for(PscpOrganizePos pos : list){
					if(pos.getOrgId()==or.getId()){
						od.setOrgX(pos.getOrgX());
						od.setOrgY(pos.getOrgY());
						od.setAreaName(pos.getAreaName());
						od.setLinkMan(pos.getLinkMan());
						od.setLinkPhoneNumber(pos.getLinkPhoneNumber());
						od.setWarrantyMan(pos.getWarrantyMan());
						od.setWarrantyPhoneNumber(pos.getWarrantyPhoneNumber());
						od.setArealevel(pos.getAreaLevel());
						od.setIconkey(pos.getIconKey());
						break;
					}
					od.setOrgX("-1");
					od.setOrgY("-1");
					od.setAreaName(null);
					od.setLinkMan(null);
					od.setLinkPhoneNumber(null);
					od.setWarrantyMan(null);
					od.setWarrantyPhoneNumber(null);
					od.setArealevel(-1);
					od.setIconkey(-1);
				}
				data.add(od);
			}
			result.setResult("success");
			result.setMessage("");
			result.setData(data);
			return result;
		}catch(Exception e){
			e.printStackTrace();
			result.setResult("error");
			result.setMessage(e.getMessage());
			return result;
		}
		
	}
	//组织结构
	
	//组织结构坐标上送
	public String organizationPosUp(String jsonString){
		try{
			JSONObject jsonObject = JSONObject.fromObject(jsonString);
			JSONArray array = jsonObject.getJSONArray("data");
			List<PscpOrganizePos> list = JSONArray.toList(array, PscpOrganizePos.class);
			pscpOrganizePosDao.save(list);
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return e.getMessage();
		}
	}
	
	//检查是否存在报警
	public void checkAlarmPos(){
		try{
			pscpOrganizePosDaoImpl.updateIcon();
		}catch (Exception e){
			e.printStackTrace();
		}
	}
	
	private void getAllChilend(OrgRsp p,List<OrgRsp> allOrg){
		if(p.getChildren()==null||p.getChildren().isEmpty()){
			
		}else{
			List<OrgRsp> c = p.getChildren();
			for(int i=0;i<c.size();i++){
				allOrg.add(c.get(i));
				getAllChilend(c.get(i),allOrg);
			}
		}
	}
	
	private String getTypeById(Integer type){
		switch(type){
		case 1:
			return "B类网络设备异常";
		case 2:
			return "B类网络设备异常";
		case 3:
			return "服务器系统资源异常";
		case 4:
			return "服务器系统资源异常";
		case 5:
			return "硬盘录像机硬盘异常";
		case 6:
			return "UPS工作异常";
		case 7:
			return "市电异常";
		case 8:
			return "温湿度异常";
		case 9:
			return "DI输入报警";
		case 10:
			return "录像存储异常";
		case 11:
			return "录像存储异常";
		case 12:
			return "摄像机视频异常";
		default:
			return null;
		}
	}
	
	private String getNameByTypeId(Integer type){
		switch(type){
		case 1:
			return "网络状态";
		case 2:
			return "网络状态";
		case 3:
			return "服务器/PC资源状态";
		case 4:
			return "服务器/PC资源状态";
		case 5:
			return "存储设备硬盘状态";
		case 6:
			return "UPS工作状态";
		case 7:
			return "市电供应";
		case 8:
			return "温湿度监测";
		case 9:
			return "DI输入报警";
		case 10:
			return "录像存储预警";
		case 11:
			return "录像存储预警";
		case 12:
			return "视频质量诊断";
		default:
			return null;
		}
	}
	
	private String getSearchTypeByTypeId(Integer type){
		switch(type){
		case 1:
			return "NET_GROUP_TYPE";
		case 2:
			return "NET_GROUP_TYPE";
		case 3:
			return "ERROR_GROUP_TYPE";
		case 4:
			return "ERROR_GROUP_TYPE";
		case 5:
			return "ERROR_GROUP_TYPE";
		case 6:
			return "RING_GROUP_TYPE";
		case 7:
			return "RING_GROUP_TYPE";
		case 8:
			return "RING_GROUP_TYPE";
		case 9:
			return "RING_GROUP_TYPE";
		case 10:
			return "ERROR_GROUP_TYPE";
		case 11:
			return "ERROR_GROUP_TYPE";
		case 12:
			return "ERROR_GROUP_TYPE";
		default:
			return null;
		}
	}
	
	private Integer getIdByType(String type){
		switch(type){
		case "A类网络设备离线":
			return 1;
		case "B类网络设备离线":
			return 2;
		case "服务器系统资源异常":
			return 3;
		case "PC系统资源异常":
			return 4;
		case "存储设备硬盘状态异常":
			return 5;
		case "UPS工作异常":
			return 6;
		case "市电异常":
			return 7;
		case "温湿度异常":
			return 8;
		case "DI输入报警":
			return 9;
		case "录像存储异常":
			return 10;
		case "录像存储时间异常":
			return 11;
		case "摄像机视频异常":
			return 12;
		default:
			return -1;
		}
	}
	
	private String getLevel(int c){
		switch(c){
		case 0:
			return "紧急";
		case 1:
			return "重要";
		case 2:
			return "普通";
		default:
			return "未知";
		}
	}
}
