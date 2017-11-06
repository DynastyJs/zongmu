package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gosun.core.utils.date.DateTimeUtils;

/**
 * Created by whoszus on 2016/7/18.
 *
 * @email whoszus@yahoo.com
 */
@Entity
@Table(name = "VIEW_UI_ALARMEVENT", schema = "HEALTH", catalog = "")
public class UIAlarmevent implements Serializable{
    /**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = -7988415468718798430L;
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
    private Long alarmCount;
    private String isMask;
    private String organizeName;

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
	
	
    
	
    
}
