package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Where;


/**
 * 时间模板实体
 * 
 * @author abe
 */
@Entity
@Table(name = "TB_V2_TIMETEMPLATE",schema = "HEALTH")
public class TimeTemplate implements Serializable {

    
    /**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 3018404376947432483L;
	private Long id;
    private String name;
    private String beginDate;
    private String endDate;
    private String saveDays;
    private Long isPublic;
    private String plans;//前台传过来的json字符串
    private Integer isAlarmRule;
    
    private List<TimeTemplateParam> timeTemplateParamList = new ArrayList<TimeTemplateParam>();
    
    @Id
    @Column(name = "TIMETEMPLATEID")
    @GenericGenerator(name = "timeTemplatelSeq", strategy = "native",   
             parameters = { @Parameter(name = "sequence", value = "SEQ_TIME_TEMPLATE_ID") })
    @GeneratedValue(generator = "timeTemplatelSeq")
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Column(name = "NAME")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "TIMETEMPLATEID",referencedColumnName="TIMETEMPLATEID")
    @Transient
    public List<TimeTemplateParam> getTimeTemplateParamList() {
        return timeTemplateParamList;
    }
    public void setTimeTemplateParamList(
            List<TimeTemplateParam> timeTemplateParamList) {
        this.timeTemplateParamList = timeTemplateParamList;
    }
    @Column(name = "ENDDATE")
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    @Column(name = "BEGINDATE")
    public String getBeginDate() {
        return beginDate;
    }
    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate;
    }
    
    @Column(name = "SAVEDAYS")
	public String getSaveDays() {
		return saveDays;
	}
	public void setSaveDays(String saveDays) {
		this.saveDays = saveDays;
	}
	
	@Column(name = "IS_PUBLIC")
	public Long getIsPublic() {
		return isPublic;
	}
	public void setIsPublic(Long isPublic) {
		this.isPublic = isPublic;
	}
	
	@Transient
	public String getPlans() {
		return plans;
	}
	public void setPlans(String plans) {
		this.plans = plans;
	}

    @Column(name="is_alarm_rule")
	public Integer getIsAlarmRule() {
		return isAlarmRule;
	}
	public void setIsAlarmRule(Integer isAlarmRule) {
		this.isAlarmRule = isAlarmRule;
	}
	
}
