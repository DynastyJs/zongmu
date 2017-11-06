package com.gosun.sas.utils;

import java.net.InetAddress;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.gosun.sas.dto.User;


public class UserUtil {

	public static String getCurrentUserName(){
		 HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder
				 .getRequestAttributes()).getRequest();
		 return request.getRemoteUser();
	}

	/**
     * 得到客户端ip地址
     * @param httpRequest
     * @return
     */
    public static String getUserIp(){
    	HttpServletRequest httpRequest = ((ServletRequestAttributes)RequestContextHolder
				 .getRequestAttributes()).getRequest();
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
     * 得到客户端ip地址
     * @param httpRequest
     * @return
     */
    public static User getUser(){
    	HttpServletRequest httpRequest = ((ServletRequestAttributes)RequestContextHolder
				 .getRequestAttributes()).getRequest();
        HttpSession httpSession = httpRequest.getSession();
        if(httpSession.getAttribute(User.CURRENT_USER) == null)
			return null;
		else
			return (User)httpSession.getAttribute(User.CURRENT_USER);
        
    }
}
