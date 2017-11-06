package com.gosun.healthwebsite.model;

import java.util.HashMap;
import java.util.Map;

public class GlobalModel {

	
	//////////////////////////////////////////////////////这一块全局变量为电气火灾设置服务
	/**
	 * 存储用户是否点击取消设置
	 */
	public static Map<String, Boolean> INTERRUPT_SET_FIREPARAM=new HashMap<String, Boolean>();
	
	/**
	 * 存放用户设置设备的值
	 */
	public static Map<String, Map<String, String[]>> USER_SET_FIREPARAM=new HashMap<String, Map<String,String[]>>();
	/**
	 * 用户设置提示
	 */
	public static Map<String, FireParamSetTips> USER_SET_TIPS=new HashMap<String, FireParamSetTips>();
	
}
