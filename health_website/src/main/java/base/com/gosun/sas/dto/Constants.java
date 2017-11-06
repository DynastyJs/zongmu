package com.gosun.sas.dto;

import java.util.HashMap;
import java.util.Map;


/***
 * @ClassName: Constants
 * @Description: 系统环境变量静态存储
 * @author houyx
 * @date 2012-05-16
 * 
 */
public class Constants {
    
    /*
     * 存储全局变量
     */
    public static Long PLATFORM_ID = (long) -1;//平台ID
    
    public static int logSourceType = 2;//
    
    public static HashMap<String,String> uuidMapIp = new HashMap<String,String>();
    
    public static Long uuidVersion = -1L;
    
    public static HashMap<String,String> devTypeList = new HashMap<String,String>();
    
    public static HashMap<String,String> colorTypeList = new HashMap<String,String>();
    
    public static HashMap<String,String> carTypeList = new HashMap<String,String>();
    
    public static HashMap<String,String> carLogoTypeList = new HashMap<String,String>();
    
    public static HashMap<String,String> carNumTypeList = new HashMap<String,String>();
    
}
