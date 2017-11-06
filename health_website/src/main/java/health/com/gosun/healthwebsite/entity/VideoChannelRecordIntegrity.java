/**
 * @Title: VideoChannelRecordIntegrity.java 	
 * @Package com.gosun.healthwebsite.entity 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-8-9 下午4:40:45 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.gosun.core.utils.date.DateTimeUtils;

/**
 * @ClassName: VideoChannelRecordIntegrity 
 * @Description: 通道录像完整性日期表 
 * @author Lisa
 * @date 2016-8-9 下午4:40:45
 */
@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "TB_VIDEO_CHNN_RECORD_INFO", schema = "HEALTH")
public class VideoChannelRecordIntegrity implements Serializable{
	
    
	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 2246520475480955559L;
	private Long id;//ID
    private Long channelPrimaryId;//CHANNEL_PRIMARY_ID 通道主键ID
    private Date recordDate;//RECORD_DATE 录像日期
    private int isIntegrity = 0;//IS_INTEGRITY 是否完整 0完整  1.丢失 2.失败
    private int ignore = 0;//IGNORE 忽略此日期完整性0:否 1:是
    private String loseSpan;//NOT_INTEGRITY_SPAN 不完整时段，用json字符串描述:[{"StartTime": "01:00:00","EndTime": "02:00:00"},{"StartTime": "09:00:00","EndTime": "09:20:00"}]
    private Date updateDate;//UPDATE_DATE 检测更新时间
    private String failDecription;//CHECK_FAIL_DESCRI 检测失败描述
    private String recordDateString;
    private String dvsCode;
    private String chnnCode;
    private Integer recordType;
    
    @Id
    @GenericGenerator(name = "channelRecordIntegritySeq", strategy = "native",   
             parameters = { @Parameter(name = "sequence", value = "SEQ_CHNN_RECORD_INTEGRITY_ID") })
    @GeneratedValue(generator = "channelRecordIntegritySeq")
    @Column(name = "id")
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Column(name = "CHANNEL_PRIMARY_ID")
    public Long getChannelPrimaryId() {
        return channelPrimaryId;
    }
    public void setChannelPrimaryId(Long channelPrimaryId) {
        this.channelPrimaryId = channelPrimaryId;
    }
    @Column(name = "RECORD_DATE")
    public Date getRecordDate() {
        return recordDate;
    }
    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }
    @Column(name = "INTEGRITY_STATUS")
    public int getIsIntegrity() {
        return isIntegrity;
    }
    public void setIsIntegrity(int isIntegrity) {
        this.isIntegrity = isIntegrity;
    }
    @Column(name = "IGNORE")
    public int getIgnore() {
        return ignore;
    }
    public void setIgnore(int ignore) {
        this.ignore = ignore;
    }
    @Column(name = "LOSE_SPAN")
    public String getLoseSpan() {
        return loseSpan;
    }
    public void setLoseSpan(String loseSpan) {
        this.loseSpan = loseSpan;
    }
    @Column(name = "UPDATE_DATE")
    public Date getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
    @Column(name = "CHECK_FAIL_DESCRI")
    public String getFailDecription() {
        return failDecription;
    }
    public void setFailDecription(String failDecription) {
        this.failDecription = failDecription;
    }
    
    @Column(name = "DVS_CODE")
    public String getDvsCode() {
		return dvsCode;
	}
	public void setDvsCode(String dvsCode) {
		this.dvsCode = dvsCode;
	}
	@Column(name = "CHNN_CODE")
	public String getChnnCode() {
		return chnnCode;
	}
	public void setChnnCode(String chnnCode) {
		this.chnnCode = chnnCode;
	}
	@Transient
	public String getRecordDateString() {
    	if(this.recordDate!=null){
    		return DateTimeUtils.convertDateToStringByFormat(this.recordDate,"yyyy-MM-dd");
    	}
    	return null;
	}
	
	@Column(name = "RECORD_TYPE")
	public Integer getRecordType() {
		return recordType;
	}
	public void setRecordType(Integer recordType) {
		this.recordType = recordType;
	}
	
	
    
    
}
