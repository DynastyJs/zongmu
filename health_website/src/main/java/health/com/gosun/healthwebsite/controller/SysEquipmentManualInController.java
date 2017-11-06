/** 
*
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
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.SysEquipment;
import com.gosun.healthwebsite.service.SysEquipmentService;

/** 
 * @ClassName: SysEquipmentManualIn 
 * @Description: TODO 
 * @author linnan
 * @date 2017年6月19日 上午11:00:20  
 */
@RestController
@RequestMapping("sysEquipmentManaualIn")
public class SysEquipmentManualInController {

	@Autowired
	private SysEquipmentService sysEquipmentService;
	
	@RequestMapping("/index")
	public ModelAndView index(){
		return new ModelAndView("sysEquipmentManaualIn/index");
	}
	
    @RequestMapping("/getPageList.do")
    public String getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request){
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        searchParams.put("EQ_isManualIn", "1");
        searchParams.put("EQ_isDelete", "0");
        Page<SysEquipment> page = sysEquipmentService.getSysEquipment(searchParams, pageNumber, pageSize, sortType);
        return JSONObject.fromObject(page).toString();
    }
    
    @RequestMapping("/addEquipment")
    public String addEquipment(SysEquipment equipment){
    	sysEquipmentService.saveManaualEquipment(equipment);
    	return JSONObject.fromObject("{msg:'操作成功',ret:1}").toString();
    }
    
    @RequestMapping("/deleteEquipment")
    public String deleteEquipment(String ids){
    	sysEquipmentService.deleteSysEquipments(ids);
    	return JSONObject.fromObject("{msg:'删除成功',ret:1}").toString();
    }
    
    @RequestMapping("/getManaulEquipmentType")
    public String getManaulEquipmentType(){
    	List list = sysEquipmentService.getManaulEquipmentType();
    	return JSONArray.fromObject(list).toString();
    }
}
