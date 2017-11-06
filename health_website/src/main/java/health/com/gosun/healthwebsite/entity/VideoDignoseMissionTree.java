package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "VIEW_DIGNOSETREE_LSIT", schema = "HEALTH")
public class VideoDignoseMissionTree implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1387275600450433935L;
	
	@Id
	@Column(name = "EQUIPMENT_ID")
	private Long equipmentId;
	@Column(name = "NAME")
	private String name;
	@Column(name = "MISSION_ID")
	private String  missionId;
	@Column(name = "CODE")
	private String code;
	@Column(name = "DVS")
	private String dvs;
	@Column(name = "PARENTID")
	private Long parentId;
	@Column(name="ORG_ID")
	private Long orgId;
	@Column(name="PATH")
	private String path;
	
	public VideoDignoseMissionTree() {
		super();
	}
	public VideoDignoseMissionTree(Long equipmentId, String name,
			String missionId, String code, String dvs, Long parentId) {
		super();
		this.equipmentId = equipmentId;
		this.name = name;
		this.missionId = missionId;
		this.code = code;
		this.dvs = dvs;
		this.parentId = parentId;
	}
	public Long getEquipmentId() {
		return equipmentId;
	}
	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMissionId() {
		return missionId;
	}
	public void setMissionId(String missionId) {
		this.missionId = missionId;
	}
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getDvs() {
		return dvs;
	}
	public void setDvs(String dvs) {
		this.dvs = dvs;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
}
