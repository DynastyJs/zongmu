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
 * @ClassName: TBV2DevauthChnDaoImpl 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-6-1 下午5:25:28
 */
@Repository
public class TBV2DevauthChnDaoImpl {
	@PersistenceContext
	EntityManager em;
	
	public void updateCamAlarmFinished(){
		StringBuffer sql = new StringBuffer();
		sql.append(" update biz_alarm b  ");
		sql.append(" set b.is_finished = '1' ");
		sql.append(" where b.is_finished = '0' ");
		sql.append(" and b.equipment_id in");
		sql.append(" (select equipment_id ");
		sql.append("  from sys_equipment s ");
		sql.append(" where s.is_deleted = 0 ");
		sql.append("  and s.equipment_type_id = 24) ");
		sql.append(" and b.equipment_id not in");
		sql.append("  (select c.chnid");
		sql.append(" 	from tb_v2_devauth_chn c ");
		sql.append(" 		where c.authid in (select t.Authid ");
		sql.append(" 		from TB_V2_DEVAUTHORIZATION t ");
		sql.append("     where t.timetemplateid in ");
		sql.append("     (select timetemplateid ");
		sql.append("  from TB_V2_TIMETEMPLATE ");
		sql.append(" where is_public = 1))) ");
		try{
			em.createNativeQuery(sql.toString()).executeUpdate();
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
}
