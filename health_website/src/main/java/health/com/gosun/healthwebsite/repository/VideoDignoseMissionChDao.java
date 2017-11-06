package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.VideoDignoseMission;
import com.gosun.healthwebsite.entity.VideoDignoseMissionCh;

public interface VideoDignoseMissionChDao extends PagingAndSortingRepository<VideoDignoseMissionCh, Long>,
JpaSpecificationExecutor<VideoDignoseMissionCh> {
	
	@Modifying
	@Query(value = "delete from VideoDignoseMissionCh t where t.missionId=?1")
	public Integer deleteChById(String missionId);
}
