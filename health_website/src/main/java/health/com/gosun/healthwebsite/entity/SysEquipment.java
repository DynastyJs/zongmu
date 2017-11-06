package com.gosun.healthwebsite.entity;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

/**
 * SysEquipment generated by hbm2java
 */
@Entity
@Table(name = "SYS_EQUIPMENT", schema = "HEALTH")
@Where(clause = "IS_DELETED = 0")
public class SysEquipment implements java.io.Serializable {
	
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -2781085662154591223L;
	private Long equipmentId;
	private String name;
	private String code;
	private Long orgId;
	private String equipmentTypeId;
	private String producer;
	private String moduleName;
	private String netAddress;
	private String netPort;
	private String fsuId;
	private String c3mDeviceId;
	private SysEquipmentType equipmentType;
	private List<BizEquipmentStatus>  equStatusList;
	private String path;
	private Long parentId;
	private String aliasName;
	private Long isDelete;
	private Long isManualIn;

	public SysEquipment() {
	}

	public SysEquipment(Long equipmentId, String name, String equipmentTypeId) {
		this.equipmentId = equipmentId;
		this.name = name;
		this.equipmentTypeId = equipmentTypeId;
	}

	public SysEquipment(Long equipmentId, String name, Long orgId, String equipmentTypeId, String producer,
			String moduleName, String netAddress, String fsuId, String c3mDeviceId) {
		this.equipmentId = equipmentId;
		this.name = name;
		this.orgId = orgId;
		this.equipmentTypeId = equipmentTypeId;
		this.producer = producer;
		this.moduleName = moduleName;
		this.netAddress = netAddress;
		this.fsuId = fsuId;
		this.c3mDeviceId = c3mDeviceId;
	}

	@Id
	@SequenceGenerator(name="SEQ_SYS_EQUIPMENT", sequenceName="health.SEQ_SYS_EQUIPMENT")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_SYS_EQUIPMENT")
	@Column(name = "EQUIPMENT_ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Long getEquipmentId() {
		return this.equipmentId;
	}

	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}

	@Column(name = "NAME", nullable = false, length = 120)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "CODE", length = 100)
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "ORG_ID", precision = 10, scale = 0)
	public Long getOrgId() {
		return this.orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	@Column(name = "EQUIPMENT_TYPE_ID", nullable = false, precision = 10, scale = 0)
	public String getEquipmentTypeId() {
		return this.equipmentTypeId;
	}

	public void setEquipmentTypeId(String equipmentTypeId) {
		this.equipmentTypeId = equipmentTypeId;
	}

	@Column(name = "PRODUCER", length = 120)
	public String getProducer() {
		return this.producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	@Column(name = "MODULE_NAME", length = 120)
	public String getModuleName() {
		return this.moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	@Column(name = "NET_ADDRESS", length = 60)
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

	@Column(name = "FSU_ID", length = 40)
	public String getFsuId() {
		return this.fsuId;
	}

	public void setFsuId(String fsuId) {
		this.fsuId = fsuId;
	}
	
	@Column(name = "C3M_DEVICE_ID", length = 40)
	public String getC3MDeviceId() {
		return this.c3mDeviceId;
	}

	public void setC3MDeviceId(String c3mDeviceId) {
		this.c3mDeviceId = c3mDeviceId;
	}
	
    @ManyToOne
    @JoinColumn(name = "EQUIPMENT_TYPE_ID",referencedColumnName="EQUIPMENT_TYPE_ID",insertable=false,updatable=false)
    @NotFound(action=NotFoundAction.IGNORE)
	public SysEquipmentType getEquipmentType() {
		return equipmentType;
	}

	public void setEquipmentType(SysEquipmentType equipmentType) {
		this.equipmentType = equipmentType;
	}
	
	
	@Column(name = "PATH")
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	@Column(name = "PARENT_ID")
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
	@Column(name = "ALIAS_NAME")
	public String getAliasName() {
		return aliasName;
	}

	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}
	
	@Column(name = "IS_DELETED")
	public Long getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Long isDelete) {
		this.isDelete = isDelete;
	}

	@Column(name="IS_MANUAL_IN")
	public Long getIsManualIn() {
		return isManualIn;
	}

	public void setIsManualIn(Long isManualIn) {
		this.isManualIn = isManualIn;
	}
	
	
	
	
	
	
	
	

}
