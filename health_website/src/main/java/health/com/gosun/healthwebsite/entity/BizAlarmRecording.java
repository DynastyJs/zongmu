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
@Table(name = "BIZ_ALARM_RECORDING", schema = "HEALTH")
public class BizAlarmRecording implements java.io.Serializable {
	

	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 8930457677936671878L;
	private Long alarmRecordingId;
	private String alarmResult;
	private Long recordDuration;

	@Id
	@SequenceGenerator(name="SEQ_BIZ_ALARM_RECORDING", sequenceName="SEQ_BIZ_ALARM_RECORDING")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_BIZ_ALARM_RECORDING")
	@Column(name = "ALARM_RECORDING_ID")
	public Long getAlarmRecordingId() {
		return alarmRecordingId;
	}

	public void setAlarmRecordingId(Long alarmRecordingId) {
		this.alarmRecordingId = alarmRecordingId;
	}
	
	@Column(name = "ALARM_RESULT")
	public String getAlarmResult() {
		return alarmResult;
	}

	public void setAlarmResult(String alarmResult) {
		this.alarmResult = alarmResult;
	}
	
	@Column(name = "RECORD_DURATION")
	public Long getRecordDuration() {
		return recordDuration;
	}

	public void setRecordDuration(Long recordDuration) {
		this.recordDuration = recordDuration;
	}

    

}
