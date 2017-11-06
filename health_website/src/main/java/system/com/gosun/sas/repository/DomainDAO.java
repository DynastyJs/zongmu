package com.gosun.sas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.sas.entity.Domain;


public interface DomainDAO extends PagingAndSortingRepository<Domain, Long>,
JpaSpecificationExecutor<Domain>{
	
	@Modifying
	@Query("from Domain domain where domain.parentId=?1")
	List<Domain> getSubDomainList(Long domainId);
	
}
