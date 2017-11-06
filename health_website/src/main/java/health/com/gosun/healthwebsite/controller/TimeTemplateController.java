/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.TimeTemplate;
import com.gosun.healthwebsite.entity.TimeTemplateParam;
import com.gosun.healthwebsite.entity.TimeTemplateParamSpan;
import com.gosun.healthwebsite.repository.TimeTemplateDAOImpl;
import com.gosun.healthwebsite.service.TimeTemplateService;
import com.gosun.sas.log.Log;
import com.gosun.sas.utils.CalendarUtils;

/**
 * @ClassName: ServerInfoController
 * @Description: TODO
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/plan")
public class TimeTemplateController {
	@Autowired
	private TimeTemplateService templateService;
	@Autowired
	private TimeTemplateDAOImpl timeTemplateDAOImpl;

	@RequestMapping(value = { "/index", "" })
	public ModelAndView plan() {
		return new ModelAndView("plan/index");
	}

	@RequestMapping(value = { "/rule", "" })
	public ModelAndView rule() {
		return new ModelAndView("plan/rule");
	}

	@RequestMapping(value = { "/list", "" })
	public ModelAndView list() {
		return new ModelAndView("plan/chnnlist");
	}

	@RequestMapping(value = "/findById.do")
	public String findById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			TimeTemplate template = templateService.getById(id);
			template.setTimeTemplateParamList(templateService.getParamList(id));
			for (TimeTemplateParam param : template.getTimeTemplateParamList()) {
				param.setListTimeTemplateParamSpan(templateService
						.getSpanListByParamTmpId(param.getId()));
			}
			return JSONObject.fromObject(template).toString();
		}
		return null;
	}

	@Log(desc = "新增录像计划", objId = "#{template.id}",objName="#{template.name}")
	@RequestMapping(value = "/save.do",method=RequestMethod.POST)
	public String save(TimeTemplate template) {
		TimeTemplate findObj = templateService.findByName(template.getName().trim());
		if(findObj!=null){
			return JSONObject.fromObject("{ret:0,msg:'保存失败，名称重复!'}").toString();
		}
		if (template.getPlans() != null) {
			JSONArray jsonArr = JSONArray.fromObject(template.getPlans());
			if (jsonArr != null && jsonArr.size() > 0) {
				HashSet<Integer> set = new HashSet<Integer>();
				for (int i = 0; i < jsonArr.size(); i++) {
					JSONObject obj = JSONObject.fromObject(jsonArr.get(i));
					TimeTemplateParamSpan span = new TimeTemplateParamSpan();
					int start = obj.getInt("StartTime");
					int end = obj.getInt("Stoptime");
					// int type = obj.getInt("Label");
					int week = obj.getInt("Week") == 0 ? 7 : obj.getInt("Week");
					span.setStartDate(CalendarUtils.covertSecondsToDate(start));
					span.setEndDate(CalendarUtils.covertSecondsToDate(end));
					if (set.contains(week)) {
						for (TimeTemplateParam timeTemplateParam : template
								.getTimeTemplateParamList()) {
							if (week == timeTemplateParam.getWeekDate()) {
								timeTemplateParam
										.getListTimeTemplateParamSpan().add(
												span);
							}
						}
					} else {
						set.add(week);
						TimeTemplateParam timeTemplateParam = new TimeTemplateParam();
						timeTemplateParam.setWeekDate((short) week);
						timeTemplateParam.setStartDate(CalendarUtils
								.getCurrentDay());
						timeTemplateParam.setEndDate(CalendarUtils
								.getNextXYear(timeTemplateParam.getStartDate(),
										10));
						timeTemplateParam.getListTimeTemplateParamSpan().add(
								span);
						template.getTimeTemplateParamList().add(
								timeTemplateParam);
					}
				}
			}
		}
		TimeTemplate obj = templateService.save(template);
		for (TimeTemplateParam timeTemplateParam : template
				.getTimeTemplateParamList()) {
			timeTemplateParam.setTimeTemplate(obj);
			templateService.saveParam(timeTemplateParam);
			for (TimeTemplateParamSpan span : timeTemplateParam
					.getListTimeTemplateParamSpan()) {
				span.setTimeTemplateParam(timeTemplateParam);
				templateService.saveParamSpan(span);
			}
		}
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}

	@RequestMapping(value = "/getHighChartData.do")
	public String getHighChartData(Long templateId) {
		List<Object[]> spanList = timeTemplateDAOImpl
				.getSpanInfoByTemplateId(templateId);
		if (spanList != null) {
			JSONArray array = new JSONArray();
			HashMap<Integer, List<Object[]>> map = new HashMap<Integer, List<Object[]>>();
			int rownum = 0;
			for (Object[] span : spanList) {
				Integer key = Integer.parseInt(span[2].toString());
				if (map.containsKey(key)) {
					List<Object[]> hasList = map.get(key);
					hasList.add(span);
					map.put(key, hasList);
					rownum = Math.max(rownum, hasList.size());
				} else {
					List<Object[]> list = new ArrayList();
					list.add(span);
					map.put(key, list);
					rownum = Math.max(rownum, 1);
				}

				// JSONObject obj = new JSONObject();
				// obj.put("low", low);
				// obj.put("high",high);
				// obj.put("RealStartTime",startDate);
				// obj.put("RealEndTime",endDate);
				// array1.add(obj);

			}
			JSONArray allArr = new JSONArray();
			for (int j = 0; j < rownum; j++) {
				JSONArray array1 = new JSONArray();
				JSONObject obj1 = new JSONObject();
				obj1.put("name", getTypeString(1));
				obj1.put("color", getColorByType(1));
				for (int k = 1; k < 8; k++) {
					JSONObject obj = new JSONObject();
					String startDate = "00:00:00";
					String endDate = "00:00:00";
					float low = 0;
					float high = 0;
					List<Object[]> resultList = map.get(k);
					if (resultList != null) {
						if (resultList.size() > j) {
							Object[] retObj = resultList.get(j);
							startDate = retObj[0].toString();
							endDate = retObj[1].toString();
							int startHours = Integer.parseInt(startDate
									.split(":")[0]);
							int startMinutes = Integer.parseInt(startDate
									.split(":")[1]);
							int startSeconds = Integer.parseInt(startDate
									.split(":")[2]);
							int endHours = Integer
									.parseInt(endDate.split(":")[0]);
							int endMinutes = Integer.parseInt(endDate
									.split(":")[1]);
							int endSeconds = Integer.parseInt(endDate
									.split(":")[2]);
							low = Float.parseFloat((startHours + "." + (100 * (startMinutes*60+startSeconds)) / 3600).length() > 9 ? (startHours + "." + (100 * (startMinutes*60+startSeconds)) / 3600).substring(0, 8) : (startHours+ "." + (100 * (startMinutes*60+startSeconds)) / 3600));
							high = Float.parseFloat((endHours + "." + (100 * (endMinutes*60+endSeconds)) / 3600).length() > 9? (endHours+ "." + (100 * (endMinutes*60+endSeconds)) / 3600).substring(0, 8): (endHours + "." + (100 * (endMinutes*60+endSeconds)) / 3600));
						}
					}
					obj.put("low", low);
					obj.put("high", high);
					obj.put("color", getColorByType(1));
					obj.put("RealStartTime", startDate);
					obj.put("RealEndTime", endDate);
					array1.add(obj);
				}
				obj1.put("data", array1);
				allArr.add(obj1);
			}
			JSONObject obj3 = new JSONObject();
			obj3.put("Result", allArr);
			return JSONObject.fromObject(obj3).toString();
		}

		return "";
	}

	private float formatNumber(float f) {
		BigDecimal b = new BigDecimal(f);
		float f1 = b.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();
		return f1;
	}

	private String formatDate(Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
		String dateString = formatter.format(date);
		return dateString;
	}

	private String getTypeString(int type) {
		String result = null;
		switch (type) {
		case 1:
			result = "定时录像";
			break;
		case 2:
			result = "移动侦测录像";
			break;
		case 3:
			result = "报警录像";
			break;
		case 4:
			result = "移动侦测或报警录像";
			break;
		case 5:
			result = "移动侦测和报警录像";
			break;
		default:
			result = "";
		}
		return result;
	}

	private String getColorByType(int type) {
		String result = null;
		switch (type) {
		case 1:
			result = "rgb(179, 217, 179)";
			break;
		case 2:
			result = "rgb(255, 255, 179)";
			break;
		case 3:
			result = "rgb(255, 179, 179)";
			break;
		case 4:
			result = "rgb(186, 186, 255)";
			break;
		case 5:
			result = "rgb(230, 220, 252)";
			break;
		default:
			result = "";
		}
		return result;
	}

	@Log(desc = "修改录像计划", objId = "#{template.id}",objName="#{template.name}")
	@RequestMapping(value = "/update.do",method=RequestMethod.POST)
	public String update(TimeTemplate template) {
		TimeTemplate findObj = templateService.findByName(template.getName().trim());
		if(findObj!=null&&!findObj.getId().equals(template.getId())){
			return JSONObject.fromObject("{ret:0,msg:'保存失败，名称重复!'}").toString();
		}
		if (template.getPlans() != null) {
			JSONArray jsonArr = JSONArray.fromObject(template.getPlans());
			if (jsonArr != null && jsonArr.size() > 0) {
				HashSet<Integer> set = new HashSet<Integer>();
				for (int i = 0; i < jsonArr.size(); i++) {
					JSONObject obj = JSONObject.fromObject(jsonArr.get(i));
					TimeTemplateParamSpan span = new TimeTemplateParamSpan();
					int start = obj.getInt("StartTime");
					int end = obj.getInt("Stoptime");
					// int type = obj.getInt("Label");
					int week = obj.getInt("Week") == 0 ? 7 : obj.getInt("Week");
					span.setStartDate(CalendarUtils.covertSecondsToDate(start));
					span.setEndDate(CalendarUtils.covertSecondsToDate(end));
					if (set.contains(week)) {
						for (TimeTemplateParam timeTemplateParam : template
								.getTimeTemplateParamList()) {
							if (week == timeTemplateParam.getWeekDate()) {
								timeTemplateParam
										.getListTimeTemplateParamSpan().add(
												span);
							}
						}
					} else {
						set.add(week);
						TimeTemplateParam timeTemplateParam = new TimeTemplateParam();
						timeTemplateParam.setWeekDate((short) week);
						timeTemplateParam.setStartDate(CalendarUtils
								.getCurrentDay());
						timeTemplateParam.setEndDate(CalendarUtils
								.getNextXYear(timeTemplateParam.getStartDate(),
										10));
						timeTemplateParam.getListTimeTemplateParamSpan().add(
								span);
						template.getTimeTemplateParamList().add(
								timeTemplateParam);
					}
				}
			}
			if (template.getId() != null && template.getId() > 0) {
				templateService.deleteSubByTempId(template.getId());
			}
		}
		templateService.save(template);
		for (TimeTemplateParam timeTemplateParam : template
				.getTimeTemplateParamList()) {
			timeTemplateParam.setTimeTemplate(template);
			templateService.saveParam(timeTemplateParam);
			for (TimeTemplateParamSpan span : timeTemplateParam
					.getListTimeTemplateParamSpan()) {
				span.setTimeTemplateParam(timeTemplateParam);
				templateService.saveParamSpan(span);
			}
		}
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}

	@Log(desc = "删除录像计划", objId = "#{ids}")
	@RequestMapping(value = "/delete.do",method=RequestMethod.POST)
	public String delete(String ids) {	
		templateService.delete(ids);
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
	 * @param @return 设定文件
	 * @return String 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/getPageList.do")
	public String getPageList(
			@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(value = "sortType", defaultValue = "auto") String sortType,
			Model model, ServletRequest request) {
		Map<String, Object> searchParams = Servlets.getParametersStartingWith(
				request, "search_");

		Page<TimeTemplate> templates = templateService.getPage(searchParams,
				pageNumber, pageSize, sortType);

		return JSONObject.fromObject(templates).toString();
	}

}
