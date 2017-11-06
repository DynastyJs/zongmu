/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.service.UIRecordStatusService;


/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/record")
public class UIRecordController {

    @Autowired private UIRecordStatusService uiRecordStatusService;

	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("record/index");
	}
	
	@RequestMapping(value = { "/history", "" })
	public ModelAndView history() {	
		return new ModelAndView("record/replay");
	}
	
	@RequestMapping(value = { "/replay", "" })
	public ModelAndView replay() {	
		return new ModelAndView("record/replay");
	}
	
	@RequestMapping(value = { "/realtime", "" })
	public ModelAndView realtime() {	
		return new ModelAndView("record/realtime");
	}
	@RequestMapping(value = { "/handle", "" })
	public ModelAndView handle() {	
		return new ModelAndView("handle/recordHandle");
	}
	@RequestMapping(value="/getMaxRecordDate.do")
	public String getMaxRecordDate(Long dvsEquipmentId){
		String result = uiRecordStatusService.getMaxRecordDate(dvsEquipmentId);
		return JSONObject.fromObject("{result:"+result+"}").toString();
	}

    @RequestMapping(value="/getPageList.do")
    public String  getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
                               @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                               @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
                               ServletRequest request) {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

//        Page<UIRecordStatus> recordStatuses = uiRecordStatusService.getrecordStatuses(searchParams, pageNumber, pageSize, sortType);
//       getBrokenUIRecordStatus(recordStatuses);
//        return JSONObject.fromObject(recordStatuses).toString();
        return uiRecordStatusService.getRecordStatusByProcedure(searchParams, pageNumber, pageSize).toString();
    }
    
    @RequestMapping(value="/getAlarmPageList.do")
    public String  getAlarmPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
                               @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                               @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
                               ServletRequest request) {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        return uiRecordStatusService.getRecordStatusByProcedure(searchParams, pageNumber, pageSize).toString();
//        if(searchParams.get("EQ_chnnCode").equals("")){
//            searchParams.put("OR_timeRecord#daysAlarm", 1l); 
//        }
//        Page<UIRecordStatus> recordStatuses = uiRecordStatusService.getrecordStatuses(searchParams, pageNumber, pageSize, sortType);
//
//        return JSONObject.fromObject(recordStatuses).toString();
    }
    
    /**
     * 删除掉录像存储正常的数据 供页面显示
     * @param recordStatus
     */
//    private void getBrokenUIRecordStatus(Page<UIRecordStatus> pageList){
//    	if(pageList.getContent()==null){
//    		return;
//    	}
//    	List<UIRecordStatus> notBrokenData=new ArrayList<UIRecordStatus>();
//    	for (UIRecordStatus uiRecordStatus : pageList.getContent()) {
//			if(uiRecordStatus.getTimeRecord()!=null&&uiRecordStatus.getTimeRecord()==1){
//				continue;
//			}
//			if(uiRecordStatus.getDaysAlarm()!=null&&uiRecordStatus.getDaysAlarm()==1){
//				continue;
//			}
//			if(uiRecordStatus.getAlarmRecord()!=null&&uiRecordStatus.getAlarmRecord()==1){
//				continue;
//			}
//			//录像存储没有异常，不做显示
//			notBrokenData.add(uiRecordStatus);
//		}
//    	if(notBrokenData!=null&&notBrokenData.size()>0){
//    		pageList.getContent().removeAll(notBrokenData);
//    	}
//    }

}
