/** 
*
*/
package com.gosun.healthwebsite.controller;

import java.util.Arrays;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.healthwebsite.entity.AlarmForwardRule;
import com.gosun.healthwebsite.service.AlarmForwardRuleService;

/** 
 * @ClassName: AlarmForwardController 
 * @Description: TODO 
 * @author linnan
 * @date 2017年6月22日 上午10:03:56  
 */
@RestController
@RequestMapping("/alarmForward")
public class AlarmForwardController {
	
	@Autowired
	private AlarmForwardRuleService alarmForwardRuleService;

	@RequestMapping(value={"/index",""})
	public ModelAndView index(){
		return new ModelAndView("alarm_forward/index");
	}
	
	@RequestMapping(value="getAllRule")
	public String getAllRule(){
		return JSONArray.fromObject(alarmForwardRuleService.getAllRule()).toString();
	}
	
	@RequestMapping(value="update")
	public String update(String rulesStr){
		JSONArray jsonArray = JSONArray.fromObject(rulesStr);
		List<AlarmForwardRule> alarmForwardRuleList =Arrays.asList((AlarmForwardRule[])JSONArray.toArray(jsonArray,AlarmForwardRule.class));
		alarmForwardRuleService.save(alarmForwardRuleList);
		return JSONObject.fromObject("{ret:1,msg:'修改成功'}").toString();
	}
}
