package com.gosun.healthwebsite.model;

import com.gosun.service.entity.OrgRsp;

public class FireParamTree extends OrgRsp{

    private String icon;
    private String idStr;
    private String c3mDeviceId;
    private String host;
    private String hostIp;
    private String orgPath;
    private String fsuId;
    private String hostPort;
    
    
    
    

	public String getHostPort() {
		return hostPort;
	}
	public void setHostPort(String hostPort) {
		this.hostPort = hostPort;
	}
	public String getFsuId() {
		return fsuId;
	}
	public void setFsuId(String fsuId) {
		this.fsuId = fsuId;
	}
	public String getOrgPath() {
		return orgPath;
	}
	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getHostIp() {
		return hostIp;
	}
	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getIdStr() {
		return idStr;
	}
	public void setIdStr(String idStr) {
		this.idStr = idStr;
	}
	public String getC3mDeviceId() {
		return c3mDeviceId;
	}
	public void setC3mDeviceId(String c3mDeviceId) {
		this.c3mDeviceId = c3mDeviceId;
	}
    
    
}
