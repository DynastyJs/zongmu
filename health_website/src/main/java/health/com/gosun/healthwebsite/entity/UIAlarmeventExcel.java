package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gosun.core.utils.date.DateTimeUtils;

@Entity
@Table(name = "VIEW_UI_ALARMEVENT_EXCEL", schema = "HEALTH", catalog = "")
public class UIAlarmeventExcel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3243354195617745402L;
	private Long dataId;
    private String alarmLevel;
    private String focusFlag;
    private Date beginTime;
    private String repairFlag;
    private String equipmentName;
    private String equipmentType;
    private String alarmType;
    private String alarmDesc;
    private Date lastProcessTime;
    private String lastProcessResult;
    private String lastAlarmDesc;
    private String lastProcessDesc;
    private String path;
	private String beginTimeStr;
	private String processTimeStr;
    private Long equipmentId;
    private String propertyName;
    private String organizeName;
    private Long alarmCount;
    private String isMask;
    private Integer orgId; 
    private String producer;
    private String moduleName;
    private String netAddress;
    private String linkMan;
    private String linkPhoneNumber;
    private String warrantyMan;
    private String warrantyPhoneNumber;
	public UIAlarmeventExcel() {
		super();
	}
	public UIAlarmeventExcel(Long dataId, String alarmLevel, String focusFlag,
			Date beginTime, String repairFlag, String equipmentName,
			String equipmentType, String alarmType, String alarmDesc,
			Date lastProcessTime, String lastProcessResult,
			String lastAlarmDesc, String lastProcessDesc, String path,
			String beginTimeStr, String processTimeStr, Long equipmentId,
			String propertyName, String organizeName, Long alarmCount,
			String isMask, Integer orgId, String producer, String moduleName,
			String netAddress, String linkMan, String linkPhoneNumber,
			String warrantyMan, String warrantyPhoneNumber) {
		super();
		this.dataId = dataId;
		this.alarmLevel = alarmLevel;
		this.focusFlag = focusFlag;
		this.beginTime = beginTime;
		this.repairFlag = repairFlag;
		this.equipmentName = equipmentName;
		this.equipmentType = equipmentType;
		this.alarmType = alarmType;
		this.alarmDesc = alarmDesc;
		this.lastProcessTime = lastProcessTime;
		this.lastProcessResult = lastProcessResult;
		this.lastAlarmDesc = lastAlarmDesc;
		this.lastProcessDesc = lastProcessDesc;
		this.path = path;
		this.beginTimeStr = beginTimeStr;
		this.processTimeStr = processTimeStr;
		this.equipmentId = equipmentId;
		this.propertyName = propertyName;
		this.organizeName = organizeName;
		this.alarmCount = alarmCount;
		this.isMask = isMask;
		this.orgId = orgId;
		this.producer = producer;
		this.moduleName = moduleName;
		this.netAddress = netAddress;
		this.linkMan = linkMan;
		this.linkPhoneNumber = linkPhoneNumber;
		this.warrantyMan = warrantyMan;
		this.warrantyPhoneNumber = warrantyPhoneNumber;
	}
	@Id
    @Column(name = "DATA_ID")
    public Long getDataId() {
        return dataId;
    }

    public void setDataId(Long dataId) {
        this.dataId = dataId;
    }

   
    @Column(name = "ALARM_LEVEL")
    public String getAlarmLevel() {
        return alarmLevel;
    }

    public void setAlarmLevel(String alarmLevel) {
        this.alarmLevel = alarmLevel;
    }

   
    @Column(name = "FOCUS_FLAG")
    public String getFocusFlag() {
        return focusFlag;
    }

    public void setFocusFlag(String focusFlag) {
        this.focusFlag = focusFlag;
    }

   
    @Column(name = "BEGINTIME")
    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

   
    @Column(name = "REPAIR_FLAG")
    public String getRepairFlag() {
        return repairFlag;
    }

    public void setRepairFlag(String repairFlag) {
        this.repairFlag = repairFlag;
    }

   
    @Column(name = "EQUIPMENT_NAME")
    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

   
    @Column(name = "EQUIPMENT_TYPE")
    public String getEquipmentType() {
        return equipmentType;
    }

    public void setEquipmentType(String equipmentType) {
        this.equipmentType = equipmentType;
    }

   
    @Column(name = "ALARM_TYPE")
    public String getAlarmType() {
        return alarmType;
    }

    public void setAlarmType(String alarmType) {
        this.alarmType = alarmType;
    }

   
    @Column(name = "ALARM_DESC")
    public String getAlarmDesc() {
        return alarmDesc;
    }

    public void setAlarmDesc(String alarmDesc) {
        this.alarmDesc = alarmDesc;
    }

   
    @Column(name = "LAST_PROCESS_TIME")
    public Date getLastProcessTime() {
        return lastProcessTime;
    }

    public void setLastProcessTime(Date lastProcessTime) {
        this.lastProcessTime = lastProcessTime;
    }

   
    @Column(name = "LAST_PROCESS_RESULT")
    public String getLastProcessResult() {
        return lastProcessResult;
    }

    public void setLastProcessResult(String lastProcessResult) {
        this.lastProcessResult = lastProcessResult;
    }

   
    @Column(name = "LAST_ALARM_DESC")
    public String getLastAlarmDesc() {
        return lastAlarmDesc;
    }

    public void setLastAlarmDesc(String lastAlarmDesc) {
        this.lastAlarmDesc = lastAlarmDesc;
    }

   
    @Column(name = "LAST_PROCESS_DESC")
    public String getLastProcessDesc() {
        return lastProcessDesc;
    }

    public void setLastProcessDesc(String lastProcessDesc) {
        this.lastProcessDesc = lastProcessDesc;
    }


   
    @Column(name="PATH")
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
    
	@Transient
	public String getBeginTimeStr() {
		if(this.beginTime!=null){
			return DateTimeUtils.convertDateToStringByFormat(this.beginTime);
		}
		return "";
	}
	
	@Transient
	public String getProcessTimeStr() {
		if(this.lastProcessTime!=null){
			return DateTimeUtils.convertDateToStringByFormat(this.lastProcessTime);
		}
		return "";
	}

    @Column(name = "EQUIPMENT_ID")
    public Long getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Long equipmentId) {
        this.equipmentId = equipmentId;
    }

    @Column(name = "PROPERTY_NAME")
    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }
    
    @Column(name = "ALARM_COUNT")
	public Long getAlarmCount() {
		return alarmCount;
	}

	public void setAlarmCount(Long alarmCount) {
		this.alarmCount = alarmCount;
	}
	
	@Column(name = "IS_MASK")
	public String getIsMask() {
		return isMask;
	}

	public void setIsMask(String isMask) {
		this.isMask = isMask;
	}
	@Column(name = "ORGANIZE_NAME")
	public String getOrganizeName() {
		return organizeName;
	}
	public void setOrganizeName(String organizeName) {
		this.organizeName = organizeName;
	}
	@Column(name = "ORG_ID")
	public Integer getOrgId() {
		return orgId;
	}
	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}
	@Column(name = "PRODUCER")
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	@Column(name = "MODULE_NAME")
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	@Column(name = "NET_ADDRESS")
	public String getNetAddress() {
		return netAddress;
	}
	public void setNetAddress(String netAddress) {
		this.netAddress = netAddress;
	}
	@Column(name = "LINK_MAN")
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	@Column(name = "LINK_PHONE_NUMBER")
	public String getLinkPhoneNumber() {
		return linkPhoneNumber;
	}
	public void setLinkPhoneNumber(String linkPhoneNumber) {
		this.linkPhoneNumber = linkPhoneNumber;
	}
	@Column(name = "WARRANTY_MAN")
	public String getWarrantyMan() {
		return warrantyMan;
	}
	public void setWarrantyMan(String warrantyMan) {
		this.warrantyMan = warrantyMan;
	}
	@Column(name = "WARRANTY_PHONE_NUMBER")
	public String getWarrantyPhoneNumber() {
		return warrantyPhoneNumber;
	}
	public void setWarrantyPhoneNumber(String warrantyPhoneNumber) {
		this.warrantyPhoneNumber = warrantyPhoneNumber;
	}
	
}
