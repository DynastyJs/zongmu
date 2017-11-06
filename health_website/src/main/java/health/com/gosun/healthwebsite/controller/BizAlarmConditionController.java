/**
 * @Title: BizAlarmConditionController.java 	
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.BizAlarmCondition;
import com.gosun.healthwebsite.model.FireParamTree;
import com.gosun.healthwebsite.service.BizAlarmConditionService;
import com.gosun.sas.log.Log;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @ClassName: BizAlarmConditionController 
 * @Description: 告警条件控制类 
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/alarmcon")
public class BizAlarmConditionController {
	@Autowired
	private BizAlarmConditionService alarmConService; 
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			BizAlarmCondition alarmCon = alarmConService.getBizAlarmCondition(id);
			return JSONObject.fromObject(alarmCon).toString();
		}
		return null;
	}
	
	@Log(desc="新增参数阀值",objId="#{alarmCon.conditionId}",objName="#{alarmCon.propertyName}")
	@RequestMapping(value = "/save.do",method = RequestMethod.POST)
	public String save(BizAlarmCondition alarmCon) {
		alarmConService.saveBizAlarmCondition(alarmCon);
		return JSONObject.fromObject("{ret:1,msg:'新增成功'}").toString();
	}
	
	@Log(desc="修改参数阀值",objId="#{alarmCon.conditionId}",objName="#{alarmCon.propertyName}")
	@RequestMapping(value = "/update.do",method = RequestMethod.POST)
	public String update(BizAlarmCondition alarmCon) {
		alarmConService.saveBizAlarmCondition(alarmCon);
		return JSONObject.fromObject("{ret:1,msg:'修改成功'}").toString();
	}
	
	@Log(desc="删除参数阀值",objId="#{ids}")
	@RequestMapping(value = "/delete.do",method = RequestMethod.POST)
	public String delete(String ids) {
		alarmConService.deleteBizAlarmCondition(ids);
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

        Page<BizAlarmCondition> alarmCons = alarmConService.getBizAlarmCondition(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(alarmCons).toString();
    }
	
   
    
}
