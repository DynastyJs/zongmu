package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.TimeTemplateParam;
import com.gosun.healthwebsite.entity.TimeTemplateParamSpan;


public interface TimeSpanParamDAO extends PagingAndSortingRepository<TimeTemplateParamSpan, Long>,
JpaSpecificationExecutor<TimeTemplateParamSpan> {
	
	@Query("from TimeTemplateParamSpan  where  timeTemplateParam.id =?1 order by timeTemplateParam.weekDate asc,startDate asc")
	List<TimeTemplateParamSpan> getListByTempParamId(Long templateParamId);
	
	@Query("from TimeTemplateParamSpan  where  timeTemplateParam.timeTemplate.id =?1 order by timeTemplateParam.weekDate asc,startDate asc")
	List<TimeTemplateParamSpan> getListByTempId(Long templateParamId);
}
