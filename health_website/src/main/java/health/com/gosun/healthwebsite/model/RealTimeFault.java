package com.gosun.healthwebsite.model;

import java.util.List;

public class RealTimeFault {
	private String result;
	private String message;
	private List<RealTimeFalutData> data;
	public RealTimeFault() {
		super();
	}
	public RealTimeFault(String result, String message,
			List<RealTimeFalutData> data) {
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
	public List<RealTimeFalutData> getData() {
		return data;
	}
	public void setData(List<RealTimeFalutData> data) {
		this.data = data;
	}
	
}
