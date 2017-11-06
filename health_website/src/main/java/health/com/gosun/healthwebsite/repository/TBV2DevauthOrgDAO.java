package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.TbV2DevauthOrg;


public interface TBV2DevauthOrgDAO extends PagingAndSortingRepository<TbV2DevauthOrg, Long>,
JpaSpecificationExecutor<TbV2DevauthOrg> {
	
	@Query("from TbV2DevauthOrg  where  timeTempLateId =?1 ")
	public List<TbV2DevauthOrg> findByTemplateId(Long timeTempLateId);
}
