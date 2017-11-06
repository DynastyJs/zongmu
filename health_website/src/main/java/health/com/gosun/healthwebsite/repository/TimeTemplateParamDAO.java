package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.TimeTemplateParam;


public interface TimeTemplateParamDAO extends PagingAndSortingRepository<TimeTemplateParam, Long>,
JpaSpecificationExecutor<TimeTemplateParam> {
	
	@Query("from TimeTemplateParam  where  timeTemplate.id =?1")
	List<TimeTemplateParam> getListByTempId(Long templateId);
}
