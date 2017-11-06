package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;


@Repository
public class BizAlarmDAOImpl {
	@PersistenceContext
	EntityManager em;

	public void updateFinish(Long alarmId,Long equipmentId,String propertyName) {
		StringBuffer sql = new StringBuffer();
		sql.append("  update biz_alarm set is_finished='1',end_time=sysdate where alarm_id  = "+alarmId);
		try {
			em.createNativeQuery(sql.toString()).executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//删除报修或者关注状态
		StringBuffer sql1 = new StringBuffer();
		sql1.append("  delete from BIZ_FOCUS_REPAIR s where s.equipment_id="+equipmentId );
		if(propertyName.equals("-1")){
			sql1.append(" and s.equipment_property_name is null ");
		}else{
			sql1.append(" and s.equipment_property_name ='"+propertyName+"' ");
		}
		try {
			em.createNativeQuery(sql1.toString()).executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void updateFinishByEquipmentId(Long equId) {
		StringBuffer sql = new StringBuffer();
		sql.append("  update biz_alarm set is_finished='1',end_time=sysdate where equipment_id  = "+equId +" and property_name='网络状态'");
		try {
			em.createNativeQuery(sql.toString()).executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//删除报修或者关注状态
		StringBuffer sql1 = new StringBuffer();
		sql1.append("  delete from BIZ_FOCUS_REPAIR s where s.equipment_id="+equId );
		sql1.append(" and s.equipment_property_name ='网络状态' ");
		try {
			em.createNativeQuery(sql1.toString()).executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * deleteFocusAndRepairStatus:(删除关注和报修状态). <br/>
	 * TODO(录像异常和视频异常).<br/>
	 * TODO(查询某个dvr下面是否存在报警，如果没有就删除设备报修状态).<br/>
	 *
	 * @author lisa
	 * @param devId 设备DVR的ID
	 * @param alarmType 告警类型
	 */
	public void deleteFocusAndRepairStatus(Long devId,String alarmType) {
		StringBuffer sql = new StringBuffer();
		sql.append("  select count(b.alarm_id) from Biz_Alarm b , sys_equipment s ");
		sql.append(" where b.Is_Finished=0 and b.alarm_type='"+alarmType+"' and s.equipment_id = b.equipment_id ");
		sql.append(" and s.parent_id = ");
		sql.append(" (select code from sys_equipment where equipment_id = "+devId+")");
		try {
			Query q = em.createNativeQuery(sql.toString());
			List<?> list = q.getResultList();
			if(list==null||list.size()==0){
				//删除报修或者关注状态
				StringBuffer sql1 = new StringBuffer();
				sql1.append("  delete from BIZ_FOCUS_REPAIR s where s.equipment_id="+devId );
				sql1.append(" and s.type='1' ");
				try {
					em.createNativeQuery(sql1.toString()).executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
