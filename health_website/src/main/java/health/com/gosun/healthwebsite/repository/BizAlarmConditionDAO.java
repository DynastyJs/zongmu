package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.BizAlarmCondition;


public interface BizAlarmConditionDAO extends PagingAndSortingRepository<BizAlarmCondition, Long>,
JpaSpecificationExecutor<BizAlarmCondition> {
	@Modifying
	@Query("update BizAlarmCondition t set t.expression=?1 where t.propertyName=?2 and t.missionId=?3")
	public void updateVideoDiagnoseCondition(String expression,String pName,String missionId);
	
	@Modifying
	@Query("delete from BizAlarmCondition t where t.missionId=?1")
	public void deleteVideoDiagnoseCondition(String missionId);
}
