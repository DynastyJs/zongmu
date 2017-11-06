/**
 * @Title: EquipmentNetworkStatusController.java 	
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

import com.gosun.healthwebsite.repository.BizAlarmConditionDAOImpl;
import net.sf.json.JSON;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.UIEquipmentNetworkStatus;
import com.gosun.healthwebsite.repository.EquipmentTypeDaoImpl;
import com.gosun.healthwebsite.repository.UIHomeStatisticDAOImpl;
import com.gosun.healthwebsite.service.UIEquipmentNetworkStatusService;
import com.gosun.sas.utils.IPUtils;

/**
 * @ClassName: EquipmentNetworkStatusController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/netstatus")
public class UINetworkController {
	@Autowired
	private UIEquipmentNetworkStatusService networkService; 
	@Autowired 
	private EquipmentTypeDaoImpl equipmentTypeDaoImpl;

    @Autowired private BizAlarmConditionDAOImpl bizAlarmConditionDAO;
	
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("network/index");
	}

    @RequestMapping(value = { "/handlingWin", "" })
	public ModelAndView handlingWin() {
		return new ModelAndView("handle/network");
	}
	 
	@RequestMapping(value = "/findById.do")
	public String findById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			UIEquipmentNetworkStatus status = networkService.getEquipmentNetworkStatus(id);
			return JSONObject.fromObject(status).toString();
		}
		return null;
	}
	
    /**
     * remote ping test
     * @return
     */
	@RequestMapping(value = "/pingTest.do")
    public String pingIp(String ip,String param){
        String res = IPUtils.operaIp(ip,"ping",param);
        return res;
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

        Page<UIEquipmentNetworkStatus> networks = networkService.getEquipmentNetworkStatus(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(networks).toString();
    }
    
    /**
     * 
     * @Title: getAllEquipType
     * @Description: 所有设备类型
     * @param @return
     * @return String
     * @throws
     */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getAllEquipType.do")
    public String getAllEquipType(){
       List list = equipmentTypeDaoImpl.getAll();
       JSONObject obj = new JSONObject();
       obj.put("data", list);
       return obj.toString();
    }

    @RequestMapping("getAllAlarmResult")
    public String getAllAlarmResult(){
        List list = bizAlarmConditionDAO.getAllAlarmResult();
        JSONObject obj = new JSONObject();
        obj.put("data", list);
        return obj.toString();
    }

    
    
	
}
