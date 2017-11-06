/**
 * @Title: ServerInfo.java 	
 * @Package com.gosun.sas.entity 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:10:52 	
 * @version V1.0   
 */
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
 * @ClassName: ServerInfo 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:10:52
 */
//JPA标识
@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "TB_SERVER_INFO")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ServerInfo implements Serializable{
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -916931778689923519L;
	
	private Long serverId;
	private Integer serverType;
	private String serverName;
	private String serverVersion;
	private String ip;
	private Integer port;
	private String loginName;
	private String loginPwd;
	private Integer isDNS;
	private Integer status;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	@Column(name = "SERV_ID", nullable = false)       
	public Long getServerId() {
		return serverId;
	}
	public void setServerId(Long serverId) {
		this.serverId = serverId;
	}
	
	@Column(name="SERV_TYPE")
	public Integer getServerType() {
		return serverType;
	}
	public void setServerType(Integer serverType) {
		this.serverType = serverType;
	}
	
	@Column(name="SERV_NAME")
	public String getServerName() {
		return serverName;
	}
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
	
	@Column(name="SERV_VERSION")
	public String getServerVersion() {
		return serverVersion;
	}
	public void setServerVersion(String serverVersion) {
		this.serverVersion = serverVersion;
	}
	
	@Column(name="SERV_IP")
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@Column(name="SERV_PORT")
	public Integer getPort() {
		return port;
	}
	public void setPort(Integer port) {
		this.port = port;
	}
	
	@Column(name="LOGIN_NAME")
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	
	@Column(name="LOGIN_PWD")
	public String getLoginPwd() {
		return loginPwd;
	}
	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}
	
	@Column(name="IS_DNS")
	public Integer getIsDNS() {
		return isDNS;
	}
	public void setIsDNS(Integer isDNS) {
		this.isDNS = isDNS;
	}
	
	@Column(name="STATUS")
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
	
}
