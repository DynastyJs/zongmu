/** 
*
*/
package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** 
 * @ClassName: ViewDeviceSignalOperation 
 * @Description: TODO 
 * @author linnan
 * @date 2017年4月28日 下午2:29:26  
 */
@Entity
@Table(name = "view_UI_C3M_signal_operation", schema = "HEALTH", catalog = "")
public class ViewDeviceSignalOperation implements Serializable {

	private static final long serialVersionUID = 8992169820535639842L;
	private Long operationId;
	private Long deviceId;
	private String equipmentName;
	private Long userId;
	private String userName;
	private String signalId;
	private String signalName;
	private String operationStatus;
	private Date operationTime;
	private String setUpValue;
	private Long orgId;
	private String areaName;
	private String fsuIp;
	private String fsuName;
	private String fsuPort;
	private String fsuId;
	
	@Id
	@Column(name = "OPERATION_ID")
	public Long getOperationId() {
		return operationId;
	}
	public void setOperationId(Long operationId) {
		this.operationId = operationId;
	}
	
	@Column(name="DEVICE_ID")
	public Long getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Long deviceId) {
		this.deviceId = deviceId;
	}
	
	@Column(name="SIGNAL_ID")
	public String getSignalId() {
		return signalId;
	}
	public void setSignalId(String signalId) {
		this.signalId = signalId;
	}
	
	@Column(name="OPERATION_STATUS")
	public String getOperationStatus() {
		return operationStatus;
	}
	public void setOperationStatus(String operationStatus) {
		this.operationStatus = operationStatus;
	}
	
	@Column(name="OPERATION_TIME")
	public Date getOperationTime() {
		return operationTime;
	}
	public void setOperationTime(Date operationTime) {
		this.operationTime = operationTime;
	}

	@Column(name="USER_ID")
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Column(name="SET_UP_VALUE")
	public String getSetUpValue() {
		return setUpValue;
	}
	public void setSetUpValue(String setUpValue) {
		this.setUpValue = setUpValue;
	}

	@Column(name="ORG_ID")
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	
	@Column(name="USER_NAME")
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Column(name="SIGNAL_NAME")
	public String getSignalName() {
		return signalName;
	}
	public void setSignalName(String signalName) {
		this.signalName = signalName;
	}
	
	@Column(name="AREA_NAME")
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	
	@Column(name="EQUIPMENT_NAME")
	public String getEquipmentName() {
		return equipmentName;
	}
	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	@Column(name="FSU_IP")
	public String getFsuIp() {
		return fsuIp;
	}
	public void setFsuIp(String fsuIp) {
		this.fsuIp = fsuIp;
	}
	
	@Column(name="FSU_PORT")
	public String getFsuPort() {
		return fsuPort;
	}
	public void setFsuPort(String fsuPort) {
		this.fsuPort = fsuPort;
	}
	
	@Column(name="FSU_ID")
	public String getFsuId() {
		return fsuId;
	}
	public void setFsuId(String fsuId) {
		this.fsuId = fsuId;
	}

	@Column(name="FSU_NAME")
	public String getFsuName() {
		return fsuName;
	}
	public void setFsuName(String fsuName) {
		this.fsuName = fsuName;
	}
	
	
}
