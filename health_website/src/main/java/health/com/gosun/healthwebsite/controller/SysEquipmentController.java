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
import com.gosun.healthwebsite.entity.SysEquipment;
import com.gosun.healthwebsite.entity.UIVideoTree;
import com.gosun.healthwebsite.fsuservice.FSUServiceEntry;
import com.gosun.healthwebsite.repository.UIVideoTreeDAO;
import com.gosun.healthwebsite.service.MultiLoopReNameService;
import com.gosun.healthwebsite.service.SysEquipmentService;
import com.gosun.healthwebsite.service.UIFsuInfoService;
import com.gosun.sas.log.Log;
import com.gosun.service.entity.OrgRsp;
import com.gosun.service.org.IOrgService;


/**
 * @ClassName: SysEquipmentController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/sysdev")
public class SysEquipmentController {
	
	@Autowired
	private SysEquipmentService sysEquipmentService;
	@Autowired
	private UIVideoTreeDAO uiVideoTreeDAO;
	@Autowired
	private UIFsuInfoService fusService;	
	@Autowired
	private MultiLoopReNameService multiLoopReNameService;
	@Autowired
	private IOrgService orgService;
	
	@RequestMapping(value = "/findById.do")
	public String findById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			SysEquipment status = sysEquipmentService.getSysEquipment(id);
			return JSONObject.fromObject(status).toString();
		}
		return null;
	}
	
	@Log(desc="修改设备名称",objId="#{sysEqu.equipmentId}",objName="#{sysEqu.aliasName}")
	@RequestMapping(value = "/modify.do",method=RequestMethod.POST)
	public String modify(SysEquipment sysEqu) {		
		SysEquipment equ = sysEquipmentService.getSysEquipment(sysEqu.getEquipmentId());
		equ.setAliasName(sysEqu.getAliasName());
		sysEquipmentService.save(equ);
		return JSONObject.fromObject("{ret:1,msg:'修改设备名称'}").toString();
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("sysdev/index");
	}

	@RequestMapping(value = { "/sysdevHandle", "" })
	public ModelAndView sysdevHandle() {
		return new ModelAndView("handle/sysdev");
	}
	@RequestMapping(value = { "/upsHandle", "" })
	public ModelAndView upsHandle() {
		return new ModelAndView("handle/electricHandle");
	}
	@RequestMapping(value = { "/fireHandle", "" })
	public ModelAndView fireHandle() {
		return new ModelAndView("handle/fireHandle");
	}
	@RequestMapping(value = { "/mulipathFireHandle", "" })
	public ModelAndView MulipathFireHandle() {
		return new ModelAndView("handle/mulipathFireHandle");
	}
	@RequestMapping(value = { "/mulipathMonitorHandle", "" })
	public ModelAndView MulipathMonitorHandle() {
		return new ModelAndView("handle/mulipathMonitorHandle");
	}
	@RequestMapping(value = { "/envirementHandle", "" })
	public ModelAndView envirementHandle() {
		return new ModelAndView("handle/envirementHandle");
	}
	@RequestMapping(value = { "/diskHandle", "" })
	public ModelAndView diskHandle() {
		return new ModelAndView("handle/diskHandle");
	}
	@RequestMapping(value = { "/detail", "" })
	public ModelAndView detail() {
		return new ModelAndView("sysdev/detail");
	}
	@RequestMapping(value="/detailElectricalFire")
	public ModelAndView detailForElectricalFire(){
		return new ModelAndView("sysdev/detailElectricalFire");
	}
	@RequestMapping(value="/detailAirCondition")
	public ModelAndView detailAirCondition(){
		return new ModelAndView("sysdev/detailAirCondition");
	}
	//多回路电器火灾探测器详情页面
	@RequestMapping(value="/detailMultipathFire")
	public ModelAndView detailMultipathFire(){
		return new ModelAndView("sysdev/detailMultipathFire");
	}
	//多回路监控器详情页面
	@RequestMapping(value="/detailMultipathMonitor")
	public ModelAndView detailMultipathMonitor(){
		return new ModelAndView("sysdev/detailMultipathMonitor");
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

        Page<SysEquipment> networks = sysEquipmentService.getSysEquipment(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(networks).toString();
    }
    
    @RequestMapping(value="/getVideoTreeList.do")
    public String getVideoTreeList(Long templateId){
    	//获取设备集合
    	List<UIVideoTree> equipmentlist = uiVideoTreeDAO.getVideoTreeList(templateId);
    	//获取主机机构集合
    	List<OrgRsp> orglist = orgService.getAllOrgRsp();
    	JSONObject jsonObject = new JSONObject();
    	jsonObject.put("equipmentlist", equipmentlist);
    	jsonObject.put("orglist", orglist);
    	return jsonObject.toString();
    }
    
	/**
	 * 绑定
	 * @author yrf
	 * @2016年6月14日 下午4:58:37
	 * @param fsuId
	 * @param equipmentId
	 * @return
	 * @throws Exception 
	 */
    @Log(desc="监测主机绑定设备",objId="#{fsuId}")
	@RequestMapping(value="/linkFsu.do")
	public String linkFsu(@RequestParam(value = "fsuId") String fsuId, @RequestParam(value = "equipmentIds") String equipmentIds,FSUServiceEntry entry) throws Exception{
		String result = fusService.setFsuConfig(entry,equipmentIds,0);
		if(result != null && result.equals("1")){
			sysEquipmentService.link(fsuId, equipmentIds);
			result = "{ret : 1, msg:'绑定成功'}";
		}
		else{
			result = "{ret : "+result+", msg:'绑定失败'}";
		}
		return JSONObject.fromObject(result).toString();
	}
	/**
	 * 解绑
	 * @author yrf
	 * @2016年6月14日 下午4:58:49
	 * @param fsuId
	 * @param equipmentId
	 * @return
	 * @throws Exception 
	 */
    @Log(desc="监测主机解绑设备",objId="#{entry.fsuId}")
	@RequestMapping(value="/unlinkFsu.do")
	public String unlinkFsu(@RequestParam(value = "equipmentIds") String equipmentIds,FSUServiceEntry entry) throws Exception
	{
		String result = fusService.setFsuConfig(entry,equipmentIds,1);
		if(result != null && result.equals("1")){
			sysEquipmentService.unlink(equipmentIds);
			result = "{ret : 1, msg:'解绑成功'}";
		}
		else{
			result = "{ret : "+result+", msg:'解绑失败'}";
		}
		return JSONObject.fromObject(result).toString();
	}
	
    /**
     * 根据设备id获取多回路设备回路名
     * @param equipmentId
     * @return
     */
    @RequestMapping("/getMultiPathName")
    public String getMultiPathName(@RequestParam(value="equipmentId")Long equipmentId){
    	return JSONArray.fromObject(multiLoopReNameService.getMultiPathNameByEquipmentId(equipmentId)).toString();
    }

    /**
     * 修改回路名称
     * @param equipmentId
     * @param orderNo
     * @param name
     * @return
     */
    @RequestMapping("/modifyPathName")
    public String modifyPathName(@RequestParam(value="equipmentId")Long equipmentId,
    		@RequestParam(value="orderNo")Long orderNo,@RequestParam(value="name")String name){
    	multiLoopReNameService.updateByEquipmentIdAndOrderNo(name, equipmentId, orderNo);
    	return JSONObject.fromObject("{ret : 1, msg:'修改成功'}").toString();
    }
}
