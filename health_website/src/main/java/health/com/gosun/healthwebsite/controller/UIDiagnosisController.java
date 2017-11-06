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
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.UIDiagnosisStatus;
import com.gosun.healthwebsite.repository.UIDiagnasisStatusDAOImpl;
import com.gosun.healthwebsite.service.UIDiagnasisStatusService;


/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/diagnosis")
public class UIDiagnosisController {
	@Autowired private UIDiagnasisStatusService diagnasisStatusService;
	@Autowired
	private UIDiagnasisStatusDAOImpl diagnasisStatusDAOImpl;

	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("diagnosis/index");
	}

	@RequestMapping(value = { "/diagnosisHandle", "" })
	public ModelAndView diagnosisHandle() {
		return new ModelAndView("handle/diagnosisHandle");
	}
	
	@RequestMapping(value = { "/getImgUrlByEquipmentId", "" })
	public String getImgUrlByEquipmentId(Long equipmentId){
		return diagnasisStatusDAOImpl.getImgUrlByEquipmentId(equipmentId);
	}

	@RequestMapping(value="/getPageList.do")
	public String  getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
							   @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
							   @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
							   ServletRequest request) {
		Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

		Page<UIDiagnosisStatus> diagnasisStatus = diagnasisStatusService.getrecordStatuses(searchParams, pageNumber, pageSize, sortType);

		return JSONObject.fromObject(diagnasisStatus).toString();
	}
	
}
