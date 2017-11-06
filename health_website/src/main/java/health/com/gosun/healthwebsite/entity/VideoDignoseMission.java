package com.gosun.healthwebsite.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "VIDEO_DIGNOSE_MISSION", schema = "HEALTH")
public class VideoDignoseMission implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7000785789483703001L;
	
	@Id
	@Column(name = "MISSION_ID")
	private String missionId;
	@Column(name = "MISSION_NAME")
	private String missionName;
	@Column(name = "BEGIN_TIME")
	private String beginTime;
	@Column(name = "END_TIME")
	private String endTime;
	@Column(name = "ISRUN")
	private Integer isRun;
	@Column(name = "ISDELETE")
	private Integer isDelete;
	@Column(name = "ISPROCESS")
	private Integer isProcess;
	@Column(name = "CYCLE")
	private String cycle;
	@Column(name = "NOSIGNAL")
	private String nosignal;
	@Column(name = "FREEZE")
	private String freeze;
	@Column(name = "COLOR")
	private String color;
	@Column(name = "SNOW")
	private String snow;
	@Column(name = "COVERED")
	private String covered;
	@Column(name = "LUMINANCE")
	private String luminance;
	@Column(name = "MOVE")
	private String move;
	@Column(name = "ROLL")
	private String roll;
	@Column(name = "FUZZY")
	private String fuzzy;
	@Column(name = "CONTRAST")
	private String contrast;
	@Column(name = "SHAKE")
	private String shake;
	public VideoDignoseMission() {
		super();
	}
	public VideoDignoseMission(String missionId, String missionName,
			String beginTime, String endTime, Integer isRun, Integer isDelete,
			Integer isProcess, String cycle, String nosignal, String freeze,
			String color, String snow, String covered, String luminance,
			String move, String roll, String fuzzy, String contrast,
			String shake) {
		super();
		this.missionId = missionId;
		this.missionName = missionName;
		this.beginTime = beginTime;
		this.endTime = endTime;
		this.isRun = isRun;
		this.isDelete = isDelete;
		this.isProcess = isProcess;
		this.cycle = cycle;
		this.nosignal = nosignal;
		this.freeze = freeze;
		this.color = color;
		this.snow = snow;
		this.covered = covered;
		this.luminance = luminance;
		this.move = move;
		this.roll = roll;
		this.fuzzy = fuzzy;
		this.contrast = contrast;
		this.shake = shake;
	}
	public String getMissionId() {
		return missionId;
	}
	public void setMissionId(String missionId) {
		this.missionId = missionId;
	}
	public String getMissionName() {
		return missionName;
	}
	public void setMissionName(String missionName) {
		this.missionName = missionName;
	}
	public String getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public Integer getIsRun() {
		return isRun;
	}
	public void setIsRun(Integer isRun) {
		this.isRun = isRun;
	}
	public Integer getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	public Integer getIsProcess() {
		return isProcess;
	}
	public void setIsProcess(Integer isProcess) {
		this.isProcess = isProcess;
	}
	public String getCycle() {
		return cycle;
	}
	public void setCycle(String cycle) {
		this.cycle = cycle;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getNosignal() {
		return nosignal;
	}
	public void setNosignal(String nosignal) {
		this.nosignal = nosignal;
	}
	public String getFreeze() {
		return freeze;
	}
	public void setFreeze(String freeze) {
		this.freeze = freeze;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getSnow() {
		return snow;
	}
	public void setSnow(String snow) {
		this.snow = snow;
	}
	public String getCovered() {
		return covered;
	}
	public void setCovered(String covered) {
		this.covered = covered;
	}
	public String getLuminance() {
		return luminance;
	}
	public void setLuminance(String luminance) {
		this.luminance = luminance;
	}
	public String getMove() {
		return move;
	}
	public void setMove(String move) {
		this.move = move;
	}
	public String getRoll() {
		return roll;
	}
	public void setRoll(String roll) {
		this.roll = roll;
	}
	public String getFuzzy() {
		return fuzzy;
	}
	public void setFuzzy(String fuzzy) {
		this.fuzzy = fuzzy;
	}
	public String getContrast() {
		return contrast;
	}
	public void setContrast(String contrast) {
		this.contrast = contrast;
	}
	public String getShake() {
		return shake;
	}
	public void setShake(String shake) {
		this.shake = shake;
	}
	@Override
	public String toString() {
		return "VideoDignoseMission [missionId=" + missionId + ", missionName="
				+ missionName + ", beginTime=" + beginTime + ", endTime="
				+ endTime + ", isRun=" + isRun + ", isDelete=" + isDelete
				+ ", isProcess=" + isProcess + ", cycle=" + cycle
				+ ", nosignal=" + nosignal + ", freeze=" + freeze + ", color="
				+ color + ", snow=" + snow + ", covered=" + covered
				+ ", luminance=" + luminance + ", move=" + move + ", roll="
				+ roll + ", fuzzy=" + fuzzy + ", contrast=" + contrast
				+ ", shake=" + shake + "]";
	}
	
}
