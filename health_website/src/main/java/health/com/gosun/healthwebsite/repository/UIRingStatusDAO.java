package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.UIEquipmentStatus;
import com.gosun.healthwebsite.entity.UIRingStatus;


public interface UIRingStatusDAO extends PagingAndSortingRepository<UIRingStatus, Long>,
JpaSpecificationExecutor<UIRingStatus> {
	
	@Modifying
	@Query("from UIRingStatus  where fsuId =?1 and propertyName = ?2 ")
	List<UIRingStatus> getListByFsuIdAndPropertyName(Long fsuid,String equipmentPropertyName);
	
	
	
}
