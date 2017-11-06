package com.gosun.healthwebsite.model;

import java.util.List;

public class FaultTrendColumn {
	private String result;
	private String message;
	private List<FaultTrendColumnData> data;
	public FaultTrendColumn() {
		super();
	}
	public FaultTrendColumn(String result, String message,
			List<FaultTrendColumnData> data) {
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
	public List<FaultTrendColumnData> getData() {
		return data;
	}
	public void setData(List<FaultTrendColumnData> data) {
		this.data = data;
	}
	
}
