package com.gosun.healthwebsite.model;

public class UntreatedAlarmData {
	private Integer untreatedAlarm;
	private Integer allAlarm;
	private String level;
	public UntreatedAlarmData() {
		super();
	}
	public UntreatedAlarmData(Integer untreatedAlarm, Integer allAlarm,
			String level) {
		super();
		this.untreatedAlarm = untreatedAlarm;
		this.allAlarm = allAlarm;
		this.level = level;
	}
	public Integer getUntreatedAlarm() {
		return untreatedAlarm;
	}
	public void setUntreatedAlarm(Integer untreatedAlarm) {
		this.untreatedAlarm = untreatedAlarm;
	}
	public Integer getAllAlarm() {
		return allAlarm;
	}
	public void setAllAlarm(Integer allAlarm) {
		this.allAlarm = allAlarm;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	
}
