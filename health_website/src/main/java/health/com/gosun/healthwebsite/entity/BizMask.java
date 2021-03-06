package com.gosun.healthwebsite.entity;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * BizMask generated by hbm2java
 */
@Entity
@Table(name = "BIZ_MASK", schema = "HEALTH")
public class BizMask implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long maskId;
	private Long orgId;
	private Long equipmentId;
	private String equipmentPropertyName;
	private char isMask;
	private Long maskTime; 
	private Date finishMaskTime;
	
	
	@Id
	@SequenceGenerator(name="SEQ_BIZ_MASK", sequenceName="SEQ_BIZ_MASK")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BIZ_MASK")
	@Column(name = "MASK_ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Long getMaskId() {
		return this.maskId;
	}

	public void setMaskId(Long maskId) {
		this.maskId = maskId;
	}

	@Column(name = "ORG_ID", nullable = false, length = 20)
	public Long getOrgId() {
		return this.orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	
	@Column(name = "EQUIPMENT_ID", nullable = false, length = 20)
	public Long getEquipmentId() {
		return this.equipmentId;
	}

	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}
	
	@Column(name = "EQUIPMENT_PROPERTY_NAME")
	public String getEquipmentPropertyName() {
		return this.equipmentPropertyName;
	}

	public void setEquipmentPropertyName(String equipmentPropertyName) {
		this.equipmentPropertyName = equipmentPropertyName;
	}
	
	@Column(name = "IS_MASK", nullable = false, length = 1)
	public char getIsMask() {
		return this.isMask;
	}

	public void setIsMask(char isMask) {
		this.isMask = isMask;
	}
	
	@Column(name = "MASK_TIME")
	public Long getMaskTime() {
		return maskTime;
	}

	public void setMaskTime(Long maskTime) {
		this.maskTime = maskTime;
	}
	
	@Column(name = "FINISH_MASK_TIME")
	public Date getFinishMaskTime() {
		return finishMaskTime;
	}

	public void setFinishMaskTime(Date finishMaskTime) {
		this.finishMaskTime = finishMaskTime;
	}
	
	
	
	
}
