/**
 * @Title: DomainController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.sas.controller;

import java.util.ArrayList;
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
import com.gosun.sas.entity.Domain;
import com.gosun.sas.log.Log;
import com.gosun.sas.service.DomainService;

/**
 * @ClassName: DomainController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/domain")
public class DomainController {
	@Autowired
	private DomainService domainService;
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		
		return new ModelAndView("domain/index");
	}
	
	@RequestMapping(value = "/findById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			Domain platfrom = domainService.getDomain(id);
			return JSONObject.fromObject(platfrom).toString();
		}
		return null;
	}
	
	@Log(desc="添加设备域",needParse=Log.NeedParse,objId="#{domain.id}",objName="#{domain.name}")
	@RequestMapping(value = "/saveOrUpdate.do")
	public String save(Domain domain) {
		domainService.saveDomain(domain);
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
	}
	
	@Log(desc="删除设备域",needParse=Log.NeedParse,objId="#{ids}")
	@RequestMapping(value = "/delete.do")
	public String delete(String ids) {
		domainService.deleteDomain(ids);
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

        Page<Domain> servers = domainService.getDomainInfo(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(servers).toString();
    }
    
	/**
	 * 获取区域树
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/getDomainTree", "" })
	public String getDomainTree() {
		Domain root = new Domain();
		root.setId(0L);
		return this.getDomainList(root).toString();
	}
	
	public String getDomainList(Domain domain){
		List<Object> list = new ArrayList<Object>();
		List<Domain> subList = domainService.getSubDomainList(domain.getId());
		list.addAll(subList);
		for(int i=0;i<subList.size();i++){
	    	Domain d = subList.get(i);
	    	d.setChildren(this.getDomainList(d));
	    }
		return JSONArray.fromObject(list).toString();
	}
	
}
