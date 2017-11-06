package com.gosun.healthwebsite.model;

import java.util.List;
import java.util.Map;


/**
 * 设置电气火灾进度提示
 * @author hhc
 *
 */
public class FireParamSetTips {

	private String totalTips;
	//key:equipmentId      value:tips
	private Map<String, String>eachRowTips;
	private String bottomTips;
	
	
	public String getTotalTips() {
		return totalTips;
	}
	public void setTotalTips(String totalTips) {
		this.totalTips = totalTips;
	}

	public Map<String, String> getEachRowTips() {
		return eachRowTips;
	}
	public void setEachRowTips(Map<String, String> eachRowTips) {
		this.eachRowTips = eachRowTips;
	}
	public String getBottomTips() {
		return bottomTips;
	}
	public void setBottomTips(String bottomTips) {
		this.bottomTips = bottomTips;
	}
	
	
	
}
