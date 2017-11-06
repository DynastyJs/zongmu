package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PSCP_ORGANIZE_POS", schema = "HEALTH")
public class PscpOrganizePos implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3975419720758166999L;
	private Integer orgId;
	private String orgX;
	private String orgY;
	private String areaName;
	private String linkMan;
	private String linkPhoneNumber;
	private String warrantyMan;
	private String warrantyPhoneNumber;
	private Integer areaLevel;
	private Integer iconKey;
	public PscpOrganizePos() {
		super();
	}
	public PscpOrganizePos(Integer orgId, String orgX, String orgY,
			String areaName, String linkMan, String linkPhoneNumber,
			String warrantyMan, String warrantyPhoneNumber, Integer areaLevel,
			Integer iconKey) {
		super();
		this.orgId = orgId;
		this.orgX = orgX;
		this.orgY = orgY;
		this.areaName = areaName;
		this.linkMan = linkMan;
		this.linkPhoneNumber = linkPhoneNumber;
		this.warrantyMan = warrantyMan;
		this.warrantyPhoneNumber = warrantyPhoneNumber;
		this.areaLevel = areaLevel;
		this.iconKey = iconKey;
	}
	@Id
	@Column(name = "ORG_ID", unique = true, nullable = false)
	public Integer getOrgId() {
		return orgId;
	}
	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}
	@Column(name = "ORG_X", length = 120)
	public String getOrgX() {
		return orgX;
	}
	public void setOrgX(String orgX) {
		this.orgX = orgX;
	}
	@Column(name = "ORG_Y", length = 120)
	public String getOrgY() {
		return orgY;
	}
	public void setOrgY(String orgY) {
		this.orgY = orgY;
	}
	@Column(name = "AREA_NAME", length = 120)
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	@Column(name = "LINK_MAN", length = 120)
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	@Column(name = "LINK_PHONE_NUMBER", length = 120)
	public String getLinkPhoneNumber() {
		return linkPhoneNumber;
	}
	public void setLinkPhoneNumber(String linkPhoneNumber) {
		this.linkPhoneNumber = linkPhoneNumber;
	}
	@Column(name = "WARRANTY_MAN", length = 120)
	public String getWarrantyMan() {
		return warrantyMan;
	}
	public void setWarrantyMan(String warrantyMan) {
		this.warrantyMan = warrantyMan;
	}
	@Column(name = "WARRANTY_PHONE_NUMBER", length = 120)
	public String getWarrantyPhoneNumber() {
		return warrantyPhoneNumber;
	}
	public void setWarrantyPhoneNumber(String warrantyPhoneNumber) {
		this.warrantyPhoneNumber = warrantyPhoneNumber;
	}
	@Column(name = "AREA_LEVEL")
	public Integer getAreaLevel() {
		return areaLevel;
	}
	public void setAreaLevel(Integer areaLevel) {
		this.areaLevel = areaLevel;
	}
	@Column(name = "ICON_KEY")
	public Integer getIconKey() {
		return iconKey;
	}
	public void setIconKey(Integer iconKey) {
		this.iconKey = iconKey;
	}
	
}
