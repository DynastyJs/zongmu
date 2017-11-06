/**
 * @Title: BizEquipmentStatusController.java
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
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.BizEquipmentStatus;
import com.gosun.healthwebsite.entity.UISysDevStatus;
import com.gosun.healthwebsite.repository.EquipmentTypeDaoImpl;
import com.gosun.healthwebsite.service.BizEquipmentStatusService;

/**
 * @ClassName: BizEquipmentStatusController
 * @Description: TODO
 * @author Lisa
 * @date 2016-5-18 下午1:43:06
 */
@RestController
@RequestMapping("/equstatus")
public class BizEquipmentStatusController {
	@Autowired
	private BizEquipmentStatusService equStatusService;
	@Autowired
	private EquipmentTypeDaoImpl equipmentTypeDaoImpl;

	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		return new ModelAndView("equipment_status/index");
	}

	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			BizEquipmentStatus status = equStatusService.getBizEquipmentStatus(id);
			return JSONObject.fromObject(status).toString();
		}
		return null;
	}


	@RequestMapping(value = "/getListByEquId.do")
	public String getListByEquId(Long id) {
		List<UISysDevStatus> list = equStatusService.getListByEquId(id);
		JSONObject obj = new JSONObject();
		obj.put("data", list);
		return obj.toString();
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

        Page<BizEquipmentStatus> equStatuss = equStatusService.getBizEquipmentStatus(searchParams, pageNumber, pageSize, sortType);
        return JSONObject.fromObject(equStatuss).toString();
    }

    /**
     * 获取所有需要进行类型检查的设备
     * @author yrf
     * @2016年6月12日 下午4:57:11
     * @return
     */
    @RequestMapping(value="/getCheckedEqType.do")
    public String getCheckedEqType()
    {
    	List list = equipmentTypeDaoImpl.getCheckedType();
    	return JSONArray.fromObject(list).toString();
    }

    public String getEquipmentStatus(@RequestParam(value="orgId") String orgId, @RequestParam(value="typeId") int typeId)
    {

    	return null;
    }
//
//    /**
//     *  设置关注以及 设备报修状态
//     * @param equipmentId
//     * @param propertyName
//     * @param flag focusFlag/repairFlag
//     * @param status "0" "1"
//     * @return
//     */
//    @RequestMapping("/FPEquipmentStatus.do")
//    public String focusEquipmentStatus(@RequestParam(value = "equipmentId") Long equipmentId,
//                                       @RequestParam(value = "propertyName") String propertyName,
//                                       @RequestParam(value = "flag")String flag,
//                                       @RequestParam(value = "status") String status ) {
//        BizEquipmentStatus bizEquipmentStatus = equStatusService.getOneByIdAndPropertyName(equipmentId, propertyName);
//        String res ;
//        if(flag.equals("focusFlag") ){ //关注设备 状态
//            res = "设置关注状态成功";
////            bizEquipmentStatus.setFocusFlag(status);
//        }else{ // 已报修
//            res = "设置已报修状态成功";
////            bizEquipmentStatus.setRepairFlag(status);
//        }
//        equStatusService.saveBizEquipmentStatus(bizEquipmentStatus);
//        return JSONObject.fromObject("{ret:1,msg:'成功'}").toString();
//    }
//
//    @RequestMapping("getFPStatus")
//    public String getFPStatus(@RequestParam(value = "equipmentId") Long equipmentId,
//                              @RequestParam(value = "propertyName") String propertyName){
//        BizEquipmentStatus bizEquipmentStatus = equStatusService.getOneByIdAndPropertyName(equipmentId, propertyName);
//        return JSONObject.fromObject(bizEquipmentStatus).toString();
//    }

}
