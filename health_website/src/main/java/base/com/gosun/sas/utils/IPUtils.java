package com.gosun.sas.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

/**
 * ip地址工具类
 * @author Abe
 *
 */
public class IPUtils {
    /**
     * 得到本机ip地址
     * @return
     */
    public static String getIp(){
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 得到客户端ip地址
     * @param httpRequest
     * @return
     */
    public static String getIp(HttpServletRequest httpRequest){
        String remoteAddress = httpRequest.getRemoteAddr();
        if(remoteAddress.equals("0:0:0:0:0:0:0:1") || remoteAddress.equals("127.0.0.1")){
            try {
                remoteAddress = InetAddress.getLocalHost().getHostAddress();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return remoteAddress;
    }
    
    /**
     * 服务器 ping IP，并返回结果
     * @param ip
     * @return
     */
    public static String operaIp(String ip,String opera,String params) {
        if(ip == null ){
            System.out.println("错误IP");
        }
        BufferedReader br = null;
        String value = opera+" " + ip +" "+params;
        try {
            Process p = Runtime.getRuntime().exec(value);
            StringBuilder sb = new StringBuilder();
            String line = null;
             
            br = new BufferedReader(new InputStreamReader(p.getInputStream(),"GBK"));                              
            while ((line = br.readLine()) != null) {
                sb.append(line.trim());
                sb.append('\n');
            }
            br.close();
            System.out.println(sb.toString());
            return sb.toString();
        } catch (Exception e) {
            // TODO Auto-generated catch block
          e.printStackTrace();
          return null;
        }
    }
}
