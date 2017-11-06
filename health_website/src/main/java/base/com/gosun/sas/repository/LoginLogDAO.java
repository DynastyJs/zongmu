package com.gosun.sas.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.gosun.example.entity.Task;
import com.gosun.sas.entity.LoginLog;


/**
 * 
 * @author Abe
 *
 */
@Repository
public interface LoginLogDAO  extends PagingAndSortingRepository<LoginLog, Long>,
JpaSpecificationExecutor<LoginLog>{
	
}
