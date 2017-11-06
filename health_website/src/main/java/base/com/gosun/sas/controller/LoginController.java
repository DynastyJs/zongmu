package com.gosun.sas.controller;

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
import com.gosun.sas.log.Log;
import com.gosun.sas.utils.UserUtil;

/**
 * 用户板块控制层
 * 
 * @author liuxg
 * @date 2015年6月9日 下午5:09:22
 */
@RestController
@RequestMapping("/user")
public class LoginController {

//	@Autowired
//	private UserService userService;
//	
	/**
	 * 到用户管理主界面
	 * 
	 * @return
	 */
	@Log(desc="用户登录",type=Log.LOG_TYPE_LOGIN)
	@RequestMapping(value = { "/", "" })
	public ModelAndView LoginIndex() {
		return new ModelAndView("index");
	}


}
