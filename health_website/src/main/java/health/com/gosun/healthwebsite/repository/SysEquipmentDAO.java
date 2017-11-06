package com.gosun.healthwebsite.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.SysEquipment;

public interface SysEquipmentDAO extends PagingAndSortingRepository<SysEquipment, Long>,
JpaSpecificationExecutor<SysEquipment>{

	@Query(value ="select distinct(e.net_address) from sys_equipment e where e.fsu_id=?1 and e.is_deleted = 0",nativeQuery=true)
	public Set<String> listIpByFsu(String fsuId);
	
	@Modifying
	@Query(value="update SysEquipment s set s.isDelete = 1 where s.equipmentId = ?1")
	public int removeEquipment(Long equipmentId);
}
