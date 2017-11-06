package com.gosun.sas.log;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 日志注解类
 * @author wwf
 * @date 2016年4月12日
 * @time 上午10:40:47
 */
@Target(ElementType.METHOD)

@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    
	/**
	 * 操作描述
	 * @return
	 */
	String desc() default "";
	
	String result() default "0";
	
	String error() default "";
	
	String objId() default "";
	
	String objName() default "";
	
	int type() default 0; //1：登录日志，0：操作日志
	
	int needParse() default 0; //1：转，0：不转
	
	public static final int LOG_TYPE_LOGIN = 1;
	  
	public static final int LOG_TYPE_OPERATE = 0;
	
	public static final int NeedParse = 1;
	
}