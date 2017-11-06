package com.gosun.healthwebsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.PscpOrganizePos;
import com.gosun.healthwebsite.entity.SysEquipment;

public interface PscpOrganizePosDao extends PagingAndSortingRepository<PscpOrganizePos, Integer>,
JpaSpecificationExecutor<PscpOrganizePos> {
	@Query(value = "select t from PscpOrganizePos t")
	public List<PscpOrganizePos> findAllTable();
	
}
