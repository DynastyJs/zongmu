package com.gosun.healthwebsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.UIVideoTree;

public interface UIVideoTreeDAO extends PagingAndSortingRepository<UIVideoTree, Long>,
JpaSpecificationExecutor<UIVideoTree>{

	@Query(" from UIVideoTree v WHERE v.templateId is null or v.templateId=?1")
	public List<UIVideoTree> getVideoTreeList(Long templateId);
}
