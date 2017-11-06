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
public class EquipmentTypeDaoImpl {
	@PersistenceContext
	EntityManager em;
	
	public List getAll(){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from HEALTH.SYS_EQUIPMENT_TYPE ");
		Query q = em.createNativeQuery(sql.toString());
        List<?> list = q.getResultList();
        return list;
	}
	
	public List getCheckedType()
	{
		String sql = "select t2.* from health.biz_snmp_parameter t1, health.sys_equipment_type t2 where t1.equipment_type_id = t2.equipment_type_id";
		Query q = em.createNativeQuery(sql);
        List<?> list = q.getResultList();
        return list;
	}
	
	public List getTypeByGroupId(String groupIdStr){
		String sql = "select t.* from HEALTH.SYS_EQUIPMENT_TYPE t where t.GROUPID = " + groupIdStr;
		Query q = em.createNativeQuery(sql);
        List<?> list = q.getResultList();
        return list;
	}
}
