package com.gosun.healthwebsite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TB_V2_DEVAUTH_CHN", schema = "HEALTH")
public class TbV2DevauthChn implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3205812821505566022L;

	
	@Id
	@SequenceGenerator(name="SEQ_TB_V2_DEVAUTH_CHN", sequenceName="SEQ_TB_V2_DEVAUTH_CHN")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TB_V2_DEVAUTH_CHN")
	@Column(name = "ID")
	private Long id;
	@Column(name = "AUTHID")
	private Long authId;
	@Column(name = "CHNID")
	private Long chnId;
	public TbV2DevauthChn() {
		super();
	}
	public TbV2DevauthChn(Long id, Long authId, Long chnId) {
		super();
		this.id = id;
		this.authId = authId;
		this.chnId = chnId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getAuthId() {
		return authId;
	}
	public void setAuthId(Long authId) {
		this.authId = authId;
	}
	public Long getChnId() {
		return chnId;
	}
	public void setChnId(Long chnId) {
		this.chnId = chnId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
