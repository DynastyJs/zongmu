package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final


import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.TbV2DevauthChn;


public interface TBV2DevauthChnDAO extends PagingAndSortingRepository<TbV2DevauthChn, Long>,
JpaSpecificationExecutor<TbV2DevauthChn> {
	
	@Query(" from TbV2DevauthChn  where  authId =?1 ")
	public List<TbV2DevauthChn> findByAuthId(Long authId);
	
	@Modifying
	@Query("delete from TbV2DevauthChn t where t.authId=?1")
	public Integer deleteByAuthId(Long authId);
}
