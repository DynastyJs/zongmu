package com.gosun.healthwebsite.model;

import java.util.List;

public class Organization {
	private String result;
	private String message;
	private List<OrganizationData> data;
	public Organization() {
		super();
	}
	public Organization(String result, String message,
			List<OrganizationData> data) {
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
	public List<OrganizationData> getData() {
		return data;
	}
	public void setData(List<OrganizationData> data) {
		this.data = data;
	}
	
}
