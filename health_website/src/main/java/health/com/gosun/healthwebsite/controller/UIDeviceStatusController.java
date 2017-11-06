/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.UIEquipmentStatus;
import com.gosun.healthwebsite.service.UIEquipmentStatusService;


/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/device")
public class UIDeviceStatusController {
	
	@Autowired
	private UIEquipmentStatusService equStatusService;
	
	@RequestMapping(value = "/findById.do")
	public String findById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			UIEquipmentStatus status = equStatusService.getEquipmentStatus(id);
			return JSONObject.fromObject(status).toString();
		}
		return null;
	}
	
	@RequestMapping(value = "/findByEquIdAndProperty.do")
	public String findByEquIdAndProperty(Long equipmentId,String equipmentPropertyName) {
		List<UIEquipmentStatus> list = equStatusService.getListByEquipmentIdAndPropertyName(equipmentId,equipmentPropertyName);
		if(list!=null&&list.size()>0){
			return JSONObject.fromObject(list.get(0)).toString();
		}
		return null;
	}
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("device/index");
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

        Page<UIEquipmentStatus> networks = equStatusService.getEquipmentStatus(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(networks).toString();
    }
	
}
