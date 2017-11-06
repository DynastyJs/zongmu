package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.C3mFsu;

public interface C3mFsuDAO extends PagingAndSortingRepository<C3mFsu, Long>,
JpaSpecificationExecutor<C3mFsu>{

	@Query("select f from C3mFsu f where f.fsuId=?1")
	public C3mFsu findById(String fsuId);
}
