package com.gosun.healthwebsite.model;

import java.util.List;

public class FaultTrend {
	private String result;
	private String message;
	private List<FalutTrendData> data;
	public FaultTrend() {
		super();
	}
	public FaultTrend(String result, String message, List<FalutTrendData> data) {
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
	public List<FalutTrendData> getData() {
		return data;
	}
	public void setData(List<FalutTrendData> data) {
		this.data = data;
	}
	
}
