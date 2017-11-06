package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TB_V2_DEVAUTHORIZATION", schema = "HEALTH")
public class TbV2DevauthOrg implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2423273612448677045L;
	@Id
	@SequenceGenerator(name="SEQ_TB_V2_DEVAUTHORG", sequenceName="SEQ_TB_V2_DEVAUTHORG")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TB_V2_DEVAUTHORG")
	@Column(name = "AUTHID")
	private Long authId;
	@Column(name = "TIMETEMPLATEID")
	private Long timeTempLateId;
	@Column(name = "AUTHNAME")
	private String authName;
	@Column(name = "AUTHTYPE")
	private Long authType;
	@Column(name = "REMARK")
	private String remark;
	@Column(name = "ORGANIZEID")
	private Long organizeId;
	public TbV2DevauthOrg() {
		super();
	}
	public TbV2DevauthOrg(Long authId, Long timeTempLateId,
			String authName, Long authType, String remark, Long organizeId) {
		super();
		this.authId = authId;
		this.timeTempLateId = timeTempLateId;
		this.authName = authName;
		this.authType = authType;
		this.remark = remark;
		this.organizeId = organizeId;
	}
	public Long getAuthId() {
		return authId;
	}
	public void setAuthId(Long authId) {
		this.authId = authId;
	}
	public Long getTimeTempLateId() {
		return timeTempLateId;
	}
	public void setTimeTempLateId(Long timeTempLateId) {
		this.timeTempLateId = timeTempLateId;
	}
	public String getAuthName() {
		return authName;
	}
	public void setAuthName(String authName) {
		this.authName = authName;
	}
	public Long getAuthType() {
		return authType;
	}
	public void setAuthType(Long authType) {
		this.authType = authType;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Long getOrganizeId() {
		return organizeId;
	}
	public void setOrganizeId(Long organizeId) {
		this.organizeId = organizeId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
