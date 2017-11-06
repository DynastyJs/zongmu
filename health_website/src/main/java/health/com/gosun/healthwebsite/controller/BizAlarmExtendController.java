/**
 * @Title: BizAlarmExtendController.java 	
 * @Package com.gosun.healthservice.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-5-18 下午1:43:06 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.BizAlarm;
import com.gosun.healthwebsite.entity.BizAlarmExtend;
import com.gosun.healthwebsite.service.BizAlarmExtendService;
import com.gosun.healthwebsite.service.BizAlarmService;
import com.gosun.sas.dto.User;
import com.gosun.sas.log.Log;
import com.gosun.sas.utils.UserUtil;

/**
 * @ClassName: BizAlarmExtendController 
 * @Description: 告警信息扩展类用于关注报修 
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/alarmexd")
public class BizAlarmExtendController {
	@Autowired
	private BizAlarmExtendService alarmExdService;
	@Autowired
	private BizAlarmService bizAlarmService;
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			BizAlarmExtend alarmExd = alarmExdService.getBizAlarmExtend(id);
			return JSONObject.fromObject(alarmExd).toString();
		}
		return null;
	}
	
	@Log(desc="新增报警扩展信息",objId="#{alarmExd.alarmExtendId}")
	@RequestMapping(value = "/save.do")
	public String save(BizAlarmExtend alarmExd) {
		User currUser = UserUtil.getUser();
		if(alarmExd.getIds().indexOf(",")>0){
			String idstr = alarmExd.getIds().substring(0, alarmExd.getIds().length()-1);
			String strArr[] = idstr.split(",");
			for(String o : strArr){
				BizAlarmExtend  obj = new BizAlarmExtend();
				obj.setAlarmId(Long.parseLong(o));
				obj.setProcessResult(alarmExd.getProcessResult());
				obj.setProcessDesc(alarmExd.getProcessDesc());
				obj.setProcessFlag(alarmExd.getProcessFlag());
				obj.setProcessUser(currUser.getUserName());
				alarmExdService.saveBizAlarmExtend(obj);
			}
			
		}else{
			alarmExd.setProcessUser(currUser.getUserName());
			alarmExdService.saveBizAlarmExtend(alarmExd);
		}
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}

	/**
	 *  save.do 的修改版，通过equipmentId propertyName 将这个设备的这中状态的所有告警 以 processResult 的方式处理掉
	 * @param equipmentId
	 * @param propertyName
	 * @param processResult
	 * @param processDesc
	 * @param processFlag
	 * @return
	 */
	@Log(desc="新增报警扩展信息")
	@RequestMapping(value = "setEqmAlarmDone.do",method = RequestMethod.POST)
	public String setEqmAlarmDone(@RequestParam(value="ids") String ids,
								  @RequestParam(value = "equipmentId")Long equipmentId,
								  @RequestParam(value="propertyName") String propertyName,
								  @RequestParam(value = "processResult") String processResult,
								  @RequestParam(value = "processDesc") String processDesc,
								  @RequestParam(value = "processFlag") char processFlag,String alarmType){
		List<BizAlarm> alarmsList = null;
		if(propertyName.equals("-1")){
			if(ids.length()>0){
				alarmsList = new ArrayList<BizAlarm>();
				String strArr[] = ids.split(",");
				for(String o : strArr){
					alarmsList.addAll(bizAlarmService.getAlarmByEid(Long.parseLong(o),alarmType));
				}
			}else{
				alarmsList = bizAlarmService.getAlarmByEid(equipmentId,alarmType);
			}
		}else{
			alarmsList = bizAlarmService.getAlarmByEidAndPName(equipmentId,propertyName);
		}

		User currUser = UserUtil.getUser();
		for(BizAlarm alarm: alarmsList){
			BizAlarmExtend  bizAlarmExtend = new BizAlarmExtend();
			bizAlarmExtend.setAlarmId(alarm.getAlarmId());
			bizAlarmExtend.setProcessUser(currUser.getUserName());
			bizAlarmExtend.setProcessResult(processResult);
			bizAlarmExtend.setProcessDesc(processDesc);
			bizAlarmExtend.setProcessFlag(processFlag);
			alarmExdService.saveBizAlarmExtend(bizAlarmExtend);
//			if(propertyName.equals("-1")){//如果是录像存储异常和摄像机视频异常处理后就直接结束报警
				bizAlarmService.updateFinish(alarm.getAlarmId(),alarm.getEquipmentId(),propertyName);
//			}
		}
		
		if(propertyName.equals("-1")){
			//判断是否删除对设备的关注报修状态
			bizAlarmService.deleteFocusAndRepairStatus(equipmentId, alarmType);
		}
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();

	}
	
//	@Log(desc="设置关注状态",objId="#{alarmExd.alarmExtendId}")
//	@RequestMapping(value = "/focus.do")
//	public String focus(BizAlarmExtend alarmExd) {
//		if(alarmExd.getAlarmExtendId()!=null){
//			BizAlarmExtend obj = alarmExdService.getBizAlarmExtend(alarmExd.getAlarmExtendId());
//			obj.setFocusFlag(alarmExd.getFocusFlag());
//		}else{
//			alarmExd.setProcessFlag('0');
//		}
//		alarmExdService.saveBizAlarmExtend(alarmExd);
//		if(alarmExd.getFocusFlag()=='0'){
//			return JSONObject.fromObject("{ret:1,msg:'取消关注成功'}").toString();
//		}
//		return JSONObject.fromObject("{ret:1,msg:'设置关注成功'}").toString();
//	}
	
	@Log(desc="修改报警扩展信息",objId="#{alarmExd.alarmExtendId}")
	@RequestMapping(value = "/update.do")
	public String update(BizAlarmExtend alarmExd) {
		alarmExdService.saveBizAlarmExtend(alarmExd);
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}
	
	@Log(desc="删除报警扩展信息",objId="#{ids}")
	@RequestMapping(value = "/delete.do")
	public String delete(String ids) {
		alarmExdService.deleteBizAlarmExtend(ids);
		return JSONObject.fromObject("{ret:1,msg:'删除成功'}").toString();
	}
	
    /**
     * 
     * @Title: getPageList 
     * @Description: 获取任务的分页数据 
     * @param @param pageNumber
     * @param @param pageSize
     * @param @param sortType
     * @param @param model
     * @param @param request
     * @param @return    设定文件 
     * @return String    返回类型 
     * @throws
     */
    @RequestMapping(value="/getPageList.do")
    public String  getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request) {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

        Page<BizAlarmExtend> alarmExds = alarmExdService.getBizAlarmExtend(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(alarmExds).toString();
    }
	
}
