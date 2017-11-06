package com.gosun.sas.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.gosun.sas.entity.OperateLog;



@Repository
public interface OperateLogDAO  extends PagingAndSortingRepository<OperateLog, Long>,
JpaSpecificationExecutor<OperateLog>{
	
}
