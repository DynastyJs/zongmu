package com.gosun.sas.log;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONObject;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Component;

import com.gosun.sas.dto.User;
import com.gosun.sas.utils.UserUtil;
import com.gosun.service.entity.SysOperationLogRsp;
import com.gosun.service.log.ISysOperationLogService;

/**
 * 日志切面
 * 
 * @author liuxg
 * @date 2015年10月13日 下午5:55:44
 */
@Component
@Aspect
public class LoggerAspect {

	@Autowired
	private ISysOperationLogService operationLogService;

	@Around("@annotation(com.gosun.sas.log.Log)")
	public Object around(ProceedingJoinPoint joinPoint) {
		int operateResult;
		String exception = "";
		Object retObject;
		MethodSignature methodSignature = (MethodSignature) joinPoint
				.getSignature();
		Method method = methodSignature.getMethod();

		try {
			retObject = ((ProceedingJoinPoint) joinPoint).proceed();
			operateResult = 1;
		} catch (Throwable e) {
			e.printStackTrace();
			operateResult = 0;
			exception = "操作异常" + e.getMessage().substring(0, 15);
			retObject = null;
		}
		try {
			Log log = method.getAnnotation(Log.class);
			this.saveLog(log, operateResult, joinPoint, retObject, exception);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retObject;

	}

	/**
	 * 保存日志
	 * 
	 * @param logContent
	 *            日志内容
	 * @param logDesc
	 *            日志描述
	 * @param operateResult
	 *            操作结果
	 * @param retObject
	 * @param reason
	 */
	private void saveLog(Log log, int operateResult,
			ProceedingJoinPoint joinPoint, Object retObject, String exception) {
		SysOperationLogRsp operlog = new SysOperationLogRsp();
		operlog.setSysCode("health_website");
		if (log.needParse() == Log.NeedParse) {
			String str = (String) AnnotationResolver.newInstance().resolver(
					joinPoint, log.desc());
			operlog.setLogDesc(str);
		} else {
			operlog.setLogDesc(log.desc());
		}
		operlog.setOperateResult((short) 1);
		if (operateResult == 1) {
			if (!log.result().equals("")) {
				JSONObject obj = null;
				if (retObject instanceof String) {
					try {
						obj = JSONObject.fromObject(retObject);
						if (obj.opt(log.result()) != null) {
							operlog.setOperateResult((short) obj.getInt(log
									.result()));
						}
						if (obj.opt(log.error()) != null) {
							operlog.setLogContent(obj.getString(log.error()));
						}
					} catch (Exception e) {

					}
				}

			}
		} else {
			operlog.setOperateResult((short) 0);
			operlog.setLogContent(exception);
		}
		if(operlog.getLogContent()==null){
			String str = "";
			if(!log.objName().equals("")){
				str += "操作内容："+AnnotationResolver.newInstance().resolver(joinPoint,log.objName()).toString();
			}
			if(!log.objId().equals("")){
				str += "|操作ID："+AnnotationResolver.newInstance().resolver(joinPoint,log.objId()).toString();
			}
			operlog.setLogContent(str);
		}
		User currUser = UserUtil.getUser();
		operlog.setUserName(currUser.getUserName());
		operlog.setAccountId(currUser.getAccountId().intValue());
		operlog.setUserIp(UserUtil.getUserIp());
		operlog.setLogTime(new Date());
		operationLogService.saveOperationLog(operlog);
	}

}
