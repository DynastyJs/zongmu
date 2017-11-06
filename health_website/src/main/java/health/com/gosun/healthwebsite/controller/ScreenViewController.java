package com.gosun.healthwebsite.controller;

import java.net.URLDecoder;
import java.util.List;

import net.sf.json.JSONObject;
import net.sf.json.JSONString;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.healthwebsite.model.FaultTrend;
import com.gosun.healthwebsite.model.FaultTrendColumn;
import com.gosun.healthwebsite.model.Organization;
import com.gosun.healthwebsite.model.RealTimeFault;
import com.gosun.healthwebsite.model.UntreatedAlarm;
import com.gosun.healthwebsite.service.ScreenViewService;
import com.gosun.service.entity.OrgRsp;
import com.gosun.service.org.IOrgService;

/**
 * @ClassName: ScreenViewController 
 * @Description: 大屏显示数据接口
 * @author liwj
 * @date 2016-11-8 下午10:00:00
 */
@RestController
@RequestMapping("/screenView")
public class ScreenViewController {
	@Autowired
	private IOrgService orgService;
	@Autowired
	private ScreenViewService screenViewService;
	
	//实时设备数量及故障率
	@RequestMapping(value = "/realTimeFault",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	public String realTimeFault(Integer orgid,Integer type){
		RealTimeFault result = screenViewService.getRealTimeFault(orgid, type);
		String json = JSONObject.fromObject(result).toString();
		return json;
	}
	
	//故障趋势图
	@RequestMapping(value = "/faultTrend",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	public String faultTrend(Integer orgid,Integer type){
		FaultTrend result = screenViewService.getFalutTrendData(orgid, type);
		String json = JSONObject.fromObject(result).toString();
		return json;
	}
	
	//未处理报警数量
	@RequestMapping(value = "/untreatedAlarm",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	public String untreatedAlarm(Integer orgid,Integer type){
		UntreatedAlarm result = screenViewService.getUntreatedAlarmData(orgid,type,1);
		String json = JSONObject.fromObject(result).toString();
		return json;
	}
	
	//处理中报警数量
	@RequestMapping(value = "/processingAlarm",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	public String processingAlarm(Integer orgid,Integer type){
		UntreatedAlarm result = screenViewService.getUntreatedAlarmData(orgid,type,2);
		String json = JSONObject.fromObject(result).toString();
		return json;
	}
	
	//故障趋势图
	@RequestMapping(value = "/faultTrendColumn",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	public String faultTrendColumn(Integer orgid,Integer time){
		FaultTrendColumn result = screenViewService.getFaultTrendColumn(orgid,time);
		String json = JSONObject.fromObject(result).toString();
		return json;
	}
	
	//组织结构
	@RequestMapping(value = "/organization",method=RequestMethod.GET,produces="text/html;charset=UTF-8")
	public String organization(){
		List<OrgRsp> p = orgService.getAllOrgRsp();
		Organization result = screenViewService.getOrganization(p);
		String json = JSONObject.fromObject(result).toString();
		System.out.println(json);
		return json;
	}
	
	//组织结构坐标上送
	@RequestMapping(value = "/organizationPosUp",method=RequestMethod.POST)
	@ResponseBody
	public String organizationPosUp(@RequestBody String jsonString){
		String result = "";
		try{
			jsonString = URLDecoder.decode(jsonString,"UTF-8");
			if(jsonString.endsWith("=")){
				jsonString = jsonString.substring(0, jsonString.length()-1);
			}
			result = screenViewService.organizationPosUp(jsonString);
			return JSONObject.fromObject("{result:'"+result+"',msg:''}").toString();
		}
		catch (Exception e ){
			result = e.getMessage();
			return JSONObject.fromObject("{result:'error',msg:'"+result+"'}").toString();
		}
		
	}
}
