package com.gosun.healthwebsite.model;

import java.util.List;

public class UntreatedAlarm {
	private String result;
	private String message;
	private List<UntreatedAlarmData> data;
	public UntreatedAlarm() {
		super();
	}
	public UntreatedAlarm(String result, String message,
			List<UntreatedAlarmData> data) {
		super();
		this.result = result;
		this.message = message;
		this.data = data;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<UntreatedAlarmData> getData() {
		return data;
	}
	public void setData(List<UntreatedAlarmData> data) {
		this.data = data;
	}
	
}
