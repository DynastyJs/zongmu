package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.C3mFsuExtend;

public interface C3mFsuExtendDAO extends PagingAndSortingRepository<C3mFsuExtend, Long>,
JpaSpecificationExecutor<C3mFsuExtend>{

}
