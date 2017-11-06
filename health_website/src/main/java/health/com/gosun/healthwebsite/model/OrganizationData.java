package com.gosun.healthwebsite.model;

public class OrganizationData {
	private Integer organizeId;
	private String organizeName;
	private Integer parientId;
	private String orgainzeCode;
	private String orgX;
	private String orgY;
	private String areaName;
	private String linkMan;
	private String linkPhoneNumber;
	private String warrantyMan;
	private String warrantyPhoneNumber;
	private Integer arealevel;
	private Integer iconkey;
	public OrganizationData() {
		super();
	}
	public OrganizationData(Integer organizeId, String organizeName,
			Integer parientId, String orgainzeCode, String orgX, String orgY,
			String areaName, String linkMan, String linkPhoneNumber,
			String warrantyMan, String warrantyPhoneNumber, Integer arealevel,
			Integer iconkey) {
		super();
		this.organizeId = organizeId;
		this.organizeName = organizeName;
		this.parientId = parientId;
		this.orgainzeCode = orgainzeCode;
		this.orgX = orgX;
		this.orgY = orgY;
		this.areaName = areaName;
		this.linkMan = linkMan;
		this.linkPhoneNumber = linkPhoneNumber;
		this.warrantyMan = warrantyMan;
		this.warrantyPhoneNumber = warrantyPhoneNumber;
		this.arealevel = arealevel;
		this.iconkey = iconkey;
	}
	public Integer getOrganizeId() {
		return organizeId;
	}
	public void setOrganizeId(Integer organizeId) {
		this.organizeId = organizeId;
	}
	public String getOrganizeName() {
		return organizeName;
	}
	public void setOrganizeName(String organizeName) {
		this.organizeName = organizeName;
	}
	public Integer getParientId() {
		return parientId;
	}
	public void setParientId(Integer parientId) {
		this.parientId = parientId;
	}
	public String getOrgainzeCode() {
		return orgainzeCode;
	}
	public void setOrgainzeCode(String orgainzeCode) {
		this.orgainzeCode = orgainzeCode;
	}
	public String getOrgX() {
		return orgX;
	}
	public void setOrgX(String orgX) {
		this.orgX = orgX;
	}
	public String getOrgY() {
		return orgY;
	}
	public void setOrgY(String orgY) {
		this.orgY = orgY;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	public String getLinkPhoneNumber() {
		return linkPhoneNumber;
	}
	public void setLinkPhoneNumber(String linkPhoneNumber) {
		this.linkPhoneNumber = linkPhoneNumber;
	}
	public String getWarrantyMan() {
		return warrantyMan;
	}
	public void setWarrantyMan(String warrantyMan) {
		this.warrantyMan = warrantyMan;
	}
	public String getWarrantyPhoneNumber() {
		return warrantyPhoneNumber;
	}
	public void setWarrantyPhoneNumber(String warrantyPhoneNumber) {
		this.warrantyPhoneNumber = warrantyPhoneNumber;
	}
	public Integer getArealevel() {
		return arealevel;
	}
	public void setArealevel(Integer arealevel) {
		this.arealevel = arealevel;
	}
	public Integer getIconkey() {
		return iconkey;
	}
	public void setIconkey(Integer iconkey) {
		this.iconkey = iconkey;
	}
	
}
