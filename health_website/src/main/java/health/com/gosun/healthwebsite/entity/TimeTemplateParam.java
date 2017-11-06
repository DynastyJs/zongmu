package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;


/**
 * 时间模板参数实体
 * 
 * @author abe
 */
@Entity
@Table(name = "TB_V2_TIMETEMPLATEPARAM",schema = "HEALTH")
public class TimeTemplateParam implements Serializable {

    
    /**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 2618935718838151926L;
	public static final Short weekType = 1;//按星期的时间模板
    public static final Short onceType = 2;//按一次性的时间段
    public static final Short monthType = 3;//按月
    public static final Short dayType = 4;//按日
    
    private Long id;
    private TimeTemplate timeTemplate;
    private Short type;
    private String name;
    private Short weekDate;
    private Date startDate;
    private Date endDate;
    
    /**时间段列表*/
    private List<TimeTemplateParamSpan> listTimeTemplateParamSpan = new ArrayList<TimeTemplateParamSpan>();
    
    @Id
    @Column(name = "TTPID")
    @GenericGenerator(name = "timeTemplateParamlSeq", strategy = "native",   
             parameters = { @Parameter(name = "sequence", value = "SEQ_TIME_TEMPLATE_PARAM_ID") })
    @GeneratedValue(generator = "timeTemplateParamlSeq")
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TIMETEMPLATEID")
    public TimeTemplate getTimeTemplate() {
        return timeTemplate;
    }
    public void setTimeTemplate(TimeTemplate timeTemplate) {
        this.timeTemplate = timeTemplate;
    }
    @Column(name = "TYPE")
    public Short getType() {
        return type;
    }
    public void setType(Short type) {
        this.type = type;
    }
    @Column(name = "NAME")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @Column(name = "WEEKDATE")
    public Short getWeekDate() {
        return weekDate;
    }
    public void setWeekDate(Short weekDate) {
        this.weekDate = weekDate;
    }
    @Column(name = "STARTDATE")
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    @Column(name = "STOPDATE")
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
    
//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "TTPID")
    @Transient
    public List<TimeTemplateParamSpan> getListTimeTemplateParamSpan() {
        return listTimeTemplateParamSpan;
    }
    public void setListTimeTemplateParamSpan(
            List<TimeTemplateParamSpan> listTimeTemplateParamSpan) {
        this.listTimeTemplateParamSpan = listTimeTemplateParamSpan;
    }
    
}
