/**
 * @Title: PlatformController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.sas.controller;

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
import com.gosun.sas.entity.Platform;
import com.gosun.sas.log.Log;
import com.gosun.sas.service.PlatformService;

/**
 * @ClassName: PlatformController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/platform")
public class PlatformController {
	@Autowired
	private PlatformService platformService;
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		
		return new ModelAndView("platform/index");
	}
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			Platform platfrom = platformService.getPlatform(id);
			return JSONObject.fromObject(platfrom).toString();
		}
		return null;
	}
	
	@Log(type=Log.LOG_TYPE_OPERATE,desc="保存平台信息",objId="#{platfrom.id}",objName="#{platfrom.name}")
	@RequestMapping(value = "/saveOrUpdate.do")
	public String save(Platform platfrom) {
		platformService.savePlatform(platfrom);
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}
	
	@Log(type=Log.LOG_TYPE_OPERATE,desc="删除平台信息",objId="#{ids}")
	@RequestMapping(value = "/delete.do")
	public String delete(String ids) {
		platformService.deletePlatform(ids);
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

        Page<Platform> platfroms = platformService.getPlatform(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(platfroms).toString();
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
    @RequestMapping(value="/getAllList.do")
    public String  getALlList() {
    	
    	List<Platform> platfroms = platformService.getAllList();
    	
    	return JSONArray.fromObject(platfroms).toString();
    }
    
    @RequestMapping(value="/enablePlatform.do")
    public String enablePlatform(Long id,Integer isEnable){
    	Platform platfrom = platformService.getPlatform(id);
    	if(platfrom!=null){
    		platfrom.setIsEnable(isEnable);
    		platformService.savePlatform(platfrom);
    	}
    	return JSONObject.fromObject("{ret:1,msg:'设置成功'}").toString();
    }
}
