package com.gosun.sas.log;
import java.lang.reflect.Method;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;


/**
 * 该类的作用可以把方法上的参数绑定到注解的变量中,注解的语法#{变量名}
 * 能解析类似#{task}或者#{task.taskName}或者{task.project.projectName}
 * @author liuxg
 * @date 2016年4月13日 下午8:42:34
 */
public class AnnotationResolver {

	private static AnnotationResolver resolver ;
	
	private static Pattern pattern = Pattern.compile("#\\{\\D*\\}");
	
	
	public static AnnotationResolver newInstance(){
		
		if (resolver == null) {
			return resolver = new AnnotationResolver();
		}else{
			return resolver;
		}
		
	}
	
	
	/**
	 * 解析注解上的值
	 * @param joinPoint
	 * @param str 需要解析的字符串
	 * @return
	 */
	public String resolver(JoinPoint joinPoint, String str) {

		if (str == null) return "" ;
		
		Matcher m = AnnotationResolver.pattern.matcher(str);
		String value = "";
		while(m.find()){
			String mt = m.group();
			String newStr = mt.replaceAll("#\\{", "").replaceAll("\\}", "");
			if (newStr.contains(".")) { // 复杂类型
				try {
					value = complexResolver(joinPoint, newStr);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				value = simpleResolver(joinPoint, newStr);
			}
			str = str.replace(mt,value.toString());
		}
		value = str;
		return value;
	}

	
	private String complexResolver(JoinPoint joinPoint, String str) throws Exception {

		MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();

		String[] names = methodSignature.getParameterNames();
		Object[] args = joinPoint.getArgs();
		String[] strs = str.split("\\.");

		for (int i = 0; i < names.length; i++) {
			if (strs[0].equals(names[i])) {
				Object obj = args[i];
				Method dmethod = obj.getClass().getDeclaredMethod(getMethodName(strs[1]), null);
				Object value = dmethod.invoke(args[i]);
				return getValue(value, 1, strs);
			}
		}

		return "";

	}

	private String getValue(Object obj, int index, String[] strs) {

		try {
			if (obj != null && index < strs.length - 1) {
				Method method = obj.getClass().getDeclaredMethod(getMethodName(strs[index + 1]), null);
				obj = method.invoke(obj);
				getValue(obj, index + 1, strs);
			}
			if(obj == null){
				return "";
			}
			return obj.toString();

		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	private String getMethodName(String name) {
		return "get" + name.replaceFirst(name.substring(0, 1), name.substring(0, 1).toUpperCase());
	}

	
	private String simpleResolver(JoinPoint joinPoint, String str) {
		MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
		String[] names = methodSignature.getParameterNames();
		Object[] args = joinPoint.getArgs();

		for (int i = 0; i < names.length; i++) {
			if (str.equals(names[i])) {
				return args[i].toString();
			}
		}
		return "";
	}
	
}
