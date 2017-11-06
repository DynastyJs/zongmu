package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.UIDevAuthInfo;


public interface UIDevAuthInfoDAO extends PagingAndSortingRepository<UIDevAuthInfo, Long>,
JpaSpecificationExecutor<UIDevAuthInfo> {
	
}
