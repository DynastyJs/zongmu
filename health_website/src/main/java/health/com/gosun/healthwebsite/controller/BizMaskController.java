/**
 * @Title: BizMaskController.java 	
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

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.BizMask;
import com.gosun.healthwebsite.service.BizMaskService;
import com.gosun.sas.log.Log;
import com.gosun.sas.utils.CalendarUtils;

/**
 * @ClassName: BizMaskController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/mask")
public class BizMaskController {
	@Autowired
	private BizMaskService maskService; 
	
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long orgId,Long equipmentId) {
		List<BizMask>  maskList = maskService.getListByOrgAndEquId(orgId,equipmentId);
		JSONObject obj = new JSONObject();
		obj.put("data", maskList);
		return obj.toString();
	}
	
	@RequestMapping(value = "/findByEquIdAndProperty.do")
	public String findByEquIdAndProperty(Long equipmentId,String propertyName) {
		List<BizMask>  maskList = maskService.getListByEquipmentIdAndPropertyName(equipmentId, propertyName);
		JSONObject obj = new JSONObject();
		obj.put("data", maskList);
		return obj.toString();
	}
	@RequestMapping(value = "/findByEquId.do")
	public String findByEquId(Long equipmentId) {
		List<BizMask>  maskList = maskService.getListByEquipmentId(equipmentId);
		JSONObject obj = new JSONObject();
		obj.put("data", maskList);
		return obj.toString();
	}

	
	@Log(desc="旁路组织机构",objId="#{alarmCon.orgId}")
	@RequestMapping(value = "/saveOrg.do",method=RequestMethod.POST)
	public String saveOrg(BizMask mask) {
		if(mask.getMaskId()!=null&&mask.getMaskId()>0){
			BizMask findObj = maskService.getBizMask(mask.getMaskId());
			findObj.setIsMask(mask.getIsMask());
			findObj.setEquipmentId(mask.getEquipmentId());
			findObj.setMaskTime(mask.getMaskTime());
			findObj.setOrgId(mask.getOrgId());
			mask.setFinishMaskTime(CalendarUtils.getDateAfterByHour(mask.getMaskTime()));
			maskService.saveBizMask(findObj);
		}else{
			maskService.saveBizMask(mask);
		}
		return JSONObject.fromObject("{ret:1,maskId:"+mask.getMaskId()+",msg:'旁路组织成功'}").toString();
	}
	
	@Log(desc="旁路设备",objId="#{alarmCon.equipmentId}")
	@RequestMapping(value = "/saveEqu.do",method=RequestMethod.POST)
	public String saveEqu(BizMask mask) {
		mask.setFinishMaskTime(CalendarUtils.getDateAfterByHour(mask.getMaskTime()));
		maskService.saveBizMask(mask);
		return JSONObject.fromObject("{ret:1,maskId:"+mask.getMaskId()+",msg:'旁路设备成功'}").toString();
	}
	
	@Log(desc="旁路设备属性",objId="#{alarmCon.equipmentPropertyName}")
	@RequestMapping(value = "/saveEquByProperty.do",method=RequestMethod.POST)
	public String saveEquByProperty(BizMask mask) {
		mask.setFinishMaskTime(CalendarUtils.getDateAfterByHour(mask.getMaskTime()));
		maskService.saveBizMask(mask);
		return JSONObject.fromObject("{ret:1,maskId:"+mask.getMaskId()+",msg:'旁路设备属性成功'}").toString();
	}
	
	@Log(desc="取消旁路组织机构",objId="#{alarmCon.equipmentPropertyName}")
	@RequestMapping(value = "/deleteByOrg.do",method=RequestMethod.POST)
	public String deleteByOrg(String ids) {
		maskService.deleteBizMask(ids);
		return JSONObject.fromObject("{ret:1,msg:'取消旁路组织机构成功'}").toString();
	}
	
	@Log(desc="取消旁路设备")
	@RequestMapping(value = "/deleteByEqu.do",method=RequestMethod.POST)
	public String deleteByEqu(String ids) {
		maskService.deleteBizMaskByEquId(ids);
		return JSONObject.fromObject("{ret:1,msg:'取消旁路成功'}").toString();
	}
	
	@Log(desc="取消旁路设备属性",objId="#{alarmCon.equipmentPropertyName}")
	@RequestMapping(value = "/deleteByEquAndProperty.do",method=RequestMethod.POST)
	public String deleteByEquAndProperty(String ids) {
		maskService.deleteBizMask(ids);
		return JSONObject.fromObject("{ret:1,msg:'取消旁路成功'}").toString();
	}
	
	@RequestMapping(value = "/delete.do",method=RequestMethod.POST)
	public String delete(String ids) {
		maskService.deleteBizMask(ids);
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

        Page<BizMask> masks = maskService.getBizMask(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(masks).toString();
    }
	
}
