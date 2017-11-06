package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.BizMask;
import com.gosun.sas.entity.Domain;


public interface BizMaskDAO extends PagingAndSortingRepository<BizMask, Long>,
JpaSpecificationExecutor<BizMask> {
	
	@Modifying
	@Query("from BizMask  where orgId =?1")
	List<BizMask> getListByOrgId(Long orgId);
	
	@Modifying
	@Query("from BizMask  where equipmentId =?1")
	List<BizMask> getListByEquipmentId(Long equipmentId);
	
	@Modifying
	@Query("from BizMask  where  orgId =?1 and  equipmentId =?2 ")
	List<BizMask> getListByOrgAndEquId(Long orgId,Long equipmentId);
	
	@Modifying
	@Query("from BizMask  where equipmentId =?1 and equipmentPropertyName = ?2 ")
	List<BizMask> getListByEquipmentIdAndPropertyName(Long equipmentId,String equipmentPropertyName);
	
}
