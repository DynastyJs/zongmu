package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.UIFsuInfo;


public interface UIFsuInfoDAO extends  PagingAndSortingRepository<UIFsuInfo, String>,
JpaSpecificationExecutor<UIFsuInfo>{

	@Query("select f from UIFsuInfo f where f.fsuId=?1")
	public UIFsuInfo findById(String id);
}
