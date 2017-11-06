package com.gosun.healthwebsite.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;


/**
 * 时间模板参数时间段实体
 * 
 * @author abe
 */
@Entity
@Table(name = "TB_V2_TIMESPANPARAM",schema = "HEALTH")
public class TimeTemplateParamSpan implements Serializable {

    
    /**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 6566198916366874304L;
	private Long id;
    private TimeTemplateParam timeTemplateParam;
    private Date startDate;
    private Date endDate;
    
    @Id
    @GenericGenerator(name = "timeTemplateParamSpanlSeq", strategy = "native",   
             parameters = { @Parameter(name = "sequence", value = "SEQ_TIME_TEMPLATE_PARAM_SPAN") })
    @GeneratedValue(generator = "timeTemplateParamSpanlSeq")
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TTPID")
    public TimeTemplateParam getTimeTemplateParam() {
        return timeTemplateParam;
    }
    public void setTimeTemplateParam(TimeTemplateParam timeTemplateParam) {
        this.timeTemplateParam = timeTemplateParam;
    }
    @Column(name = "TIMESPANBEGIN")
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    @Column(name = "TIMESPANEND")
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
    
    
    
    
}
