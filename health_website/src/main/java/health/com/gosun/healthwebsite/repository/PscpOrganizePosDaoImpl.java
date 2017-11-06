/**
 * @Title: EquipmentTypeDaoImpl.java 	
 * @Package com.gosun.healthwebsite.repository 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-6-1 下午5:25:28 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

/**
 * @ClassName: EquipmentTypeDaoImpl 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-6-1 下午5:25:28
 */
@Repository
public class PscpOrganizePosDaoImpl {
	@PersistenceContext
	EntityManager em;
	
	public void updateIcon(){
		String sql = " update PSCP_ORGANIZE_POS p set p.icon_key=0 ";
		em.createNativeQuery(sql).executeUpdate();
		String sql1 = " update PSCP_ORGANIZE_POS p set p.icon_key=1 where p.org_id in (select org_id from VIEW_ORG_ALARMCOUNT t where t.ALARM_COUNT>0)";
		em.createNativeQuery(sql1).executeUpdate();
	}
	
	
	
}
