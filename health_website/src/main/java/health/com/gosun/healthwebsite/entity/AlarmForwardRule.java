/** 
*
*/
package com.gosun.healthwebsite.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/** 
 * @ClassName: AlarmForwardRule 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月17日 下午3:36:27  
 */
@Entity
@Table(name = "ALARM_FORWARD_RULE", schema = "HEALTH")
public class AlarmForwardRule implements Serializable{

	private static final long serialVersionUID = 7021223232859019034L;
	private Long id;
	private String alarmLevel;
	private Long forwardTimeTemplate;
	private Integer delayTime;
	private Integer isEnable;
	
	@Id
	@Column(name = "ID")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Column(name="ALARM_LEVEL")
	public String getAlarmLevel() {
		return alarmLevel;
	}
	public void setAlarmLevel(String alarmLevel) {
		this.alarmLevel = alarmLevel;
	}
	@Column(name="FORWARD_TIME_TEMPLATE")
	public Long getForwardTimeTemplate() {
		return forwardTimeTemplate;
	}
	public void setForwardTimeTemplate(Long forwardTimeTemplate) {
		this.forwardTimeTemplate = forwardTimeTemplate;
	}
	@Column(name="DELAY_TIME")
	public Integer getDelayTime() {
		return delayTime;
	}
	public void setDelayTime(Integer delayTime) {
		this.delayTime = delayTime;
	}
	@Column(name="IS_ENABLE")
	public Integer getIsEnable() {
		return isEnable;
	}
	public void setIsEnable(Integer isEnable) {
		this.isEnable = isEnable;
	}

	
}
