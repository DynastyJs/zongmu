package com.gosun.healthwebsite.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "VIDEO_DIGNOSE_MISSION_CH", schema = "HEALTH")
public class VideoDignoseMissionCh implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2905851801998383825L;
	
    @Id
    @GenericGenerator(name = "SEQ_VIDO_DIGNOSE_MISSION_CH", strategy = "native",   
             parameters = { @Parameter(name = "sequence", value = "SEQ_VIDO_DIGNOSE_MISSION_CH") })
    @GeneratedValue(generator = "SEQ_VIDO_DIGNOSE_MISSION_CH")
    @Column(name = "ID")
	private Long id;
    @Column(name = "EQUIPMENT_ID")
    private Long equipmentId;
    @Column(name = "DVS")
    private String dvs;
    @Column(name = "CHANNEL")
    private String channel;
    @Column(name = "MISSIONID")
    private String missionId;
	public VideoDignoseMissionCh() {
		super();
	}
	
	public VideoDignoseMissionCh(Long id, Long equipmentId, String dvs,
			String channel, String missionId) {
		super();
		this.id = id;
		this.equipmentId = equipmentId;
		this.dvs = dvs;
		this.channel = channel;
		this.missionId = missionId;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDvs() {
		return dvs;
	}
	public void setDvs(String dvs) {
		this.dvs = dvs;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getMissionId() {
		return missionId;
	}
	public void setMissionId(String missionId) {
		this.missionId = missionId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(Long equipmentId) {
		this.equipmentId = equipmentId;
	}
    
}
