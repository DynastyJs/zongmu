package com.gosun.healthwebsite.service;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.gosun.core.utils.IPUtils;
import com.gosun.sas.dto.User;
import com.gosun.sas.utils.UserUtil;
import com.gosun.service.entity.SysOperationLogRsp;
import com.gosun.service.entity.UserRsp;
import com.gosun.service.log.ISysOperationLogService;

@Component
@Service
public class LogService {
	@Autowired
	private ISysOperationLogService iSysOperationLogService;
	
	public void log(String log,String desc){
		User currUser = UserUtil.getUser();
		if(currUser==null){
			return;
		}
		SysOperationLogRsp operlog = new SysOperationLogRsp();	
		operlog.setUserName(currUser.getUserName());
		operlog.setAccountId(currUser.getAccountId().intValue());
		operlog.setUserIp(UserUtil.getUserIp());
		operlog.setLogTime(new Date());
		operlog.setOperateResult(1);
		operlog.setLogContent(log);
		operlog.setLogDesc(desc);
		operlog.setSysCode("health_website");
		iSysOperationLogService.saveOperationLog(operlog);
	}
}
