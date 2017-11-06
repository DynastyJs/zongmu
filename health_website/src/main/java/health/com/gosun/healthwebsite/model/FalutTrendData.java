package com.gosun.healthwebsite.model;

public class FalutTrendData {
	public Integer month;
	public Integer count;
	public FalutTrendData() {
		super();
	}
	public FalutTrendData(Integer month, Integer count) {
		super();
		this.month = month;
		this.count = count;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
}
