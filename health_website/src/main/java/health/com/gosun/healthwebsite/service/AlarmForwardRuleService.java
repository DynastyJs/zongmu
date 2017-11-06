/** 
*
*/
package com.gosun.healthwebsite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.healthwebsite.entity.AlarmForwardRule;
import com.gosun.healthwebsite.repository.AlarmForwardRuleDao;

/** 
 * @ClassName: AlarmForwardRuleService 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月17日 下午3:51:04  
 */
@Component
@Transactional
public class AlarmForwardRuleService {

	@Autowired
	private AlarmForwardRuleDao alarmForwardRuleDao;
	
	public List<AlarmForwardRule> getAllRule(){
		return (List<AlarmForwardRule>) alarmForwardRuleDao.findAll();
	}
	
	public void save(List<AlarmForwardRule> alarmForwardRuleList){
		alarmForwardRuleDao.save(alarmForwardRuleList);
	}
}
