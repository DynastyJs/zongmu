/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/param")
public class ParamsController {
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("param/index");
	}
	
	@RequestMapping(value = { "/modify", "" })
	public ModelAndView modify() {	
		return new ModelAndView("param/modify");
	}
	

	
}
