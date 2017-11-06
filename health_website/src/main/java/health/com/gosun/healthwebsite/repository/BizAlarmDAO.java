package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.BizAlarm;

import java.util.List;


public interface BizAlarmDAO extends PagingAndSortingRepository<BizAlarm, Long>,
JpaSpecificationExecutor<BizAlarm> {
    @Query("from BizAlarm where equipmentId =?1 and propertyName=?2 and isFinish<>'1' ")
    public List<BizAlarm> getAlarmByEidAndPName(Long equipmentId,String propertyName);
    
    @Query("from BizAlarm where equipmentId =?1 and isFinish<>'1' and alarmType=?2 ")
    public List<BizAlarm> getAlarmByEid(Long equipmentId,String alarmType);
   
	@Query(value = "select s.org_id,count(b.alarm_id) from Biz_Alarm b left join sys_equipment s on s.equipment_id = b.equipment_id where b.is_finished=0 group by s.org_id ",nativeQuery=true)
	public List<Object> checkAlarmExist();
}
