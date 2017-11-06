package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "view_fsu_info", schema = "HEALTH")
public class UIFsuInfo implements java.io.Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5100702622411301313L;
	private String fsuId;
	private String fsuCode;
	private String name;
	private Long orgId;
	private String moduleType;
	private String netAddress;
	private String netPort;
	private String path;
	private String pathName;
	private String netStatus;
	
	@Column(name="PATH_NAME")
	public String getPathName() {
		return pathName;
	}
	public void setPathName(String pathName) {
		this.pathName = pathName;
	}
	@Column(name="PATH")
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	@Id
	@Column(name = "FSU_ID")
	public String getFsuId() {
		return fsuId;
	}
	public void setFsuId(String fsuId) {
		this.fsuId = fsuId;
	}
	@Column(name = "FSU_CODE")
	public String getFsuCode() {
		return fsuCode;
	}
	public void setFsuCode(String fsuCode) {
		this.fsuCode = fsuCode;
	}
	@Column(name = "NAME")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "ORG_ID")
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	@Column(name = "MODULE_TYPE")
	public String getModuleType() {
		return moduleType;
	}
	public void setModuleType(String moduleType) {
		this.moduleType = moduleType;
	}
	@Column(name = "NET_ADDRESS")
	public String getNetAddress() {
		return netAddress;
	}
	public void setNetAddress(String netAddress) {
		this.netAddress = netAddress;
	}
	@Column(name = "NET_PORT")
	public String getNetPort() {
		return netPort;
	}
	public void setNetPort(String netPort) {
		this.netPort = netPort;
	}
	
	@Column(name = "NET_STATUS")
	public String getNetStatus() {
		return netStatus;
	}
	public void setNetStatus(String netStatus) {
		this.netStatus = netStatus;
	}
	
	
	
	
}
