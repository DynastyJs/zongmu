package com.gosun.healthwebsite.entity;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * C3mFsuExtend generated by hbm2java
 */
@Entity
@Table(name = "C3M_FSU_EXTEND", schema = "HEALTH")
public class C3mFsuExtend implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private String fsuId;
	private String netAddress;
	private String netPort;

	public C3mFsuExtend() {
	}

	public C3mFsuExtend(String fsuId) {
		this.fsuId = fsuId;
	}

	public C3mFsuExtend(String fsuId, String netAddress) {
		this.fsuId = fsuId;
		this.netAddress = netAddress;
	}

	@Id

	@Column(name = "FSU_ID", unique = true, nullable = false, length = 40)
	public String getFsuId() {
		return this.fsuId;
	}

	public void setFsuId(String fsuId) {
		this.fsuId = fsuId;
	}
	
	@Column(name = "NET_ADDRESS", length = 30)
	public String getNetAddress() {
		return this.netAddress;
	}

	public void setNetAddress(String netAddress) {
		this.netAddress = netAddress;
	}
	
	@Column(name = "NET_PORT", length = 10)
	public String getNetPort() {
		return this.netPort;
	}

	public void setNetPort(String netPort) {
		this.netPort = netPort;
	}
	
}