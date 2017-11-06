package com.gosun.example.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import com.gosun.core.exception.BusinessException;
import com.gosun.core.exception.SystemException;
import com.gosun.core.mvc.bind.annotation.FormModel;
import com.gosun.core.mvc.bind.annotation.RequestJsonParam;
import com.gosun.core.mvc.util.MapWapper;
import com.gosun.core.utils.JsonUtil;
import com.gosun.example.entity.Task;
import com.gosun.example.entity.TreeNode;
import com.gosun.example.entity.User;
import com.gosun.example.service.UserService;

/**
 * 用户板块控制层
 * 
 * @author liuxg
 * @date 2015年6月9日 下午5:09:22
 */
@RestController
@RequestMapping("/user")
public class UserController {

//	@Autowired
//	private UserService userService;
//	
	/**
	 * 到用户管理主界面
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/", "" })
	public ModelAndView userIndex() {
		System.out.println("------------11----------------");
//		userService.testSql();
		System.out.println("------------22----------------");
		
		return new ModelAndView("example/userList");
	}
//	
//	@RequestMapping(value = "/ajaxException.html")
//    public @ResponseBody Map<String, Object> ajaxException() throws BusinessException {
//        try {
//            Map<String, Object> map = new HashMap<String, Object>();
//            map.put("content", "getJson");
//            map.put("result", true);
//            map.put("account", "1");
//            throw new Exception();
//        } catch (Exception ex) {
//            throw new BusinessException("this is the detail of ajax exception information");
//        }
//    }
//	
//	@RequestMapping(value = "/SystemException.html")
//    public void TestSystemException() throws SystemException {
//        throw new SystemException("this is system error ");
//    }
//    
//    @RequestMapping(value = "/BusinessException.html")
//    public void TestBusinessException() throws BusinessException {
//        throw new BusinessException("this is Business error ");
//    }
//	
//	/**
//	 * 到部门树界面
//	 * @return
//	 */
//	@RequestMapping("/toOrgTree.do")
//	public ModelAndView toOrgTree(){
//		return new ModelAndView("/base/org-tree");
//	}
//	
//	/**
//	 * 到部门树界面
//	 * @return
//	 */
//	@RequestMapping("/toSaveOrUpdateOrg.do")
//	public ModelAndView toSaveOrUpdateOrg(){
//		return new ModelAndView("/org/save-or-update-org");
//	}
//	
//	/**
//	 *formModelPaga页面
//	 * @return
//	 */
//	@RequestMapping("/toFormModelPage.do")
//	public ModelAndView toFormModelPage(){
//		return new ModelAndView("example/formModel");
//	}
//	
//	@RequestMapping("/testFormModel.do")
//	public String testFormModel(@FormModel("user") User user ,Task task){
//		return user.toString() + "<br/>" + task.toString();
//	}
//	
//	/**
//	 * 请求类是这样子的json数据obj={"a":1,"b":2}
//	 * @param obj
//	 * @return
//	 */
//	@RequestMapping("/testRequestJsonParam.do")
//	public String testRequestJsonParam(@RequestJsonParam("obj") MapWapper<String, Object> obj){
//		return "a=" + obj.get("a") + "<br>b=" + obj.get("b");
//	}
//	
//	/**
//	 * 查找部门树
//	 * @return
//	 */
//	@RequestMapping("findOrgTree.do")
//	public String findOrgTree(){
//		List<TreeNode> nodes = new ArrayList<TreeNode>();
//		TreeNode root = new TreeNode();
//		root.setIconSkin("org"); // 这里的org和zTreeStyle.css里面的定义的样式前缀是一样的
//		root.setId(1);
//		root.setName("部门根节点");
//		root.setNodeType("torg");
//		root.setOpen(true);
//		root.setChildren(getOrgChildren("org"));
//		nodes.add(root);
//		return JSONArray.fromObject(nodes).toString();  //返回的数据是一个数组
//	}
//	
//	
//	/**
//	 * 查找部门人员树
//	 * 
//	 * @return
//	 */
//	@RequestMapping("findOrgUserTree.do")
//	public String findOrgUserTree() {
//		
//		List<TreeNode> nodes = new ArrayList<TreeNode>();
//		TreeNode root = new TreeNode();
//		root.setIconSkin("org"); // 这里的org和zTreeStyle.css里面的定义的样式前缀是一样的
//		root.setId(1);
//		root.setName("部门根节点");
//		root.setNodeType("torg");
//		root.setOpen(true);
//		root.setChildren(getOrgChildren("user"));
//		nodes.add(root);
//		return JSONArray.fromObject(nodes).toString();  //返回的数据是一个数组
//	}
//
//	/**
//	 * 获取子节点
//	 * 
//	 * @return
//	 */
//	private List<TreeNode> getOrgChildren(String type) {
//		TreeNode node = null;
//		List<TreeNode> nodes = new ArrayList<TreeNode>();
//		for (int i = 0; i < 10; i++) {
//			node = new TreeNode();
//			node.setId(i + 2);
//			node.setIconSkin("org"); // 这里的org和zTreeStyle.css里面的定义的样式前缀是一样的
//			node.setName("部门子节点" + (i + 1));
//			node.setNodeType("torg");
//			if ((i == 4 || i == 7) && type.equals("user")) {
//				node.setChildren(getUserChildren(i * 10));
//			}
//			nodes.add(node);
//		}
//		return nodes;
//	}
//
//	private List<TreeNode> getUserChildren(Integer orgId) {
//		TreeNode node = null;
//		List<TreeNode> nodes = new ArrayList<TreeNode>();
//		for (int i = 0; i < 10; i++) {
//			node = new TreeNode();
//			node.setId(i + 1 + orgId);
//			if (i == 3 || i == 5 || i==9) {
//				node.setIconSkin("man"); // 这里的org和zTreeStyle.css里面的定义的样式前缀是一样的
//				node.setNodeType("tman");
//				node.setName("男子节点");
//			}else{
//				node.setIconSkin("woman"); // 这里的org和zTreeStyle.css里面的定义的样式前缀是一样的
//				node.setNodeType("twoman");
//				node.setName("女子节点");
//			}
//			nodes.add(node);
//		}
//		return nodes;
//	}
//	
//	@RequestMapping(value="/getUserList.do")
//	public String getUserList() {
//	    List<User> users = new ArrayList<User>();
//	    
//	    for (int i = 0; i < 10; i++) {
//	        User user = new User();
//	       /* user.setUserId(i);
//	        user.setAccountName("111");
//	        user.setUserName("222");*/
//	        
//	        users.add(user);
//	    }
//	    
//	    return JsonUtil.getInstance().putData("data", JSONArray.fromObject(users)).pushData();
//	}
//
//	/**
//	 * 获取分页用户列表
//	 * 
//	 * @return
//	 */
//	@RequestMapping(value = "/findPageUserListByOrgId.do")
//	public String findPageUserList(Integer draw, Integer start, Integer length,
//			String order, String search, Integer orgId) {
//
//		int pageNo = start / length + 1;
//		int pageSize = length;
//		List<User> users = new ArrayList<User>();
//		User user = null;
//
//		for (int i = (pageNo - 1) * pageSize; i < pageSize * pageNo; i++) {
//			user = new User();
//			/*user.setUserId(i + 1);
//			user.setAccountName("accountName" + (i + 1));
//			user.setAddress("address_" + (i + 1));
//			user.setGender((byte) 1);
//			user.setMobilePhone("mobilePhone_" + (i + 1));
//			user.setOrgId(1);
//			user.setBirthday("2015-15-19");
//			user.setPassword("password_" + (i + 1));
//			user.setPosition("position_" + (i + 1));
//			user.setUserName("userName_" + (i + 1));*/
//			users.add(user);
//		}
//
//		return JsonUtil.getInstance().putData("draw", draw)
//				.putData("recordsTotal", 100).putData("recordsFiltered", 100)
//				.putData("data", JSONArray.fromObject(users)).pushData();
//
//	}
//
//	/**
//	 * 通过id获取用户返回前台
//	 * 
//	 * @return
//	 */
//	@RequestMapping(value = "/findUserByUserId.do")
//	public ModelAndView findUserByUserId(Integer userId) {
//
//		ModelAndView mav = new ModelAndView("/example/save-or-update-user");
//		if (userId != 0) { // 修改用户，获取实例展现在jsp页面
//			User user = new User();
//			/*user.setUserId(userId);
//			user.setAccountName("accountName");
//			user.setAddress("address");
//			user.setGender((byte) 1);
//			user.setMobilePhone("mobilePhone");
//			user.setOrgId(1);
//			user.setPassword("password");
//			user.setPosition("position");
//			user.setUserName("userName");
//			user.setBirthday("2012-05-25");
//			user.setOrgName("orgName");
//			user.setOtherContent("otherContent");*/
//			mav.addObject("user", user);
//		}
//		return mav;
//
//	}

}
