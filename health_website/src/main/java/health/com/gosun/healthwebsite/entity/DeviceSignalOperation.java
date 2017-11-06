/** 
*
*/
package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/** 
 * @ClassName: DeviceSignalOperation 
 * @Description: TODO 
 * @author linnan
 * @date 2017年4月26日 上午9:45:34  
 */
@Entity
@Table(name="C3M_SIGNAL_OPERATION_LOG",schema="HEALTH")
public class DeviceSignalOperation implements Serializable,Cloneable {

	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -6313652569323456500L;
	private Long operationId;
	private Long deviceId;
	private String c3mDeviceId;//动环设备映射标识
	private Long userId;
	private String signalId;
	private String operationStatus;
	private Date operationTime;
	private String setUpValue;
	private Long orgId;
	private String fsuIp;
	private String fsuPort;
	private String fsuId;
	private Map<String,String> signalMap;//存放信号量id和值
	
	public DeviceSignalOperation(){
		this.operationTime = new Date();
	}
	
	@Override  
    public Object clone() {  
	 DeviceSignalOperation dso = null;  
        try{  
            dso = (DeviceSignalOperation)super.clone();
        }catch(CloneNotSupportedException e) {  
            e.printStackTrace();  
        }  
        return dso;  
    }  
	
	@Id
	@SequenceGenerator(name="SEQ_C3M_SIGNAL_OPERATION_LOG", sequenceName="SEQ_C3M_SIGNAL_OPERATION_LOG")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_C3M_SIGNAL_OPERATION_LOG")
	@Column(name = "OPERATION_ID", unique = true, nullable = false, precision = 10, scale = 0)
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

	@Transient
	public String getC3mDeviceId() {
		return c3mDeviceId;
	}
	public void setC3mDeviceId(String c3mDeviceId) {
		this.c3mDeviceId = c3mDeviceId;
	}

	@Transient
	public Map<String,String> getSignalMap() {
		return signalMap;
	}
	public void setSignalMap(Map<String,String> signalMap) {
		this.signalMap = signalMap;
	}
	
}
