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
 * 操作记录实体
* @ClassName: OperateLog
* @Description: TODO
* @author TYF
* @date 2016年4月12日 下午3:20:13
 */
//JPA标识
@Entity
//表名与类名不相同时重新定义表名.
@Table(name = "TB_JOU_OPERATION")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OperateLog  implements Serializable{
	
   
    
	private static final long serialVersionUID = -5692320382992025274L;

	public static final int RESULT_SUCCESS = 0;

    private Long id;
    private String opTime;
    private String operName;
    private String ip;
    private String content;
    private int sourceType = Constants.logSourceType;
    private Short result = (short) RESULT_SUCCESS;
    private String operaObjName;
    private String operaObjId;
    private String menuName;
    private String menuCode;
    private String funName;
    private String funCode;
    private String errorReason;
    
    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Column(name = "HP_TM")
    public String getOpTime() {
        return opTime;
    }
    public void setOpTime(String logTime) {
        this.opTime = logTime;
    }
    
    @Column(name = "OPER_ID")
    public String getOperName() {
        return operName;
    }
    public void setOperName(String userName) {
        this.operName = userName;
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
    @Column(name="OPERATE_OBJ_NAME")
	public String getOperaObjName() {
		return operaObjName;
	}
	public void setOperaObjName(String operaObjName) {
		this.operaObjName = operaObjName;
	}
	@Column(name="OPERATE_OBJ_ID")
	public String getOperaObjId() {
		return operaObjId;
	}
	public void setOperaObjId(String operaObjId) {
		this.operaObjId = operaObjId;
	}
	@Column(name="MENU_NAME")
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	@Column(name="MENU_CODE")
	public String getMenuCode() {
		return menuCode;
	}
	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}
	@Column(name="FUNC_NAME")
	public String getFunName() {
		return funName;
	}
	public void setFunName(String funName) {
		this.funName = funName;
	}
	@Column(name="FUNC_CODE")
	public String getFunCode() {
		return funCode;
	}
	public void setFunCode(String funCode) {
		this.funCode = funCode;
	}
    
   
}