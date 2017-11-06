package com.gosun.sas.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;




/**
 * 平台信息实体
 * 
 * 使用Hibernate annotation定义二级缓存.
 * 
 * @author abe
 */
@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "TB_PLATFORMINFO")
//默认的缓存策略.
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Platform implements Serializable{
	
    /**
     * 
     */
    private static final long serialVersionUID = -3453679487330604094L;
    
    private Long id;
    private Long platformId;
    private Integer type;
    private String name;
    private String version;
    private String ip;
    private Integer port;
    private String loginName;
    private String loginPwd;
    private Integer isDNS;
    private String remark;
    private String gbCode;
    private Integer isEnable;
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name = "ID", nullable = false)      
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
    @Column(name = "PLATFORM_ID")
    public Long getPlatformId() {
        return platformId;
    }
    public void setPlatformId(Long platformId) {
        this.platformId = platformId;
    }
    
    @Column(name = "TYPE")
    public Integer getType() {
        return type;
    }
    public void setType(Integer type) {
        this.type = type;
    }
    
    @Column(name = "NAME")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    @Column(name = "VERSION")
    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }
    
    @Column(name = "IP")
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    
    @Column(name = "IS_DNS")
    public Integer getIsDNS() {
        return isDNS;
    }
    public void setIsDNS(Integer isDNS) {
        this.isDNS = isDNS;
    }
    
    @Column(name = "REMARK")
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        this.remark = remark;
    }
    
    @Column(name = "GB28181_CODE")
    public String getGbCode() {
        return gbCode;
    }
    public void setGbCode(String gbCode) {
        this.gbCode = gbCode;
    }
    public void setPort(Integer port) {
        this.port = port;
    }
    
    @Column(name = "PORT")
    public int getPort() {
        return port;
    }
    public void setPort(int port) {
        this.port = port;
    }
    
    @Column(name = "LOGIN_NAME")
    public String getLoginName() {
        return loginName;
    }
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }
    
    @Column(name = "LOGIN_PWD")
    public String getLoginPwd() {
        return loginPwd;
    }
    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd;
    }
    
    @Column(name = "IS_ENABLE")
	public Integer getIsEnable() {
		return isEnable;
	}
	public void setIsEnable(Integer isEnable) {
		this.isEnable = isEnable;
	}
    
    

   
}