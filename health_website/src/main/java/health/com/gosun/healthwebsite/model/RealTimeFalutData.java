package com.gosun.healthwebsite.model;

public class RealTimeFalutData {
	private Integer orgid;
	private String orgName;
	private Integer deviceCount;
	private Integer faultCount;
	public RealTimeFalutData() {
		super();
	}
	public RealTimeFalutData(Integer orgid, String orgName, Integer deviceCount,
			Integer faultCount) {
		super();
		this.orgid = orgid;
		this.orgName = orgName;
		this.deviceCount = deviceCount;
		this.faultCount = faultCount;
	}
	public Integer getOrgid() {
		return orgid;
	}
	public void setOrgid(Integer orgid) {
		this.orgid = orgid;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public Integer getDeviceCount() {
		return deviceCount;
	}
	public void setDeviceCount(Integer deviceCount) {
		this.deviceCount = deviceCount;
	}
	public Integer getFaultCount() {
		return faultCount;
	}
	public void setFaultCount(Integer faultCount) {
		this.faultCount = faultCount;
	}
	
}
