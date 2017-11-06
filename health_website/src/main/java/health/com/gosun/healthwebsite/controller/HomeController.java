/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.utils.SystemConfig;
import com.gosun.healthwebsite.repository.UIHomeStatisticDAOImpl;
import com.gosun.sas.dto.User;
import com.gosun.sas.log.Log;
import com.gosun.sas.utils.UserUtil;
import com.gosun.service.dictionary.IDictionaryService;
import com.gosun.service.entity.DictionaryFieldRsp;
import com.gosun.service.entity.OrgRsp;
import com.gosun.service.entity.RoleMenuRsp;
import com.gosun.service.entity.UserRsp;
import com.gosun.service.org.IOrgService;
import com.gosun.service.privilege.IPrivilegeService;
import com.gosun.service.user.IUserService;

/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/home")
public class HomeController {
	@Autowired
	private IOrgService orgService;
	@Autowired 
	private IUserService userService;
	@Autowired 
	private IDictionaryService dictionaryService;
	@Autowired
    private  HttpServletRequest request;
	@Autowired 
	private UIHomeStatisticDAOImpl statisticDaoImpl;
	@Autowired IPrivilegeService privilegeService;
	@Autowired
	private RestTemplate restTemplate;
	
	private Collection<OrgRsp> col;
	/**
	 * 
	 * @return
	 */
	@Log(desc="用户登录")
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		String accountName = request.getRemoteUser();
        if (accountName != null) {
            HttpSession httpSession = request.getSession();
            
            UserRsp userRsp = userService.getUserInfoByAccountName(accountName);         
            User user = new User();
            user.setAccountId((long) userRsp.getAccountId());
            user.setLoginName(userRsp.getAccountName());
            user.setContextPath(request.getContextPath());
            user.setUserName(userRsp.getUserName());
            user.setOrgId(userRsp.getOrgId());
            httpSession.setAttribute(User.CURRENT_USER, user);
            request.setAttribute("accountName", accountName);
        }
		return new ModelAndView("index");
	}
	
	@RequestMapping(value = { "/homeindex", "" })
	public ModelAndView homeindex() {	
		return new ModelAndView("home/index");
	}
	
	@RequestMapping(value = "/getAllOrgTree.do")
	public String getAllOrgTree() {
		List<OrgRsp> list = orgService.getAllOrgRsp();
		return JSONArray.fromObject(list).toString();
	}
	
	@RequestMapping(value = "/getAllOrgTreeByOrgId.do")
	public String getAllOrgTreeByOrgId() {
		User currUser = UserUtil.getUser();
		if(currUser!=null){
			if(!currUser.getLoginName().equals("sysadmin")&&!currUser.getLoginName().equals("admin")){
				col = new ArrayList<OrgRsp>();
				col.add(orgService.getOrgInfoByOrgId(currUser.getOrgId()));
				List<OrgRsp> list = orgService.getChildrenOrgByParentOrgId(currUser.getOrgId());
				getData(list);				
				return JSONArray.fromObject(col).toString();
			}else{
				List<OrgRsp> list = orgService.getAllOrgRsp();
				return JSONArray.fromObject(list).toString();
			}
		}
		return null;
	}
	
	public void getData(List<OrgRsp> list){
		if(list!=null&&list.size()>0){
			col.addAll(list);
			for(OrgRsp obj : list){
				List<OrgRsp> result = orgService.getChildrenOrgByParentOrgId(obj.getId());
				if(result!=null&&result.size()>0){				
					getData(result);
				}
			}
		}
	}
	
	@RequestMapping(value = "/getChildrenOrgByParentOrgId.do")
	public String getChildrenOrgByParentOrgId(Integer id) {
		List<OrgRsp> list = orgService.getChildrenOrgByParentOrgId(id);
		return JSONArray.fromObject(list).toString();
	}
	
	/**
	 * 
	 * @Title: getHomeNetStatusData
	 * @Description: 首页网络状态统计
	 * @param @return
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getHomeNetStatusData.do")
	public String getHomeNetStatusData(String orgId){
       List list = statisticDaoImpl.getProcedure("pro_net_state_numstat",orgId);
       JSONObject obj = new JSONObject();
       obj.put("data", list);
       return obj.toString();
	}
	
	/**
	 * 
	 * @Title: getHomeEquStatusData
	 * @Description: 首页设备状态统计
	 * @param @return
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getHomeEquStatusData.do")
	public String getHomeEquStatusData(String orgId){
	   List list = statisticDaoImpl.getProcedure("pro_equ_state_numstat",orgId);
       JSONObject obj = new JSONObject();
       obj.put("data", list);
       return obj.toString();
	}
	
	/**
	 * 
	 * @Title: getHomeEquStatusData
	 * @Description: 首页设备状态统计
	 * @param @return
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getHomeRingStatusData.do")
	public String getHomeRingStatusData(String orgId){
       List list = statisticDaoImpl.getProcedure("pro_ring_state_numstat",orgId);
       JSONObject obj = new JSONObject();
       obj.put("data", list);
       return obj.toString();
	}
	
	/**
	 * 
	 * @Title: getHomeEquStatusData
	 * @Description: 网点设备设备类型统计
	 * @param @return
	 * @return String
	 * @throws
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getHasDataEquType.do")
	public String getHasDataEquType(String orgId){
       List list = statisticDaoImpl.getHasDataEquType(orgId);
       JSONObject obj = new JSONObject();
       obj.put("data", list);
       return obj.toString();
	}
	
	@RequestMapping(value = "/getPrivilege.do",method=RequestMethod.POST)
    public String getPrivilege(){
    	User user = UserUtil.getUser();
        int accountId = new Long(user.getAccountId()).intValue();
        List<RoleMenuRsp> roleMenuList = privilegeService.getRoleMenuByAccountIdAndAppCode(accountId, "health_website");
        int rightNum = roleMenuList.size();
        List<String> rightCodeList = new ArrayList<String>();
        for(int i = 0; i < rightNum; i++){
            String rightCode = roleMenuList.get(i).getMenuCode();
            if(privilegeService.canAccessPrivCode(accountId, rightCode, "health_website")){
                rightCodeList.add(rightCode);
            }
        }
        JSONObject obj = new JSONObject();
        obj.put("data", rightCodeList);
        return obj.toString();
    }
    
	@RequestMapping(value = "/checkButtonRight.do")
    public String checkButtonRight(String rightCode){
    	User user = UserUtil.getUser();
        int accountId = new Long(user.getAccountId()).intValue();
        boolean flag = privilegeService.canAccessPrivCode(accountId, rightCode, "health_website");
        JSONObject obj = new JSONObject();
        obj.put("data", flag);
        return obj.toString();
    }
	@RequestMapping(value = "/getVGSinfo.do")
	public String getVGSIP(){
        JSONObject obj = new JSONObject();
        obj.put("username", SystemConfig.getProperty("vgs.username"));
        obj.put("password", SystemConfig.getProperty("vgs.password"));
        obj.put("ip", SystemConfig.getProperty("vgs.ip"));
        obj.put("key", SystemConfig.getProperty("vgs.key"));
        obj.put("securitykey", SystemConfig.getProperty("vgs.securitykey"));  
        String url = "http://"+SystemConfig.getProperty("vgs.ip")+"/api/General/GetGeneral";
        String json = restTemplate.getForObject(url, String.class);
        JSONObject jsobj = JSONObject.fromObject(json);
        if(jsobj.getBoolean("Success")){
        	obj.put("centerId", jsobj.getJSONObject("Result").getString("CenterId"));
        }
        JSONObject result = new JSONObject();
        result.put("data", obj);
        return result.toString(); 
	}
	
	@RequestMapping(value = "/getXMRequest.do")
	public String getXMRequest(String reqUrl){
        String url = "http://"+SystemConfig.getProperty("vgs.ip")+reqUrl;
        String json = restTemplate.getForObject(url, String.class);
        JSONObject jsobj = JSONObject.fromObject(json);
        JSONObject result = new JSONObject();
        result.put("data", jsobj);
        return result.toString(); 
	}
	
    /**
     * 
     * @Title: getDictionaryFieldsByCatalogCode
     * @Description: 统一应用平台数据字典接口
     * @param @return
     * @return String
     * @throws
     */
	@RequestMapping(value = "/getDictionaryFieldsByCatalogCode.do")
    public String getDictionaryFieldsByCatalogCode(String appCode,String catalogCode){
        List<DictionaryFieldRsp> list = dictionaryService.getDictionaryFieldsByCatalogCode(appCode,catalogCode);
        JSONObject obj = new JSONObject();
        obj.put("data", list);
        return obj.toString();
    }
	
	@RequestMapping(value = "/getAllSysEquProperties.do")
	public String getAllSysEquProperties(){
		List list = statisticDaoImpl.getAllSysEquProperties();
        JSONObject obj = new JSONObject();
        obj.put("data", list);
        return obj.toString();
	}
	
	
}
