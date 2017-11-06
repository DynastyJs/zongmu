/**
 * @Title: BizAlarmController.java 	
 * @Package com.gosun.healthservice.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-5-18 下午1:43:06 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.BizAlarm;
import com.gosun.healthwebsite.service.BizAlarmService;
import com.gosun.sas.log.Log;

/**
 * @ClassName: BizAlarmController 
 * @Description: 告警信息控制类 
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/alarm")
public class BizAlarmController {
	@Autowired
	private BizAlarmService alarmService; 
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			BizAlarm alarm = alarmService.getBizAlarm(id);
			return JSONObject.fromObject(alarm).toString();
		}
		return null;
	}
	
	@Log(desc="新增报警信息",objId="#{alarm.alarmId}")
	@RequestMapping(value = "/save.do")
	public String save(BizAlarm alarm) {
		alarmService.saveBizAlarm(alarm);
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}
	
	
	@Log(desc="修改报警信息",objId="#{alarm.alarmId}")
	@RequestMapping(value = "/update.do")
	public String update(BizAlarm alarm) {
		alarmService.saveBizAlarm(alarm);
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}
	
	@Log(desc="删除报警信息",objId="#{ids}")
	@RequestMapping(value = "/delete.do")
	public String delete(String ids) {
		alarmService.deleteBizAlarm(ids);
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

        Page<BizAlarm> alarms = alarmService.getBizAlarm(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(alarms).toString();
    }
	
}
