package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * BizMask generated by hbm2java
 */
@Entity
@Table(name = "VIEW_TEMPLATE_CHNNLIST", schema = "HEALTH")
public class UIDevAuthInfo implements java.io.Serializable {
	

	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -1895446085848111072L;

	private Long id;
	private Long chnnEquId;
	private Long dvsEquId;
	private Long templateId;
	private String devName;
	private String chnnName;
	private String orgName;
	private String netAddress;
	
	@Id
	@Column(name = "ID")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "chnid")
	public Long getChnnEquId() {
		return chnnEquId;
	}
	public void setChnnEquId(Long chnnEquId) {
		this.chnnEquId = chnnEquId;
	}
	
	@Column(name = "dvs_equ_id")
	public Long getDvsEquId() {
		return dvsEquId;
	}
	public void setDvsEquId(Long dvsEquId) {
		this.dvsEquId = dvsEquId;
	}
	
	@Column(name = "devName")
	public String getDevName() {
		return devName;
	}
	public void setDevName(String devName) {
		this.devName = devName;
	}
	
	@Column(name = "name")
	public String getChnnName() {
		return chnnName;
	}
	public void setChnnName(String chnnName) {
		this.chnnName = chnnName;
	}
	
	@Column(name = "organize_name")
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	@Column(name = "net_address")
	public String getNetAddress() {
		return netAddress;
	}
	public void setNetAddress(String netAddress) {
		this.netAddress = netAddress;
	}
	@Column(name = "timetemplateid")
	public Long getTemplateId() {
		return templateId;
	}
	public void setTemplateId(Long templateId) {
		this.templateId = templateId;
	}
	
	

}
