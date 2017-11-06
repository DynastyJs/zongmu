package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.gosun.healthwebsite.entity.UISysDevStatus;


public interface UISysDevStatusDAO extends PagingAndSortingRepository<UISysDevStatus, Long>,
JpaSpecificationExecutor<UISysDevStatus> {
	@Modifying
	@Query("from UISysDevStatus  where id.equipmentId =?1 ")
	List<UISysDevStatus> getListByEquId(Long orgId);
	
	@Query(value = "select count(*),t.ORG_ID from VIEW_UI_SYSDEV_STATUS t where t.ALARM_TYPE like '%:type%' and t.ORG_ID in(:orgs) group by t.ORG_ID",nativeQuery=true)
	public List<Object> getRealFaultDate(@Param("type")String type,@Param("orgs")String orgs);
	
	@Query(value = "select count(*),t.ORG_ID from VIEW_UI_SYSDEV_STATUS t where t.ORG_ID in(:orgs) group by t.ORG_ID",nativeQuery=true)
	public List<Object> getRealFaultCount(@Param("orgs") String orgs);

}
