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
 * BizAlarm generated by hbm2java
 */
@Entity
@Table(name = "BIZ_ALARM", schema = "HEALTH")
public class BizAlarm implements java.io.Serializable {
	
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 3389590497901100490L;
	private Long alarmId;
	private Long equipmentId;
	private String propertyName;
	private String beginTime;
	private String endTime;
	private String alarmLevel;
	private String alarmDesc;
	private Long alarmCount;
	private String  alarmType;
	private Character isFinish;


	@Id
	@SequenceGenerator(name="SEQ_BIZ_ALARM", sequenceName="SEQ_BIZ_ALARM")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BIZ_ALARM")
	@Column(name = "ALARM_ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Long getAlarmId() {
		return this.alarmId;
	}

	public void setAlarmId(Long alarmId) {
		this.alarmId = alarmId;
	}

	@Column(name = "EQUIPMENT_ID", nullable = false, precision = 10, scale = 0)
	public Long getEquipmentId() {
		return this.equipmentId;
	}

	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}

	@Column(name = "PROPERTY_NAME", nullable = false, length = 120)
	public String getPropertyName() {
		return this.propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	
	@Column(name = "BEGIN_TIME", nullable = false, length = 7)
	public String getBeginTime() {
		return this.beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	@Column(name = "END_TIME", nullable = false, length = 7)
	public String getEndTime() {
		return this.endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	@Column(name = "ALARM_LEVEL", nullable = false, length = 120)
	public String getAlarmLevel() {
		return this.alarmLevel;
	}

	public void setAlarmLevel(String alarmLevel) {
		this.alarmLevel = alarmLevel;
	}

	@Column(name = "ALARM_DESC", length = 120)
	public String getAlarmDesc() {
		return this.alarmDesc;
	}

	public void setAlarmDesc(String alarmDesc) {
		this.alarmDesc = alarmDesc;
	}

	@Column(name = "ALARM_COUNT", nullable = false, precision = 10, scale = 0)
	public Long getAlarmCount() {
		return this.alarmCount;
	}

	public void setAlarmCount(Long alarmCount) {
		this.alarmCount = alarmCount;
	}
	
	@Column(name = "ALARM_TYPE")
	public String getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(String alarmType) {
		this.alarmType = alarmType;
	}
	
	@Column(name = "IS_FINISHED")
	public Character getIsFinish() {
		return isFinish;
	}

	public void setIsFinish(Character isFinish) {
		this.isFinish = isFinish;
	}
		

}