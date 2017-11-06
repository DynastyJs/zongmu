package com.gosun.sas.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Where;




/**
 * 用户实体
 * 
 * 使用Hibernate annotation定义二级缓存.
 * 
 * @author abe
 */
//默认的缓存策略.
public class User implements Serializable{
    
    private static final long serialVersionUID = 3411269494087861211L;
    
    public static final String CURRENT_USER = "currentUser";
    public static final String SUPERADMIN_USERNAME = "superadmin.userName";
    public static final String SUPERAMDIN_PASSWORD = "superadmin.password";
    
    public static final Boolean ENABLED = true;//启用
    public static final Boolean DISABLED = false;//禁用
    
    public static final Short LOGIN_TYPE_CLIENT = 0;//监控系统
    public static final Short LOGIN_TYPE_MANAGE = 1;//管理系统
    
    public static final Boolean LOGIN_STATUS_ONLINE = true;//在线
    public static final Boolean LOGIN_STATUS_OFFLINE = false;//离线
    
    public static final Short GENDER_MALE = 1;//男
    public static final Short GENDER_FEMALE = 2;//女
    
    private Long id;
    private Long accountId;
    
    private String loginName;
    private String userName;
    private String contextPath;
    private int orgId;
    /**是否强制登录,默认不能*/
    private Boolean forceLogin = false;
    
    @Transient
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
    @Transient
    public Long getAccountId() {
        return accountId;
    }
    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
    
    @Transient
    public String getLoginName() {
        return loginName;
    }
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }
    @Transient
    public String getContextPath() {
        return contextPath;
    }
    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }
    
    @Transient
    public Boolean getForceLogin() {
        return forceLogin;
    }
    public void setForceLogin(Boolean forceLogin) {
        this.forceLogin = forceLogin;
    }
    
    @Transient
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Transient
	public int getOrgId() {
		return orgId;
	}
	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}
	
	
    
    
}