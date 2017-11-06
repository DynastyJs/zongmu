package com.gosun.sas.utils;

import java.util.Properties;

/**
 * 路由信息判断类
 * 利用application内的路由信息返回正确的BMS IP和port
 * @author hyx
 *
 */
public class GetRouteIpAndPort {
//    /**系统配置**/
//    public static Properties systemConfig = SystemConfig.getSystemConfig();
//    public static final String regx_IP = "(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])"; 
//    /**
//     * 模式1：获取当前客户端对应的正确的服务器的ip和port
//     * @param clientIp 客户端IP
//     * @param serverName 取各个服务器的端口使用,值为:Bms或者Hmc或者Diagnosis
//     */
//    public static String [] getServerRouteIpPort(String clientIp,String serverName){
//        if(clientIp == null) return null;
//        int i = 1;
//        while(i<=255){
//            if(systemConfig.get("clientToServerSubNetIP"+i) != null){
//                String clientSubNetIp = (String) systemConfig.get("clientToServerSubNetIP"+i);
//                String clientSubNetMask = (String) systemConfig.get("clientToServerSubMask"+i);
//                if(checkClientIpIsInSubnet(clientIp,clientSubNetIp,clientSubNetMask)){
//                    String[] ipAndPort = {(String) systemConfig.get("clientToServer"+serverName+"RouteIP"+i),(String) systemConfig.get("clientToServer"+serverName+"RoutePort"+i),(String) systemConfig.get("clientToServer"+serverName+"MapTiledCacheRouteIP"+i),(String) systemConfig.get("clientToServer"+serverName+"MapTiledCacheRoutePort"+i)};
//                    return ipAndPort;
//                }
//            }else{
//                return null;
//            }
//            i++;
//        }
//        return null;
//    }
//    
//    /**
//     * 模式2获取当前客户端对应的正确的服务器 ip和port
//     * @param clientIp 客户端IP
//     * @param serverName 取各个服务器的端口使用,值为:Bms或者Hmc或者Diagnosis
//     */
//    public static String [] getServerRouteIpPortByMode2(String clientIp,String serverName){
//        if(clientIp == null) return null;
//        int i = 1;
//        while(i<=255){
//            if(systemConfig.get("clientTo"+serverName+"SubNetIP"+i) != null){
//                String clientSubNetIp = (String) systemConfig.get("clientTo"+serverName+"SubNetIP"+i);
//                String clientSubNetMask = (String) systemConfig.get("clientTo"+serverName+"SubMask"+i);
//                if(checkClientIpIsInSubnet(clientIp,clientSubNetIp,clientSubNetMask)){
//                    String[] ipAndPort = {(String) systemConfig.get("clientTo"+serverName+"RouteIP"+i),(String) systemConfig.get("clientTo"+serverName+"RoutePort"+i)};
//                    return ipAndPort;
//                }
//            }else{
//                return null;
//            }
//            i++;
//        }
//        return null;
//    }
//    
//    private static boolean checkClientIpIsInSubnet(String clientIp,String subnetIp,String subnetMask){
//        // 验证IP网段和IP格式是否合法 
//        if (!clientIp.matches(regx_IP) || !subnetIp.matches(regx_IP)){ 
//            return false; 
//        } 
//        for(int i=0;i<4;i++){
//            int clientVal = Integer.parseInt(clientIp.split("\\.", -1)[i]);
//            int subnetVal = Integer.parseInt(subnetIp.split("\\.", -1)[i]);
//            int subMaskVal = Integer.parseInt(subnetMask.split("\\.", -1)[i]);
//            if((clientVal&subMaskVal) != (subnetVal&subMaskVal)){
//                return false;
//            }
//        }
//        return true;
//    }
}