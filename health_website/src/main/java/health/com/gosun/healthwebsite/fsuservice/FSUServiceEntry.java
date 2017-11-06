package com.gosun.healthwebsite.fsuservice;

import java.util.Set;

public class FSUServiceEntry {

	private String Name;
	private String Code;
	private String FsuId;
	private String FsuCode;
	private String chIP;//设备IP
	private String nMaxPacketLoss;//丢包率阈值
	private String fMaxRoundTripAvg;//平均往返时间阈值
	private String nFrequ;//ping包频率
	private String nTimePeriod;//ping包时间长短
	private String Rsult;//设置成功/失败
	
	private Set<String> chIPList;
	public Set<String> getChIPList() {
		return chIPList;
	}
	public void setChIPList(Set<String> chIPList) {
		this.chIPList = chIPList;
	}
	public FSUServiceEntry()
	{
		this.Name = "";
		this.Code = "";
		this.FsuId = "";
		this.FsuCode = "";
		this.chIP = "";
		this.nMaxPacketLoss = "";
		this.fMaxRoundTripAvg = "";
		this.nFrequ = "";
		this.nTimePeriod = "";
		this.Rsult = "";
	}
	public String getRsult() {
		return Rsult;
	}
	public void setRsult(String rsult) {
		Rsult = rsult;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getCode() {
		return Code;
	}
	public void setCode(String code) {
		Code = code;
	}
	public String getFsuId() {
		return FsuId;
	}
	public void setFsuId(String fsuId) {
		FsuId = fsuId;
	}
	public String getFsuCode() {
		return FsuCode;
	}
	public void setFsuCode(String fsuCode) {
		FsuCode = fsuCode;
	}
	public String getChIP() {
		return chIP;
	}
	public void setChIP(String chIP) {
		this.chIP = chIP;
	}
	public String getnMaxPacketLoss() {
		return nMaxPacketLoss;
	}
	public void setnMaxPacketLoss(String nMaxPacketLoss) {
		this.nMaxPacketLoss = nMaxPacketLoss;
	}
	public String getfMaxRoundTripAvg() {
		return fMaxRoundTripAvg;
	}
	public void setfMaxRoundTripAvg(String fMaxRoundTripAvg) {
		this.fMaxRoundTripAvg = fMaxRoundTripAvg;
	}
	public String getnFrequ() {
		return nFrequ;
	}
	public void setnFrequ(String nFrequ) {
		this.nFrequ = nFrequ;
	}
	public String getnTimePeriod() {
		return nTimePeriod;
	}
	public void setnTimePeriod(String nTimePeriod) {
		this.nTimePeriod = nTimePeriod;
	}
	
	
}
