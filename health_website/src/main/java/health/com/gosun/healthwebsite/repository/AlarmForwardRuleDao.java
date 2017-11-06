/** 
*
*/
package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.AlarmForwardRule;

/** 
 * @ClassName: AlarmForwardRuleDao 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月17日 下午3:49:26  
 */
public interface AlarmForwardRuleDao extends PagingAndSortingRepository<AlarmForwardRule, Long>,
JpaSpecificationExecutor<AlarmForwardRule> {

	
}
