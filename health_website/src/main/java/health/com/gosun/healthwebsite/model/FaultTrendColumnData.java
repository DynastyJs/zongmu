package com.gosun.healthwebsite.model;

public class FaultTrendColumnData {
	private String type;
	private Integer count;
	public FaultTrendColumnData() {
		super();
	}
	public FaultTrendColumnData(String type, Integer count) {
		super();
		this.type = type;
		this.count = count;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
}
