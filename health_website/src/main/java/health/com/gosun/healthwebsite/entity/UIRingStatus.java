package com.gosun.healthwebsite.entity;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

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
@Table(name = "VIEW_UI_C3M_ALARM_STATUS_NEW", schema = "HEALTH")
public class UIRingStatus implements java.io.Serializable {
	
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 8012026614106915318L;
	
	private Long dataId;
	private Long equipmentId;
	private Long fsuId;
	private String pathName;
	private String path;
	private String equipmentName;
	private String  equipmentTypeName;
	private String propertyName;
	private String netAddress;
	private String netStatus;
	private String alarmCount;
	private String lastProcessTime;
	private String lastUpdateTime;
	private String processResult;
	private String processDesc;
//	private String electricCity;
//	private String ups;
//	private String temperature;
//	private String humidity;
	private String focusFlag;
	private String orgId;
	
	
	
	@Id
	@Column(name = "DATA_ID")
	public Long getDataId() {
		return dataId;
	}

	public void setDataId(Long dataId) {
		this.dataId = dataId;
	}

	
	@Column(name = "EQUIPMENT_ID")
	public Long getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}
	
	@Column(name = "PATH_NAME")
	public String getPathName() {
		return pathName;
	}

	public void setPathName(String pathName) {
		this.pathName = pathName;
	}
	
	@Column(name = "EQUIPMENT_NAME")
	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}
	
	@Column(name = "EQUIPMENT_TYPE_NAME")
	public String getEquipmentTypeName() {
		return equipmentTypeName;
	}

	public void setEquipmentTypeName(String equipmentTypeName) {
		this.equipmentTypeName = equipmentTypeName;
	}
	
	
	@Column(name = "NET_ADDRESS")
	public String getNetAddress() {
		return netAddress;
	}

	public void setNetAddress(String netAddress) {
		this.netAddress = netAddress;
	}
	
	@Column(name = "NET_STATUS")
	public String getNetStatus() {
		return netStatus;
	}

	public void setNetStatus(String netStatus) {
		this.netStatus = netStatus;
	}

	
	@Column(name = "ALARM_COUNT")
	public String getAlarmCount() {
		return alarmCount;
	}

	public void setAlarmCount(String alarmCount) {
		this.alarmCount = alarmCount;
	}
	
	@Column(name = "LAST_PROCESS_TIME")
	public String getLastProcessTime() {
		return lastProcessTime;
	}

	public void setLastProcessTime(String lastProcessTime) {
		this.lastProcessTime = lastProcessTime;
	}
	
	@Column(name = "LAST_UPDATE_TIME")
	public String getLastUpdateTime() {
		return lastUpdateTime;
	}

	public void setLastUpdateTime(String lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}

	@Column(name = "PROCESS_RESULT")
	public String getProcessResult() {
		return processResult;
	}

	public void setProcessResult(String processResult) {
		this.processResult = processResult;
	}
	
	@Column(name = "PROCESS_DESC")
	public String getProcessDesc() {
		return processDesc;
	}

	public void setProcessDesc(String processDesc) {
		this.processDesc = processDesc;
	}
	
//	@Column(name = "ELECTRICCITY")
//	public String getElectricCity() {
//		return electricCity;
//	}
//
//	public void setElectricCity(String electricCity) {
//		this.electricCity = electricCity;
//	}
//
//	public String getUps() {
//		return ups;
//	}
//
//	public void setUps(String ups) {
//		this.ups = ups;
//	}
//	
//	@Column(name = "TEMPERATURE")
//	public String getTemperature() {
//		return temperature;
//	}
//
//	public void setTemperature(String temperature) {
//		this.temperature = temperature;
//	}
//	
//	@Column(name = "HUMIDITY")
//	public String getHumidity() {
//		return humidity;
//	}
//
//	public void setHumidity(String humidity) {
//		this.humidity = humidity;
//	}
	
	@Column(name = "PATH")
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	@Column(name = "PROPERTY_NAME")
	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	
	@Column(name = "FOCUS_FLAG")
	public String getFocusFlag() {
		return focusFlag;
	}

	public void setFocusFlag(String focusFlag) {
		this.focusFlag = focusFlag;
	}
	
	@Column(name = "FSU_ID")
	public Long getFsuId() {
		return fsuId;
	}

	public void setFsuId(Long fsuId) {
		this.fsuId = fsuId;
	}
	
	@Column(name = "ORG_ID")
	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	
	
	
		

}
