/**
 * @Title: VideoChannelRecordIntegrityController.java 	
 * @Package com.gosun.healthservice.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-5-18 下午1:43:06 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.VideoChannelRecordIntegrity;
import com.gosun.healthwebsite.service.VideoChannelRecordIntegrityService;
import com.gosun.sas.log.Log;

/**
 * @ClassName: VideoChannelRecordIntegrityController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/recordIntegrity")
public class VideoChannelRecordIntegerController {
	@Autowired
	private VideoChannelRecordIntegrityService recordIntegrityService; 
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			VideoChannelRecordIntegrity recordIntegrity = recordIntegrityService.getVideoChannelRecordIntegrity(id);
			return JSONObject.fromObject(recordIntegrity).toString();
		}
		return null;
	}
	
	@Log(desc="新增录像完整性记录",objId="#{recordIntegrity.id}",objName="#{recordIntegrity.channelPrimaryId}")
	@RequestMapping(value = "/save.do")
	public String save(VideoChannelRecordIntegrity recordIntegrity) {
		recordIntegrityService.saveVideoChannelRecordIntegrity(recordIntegrity);
		return JSONObject.fromObject("{ret:1,msg:'新增成功'}").toString();
	}
	
	@Log(desc="修改录像完整性记录",objId="#{recordIntegrity.id}",objName="#{recordIntegrity.channelPrimaryId}")
	@RequestMapping(value = "/update.do")
	public String update(VideoChannelRecordIntegrity recordIntegrity) {
		recordIntegrityService.saveVideoChannelRecordIntegrity(recordIntegrity);
		return JSONObject.fromObject("{ret:1,msg:'修改成功'}").toString();
	}
	
	@Log(desc="删除录像完整性记录",objId="#{ids}")
	@RequestMapping(value = "/delete.do")
	public String delete(String ids) {
		recordIntegrityService.deleteVideoChannelRecordIntegrity(ids);
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

        Page<VideoChannelRecordIntegrity> recordIntegritys = recordIntegrityService.getVideoChannelRecordIntegrity(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(recordIntegritys).toString();
    }
    
    @RequestMapping(value="/getRecordDateAndIntegrity.do")
    public String getRecordDateAndIntegrity(String startTime,String endTime,String dvsCode,String chnnCode){
    	List<Object[]> list = recordIntegrityService.getRecordDateAndIntegrity(startTime, endTime, dvsCode, chnnCode);
		JSONArray arry = new JSONArray();
    	if(list.size()>0){
			for (Object[] obj : list) {
				JSONObject jsObj = new JSONObject();
				jsObj.put("isIntegrity",obj[0].toString());
				jsObj.put("recordDateString",obj[1].toString());
				arry.add(jsObj);
			}
    	}
    	return arry.toString();
    }
	
}
