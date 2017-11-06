/**
 * @Title: ServerInfoController.java 	
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

import com.gosun.core.mvc.bind.annotation.FormModel;
import com.gosun.core.web.Servlets;
import com.gosun.sas.entity.ServerInfo;
import com.gosun.sas.log.Log;
import com.gosun.sas.service.ServerInfoService;

/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/server")
public class ServerController {
	@Autowired
	private ServerInfoService serverInfoService;
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		
		return new ModelAndView("index");
	}
	
	@RequestMapping(value = { "/system", "" })
	public ModelAndView system() {
		
		return new ModelAndView("server/system");
	}
	
	@RequestMapping(value = "/findServerById.do")
	public String findServerById(Long id) {
		if (id != 0) { // 修改用户，获取实例展现在jsp页面
			ServerInfo server = serverInfoService.getServer(id);
			return JSONObject.fromObject(server).toString();
		}
		return null;
	}
	
	@Log(type=Log.LOG_TYPE_OPERATE,desc="保存服务信息",objId="#{server.serverId}",objName="#{server.serverName}",result="code",error="msg")
	@RequestMapping(value = "/saveOrUpdate.do")
	public String save(@FormModel("server") ServerInfo server) {
		if(server.getServerType() == 1 && serverInfoService.hasCMS()){
			return JSONObject.fromObject("{ret:0,code :1,msg:'CMS服务已经存在!'}").toString();
		}
		serverInfoService.saveServer(server);
		return JSONObject.fromObject("{ret:1,code:0,msg:'保存成功'}").toString();
	}
	
	@Log(type=Log.LOG_TYPE_OPERATE,desc="删除服务信息",objId="#{ids}")
	@RequestMapping(value = "/delete.do")
	public String delete(String ids) {
		serverInfoService.deleteServerInfo(ids);
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

        Page<ServerInfo> servers = serverInfoService.getServerInfo(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(servers).toString();
    }
    
    @RequestMapping(value="/getServerByType")
    public String getServerByType(Integer type){
    	List<ServerInfo> servers = serverInfoService.getServerInfoByType(type);
    	return JSONArray.fromObject(servers).toString();
    }
}
