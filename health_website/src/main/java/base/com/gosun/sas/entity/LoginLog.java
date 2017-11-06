package com.gosun.sas.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.format.annotation.DateTimeFormat;

import com.gosun.sas.dto.Constants;

/**
 * 用户登录记录实体
 * 
 * 使用Hibernate annotation定义二级缓存.
 * 
 * @author abe
 */
//JPA标识
@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "TB_JOU_LOGIN")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LoginLog  implements Serializable{
	
    private static final long serialVersionUID = -7119101818083854322L;
    
    public static final int RESULT_SUCCESS = 0;

    private Long id;
    private String logTime;
    private String userName;
    private String ip;
    private String content;
    private int sourceType = Constants.logSourceType;
    private Short result = (short) RESULT_SUCCESS;
    
    private String errorReason;
    
    @Id
    @GenericGenerator(name = "loginLogSeq", strategy = "native",   
             parameters = { @Parameter(name = "sequence", value = "SEQ_SA_LOGINJOU_ID") })
    @GeneratedValue(generator = "loginLogSeq")
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Column(name = "HP_TM")
    public String getLogTime() {
        return logTime;
    }
    public void setLogTime(String logTime) {
        this.logTime = logTime;
    }
    
    @Column(name = "OPER_ID")
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    @Column(name = "SOURCE_TYPE")
    public int getSourceType() {
        return sourceType;
    }
    public void setSourceType(int sourceType) {
        this.sourceType = sourceType;
    }
    
    @Column(name = "USER_HOSTNAME")
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Short getResult() {
        return result;
    }
    public void setResult(Short result) {
        this.result = result;
    }
    @Column(name = "ERROR")
    public String getErrorReason() {
        return errorReason;
    }
    public void setErrorReason(String errorReason) {
        this.errorReason = errorReason;
    }
   
}