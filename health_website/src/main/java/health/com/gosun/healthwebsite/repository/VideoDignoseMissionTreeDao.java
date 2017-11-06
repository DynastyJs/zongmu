package com.gosun.healthwebsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.VideoDignoseMissionTree;

public interface VideoDignoseMissionTreeDao extends PagingAndSortingRepository<VideoDignoseMissionTree, Long>,
JpaSpecificationExecutor<VideoDignoseMissionTree>{
	@Query(" from VideoDignoseMissionTree v WHERE v.missionId is null or v.missionId=?1")
	public List<VideoDignoseMissionTree> getVideoTreeList(String templateId);
}
