package com.gosun.healthwebsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.VideoDignoseMission;

public interface VideoDignoseMissionDao extends PagingAndSortingRepository<VideoDignoseMission, String>,
JpaSpecificationExecutor<VideoDignoseMission>{
	
	@Query(value = "select t.* from VIDEO_DIGNOSE_MISSION t where t.ISDELETE=0 limit ?1,?2",nativeQuery=true)
	public List<VideoDignoseMission> getListUnDelete(Integer pagenumber,Integer size);
	
	@Modifying
	@Query(value = "update VideoDignoseMission t set t.isProcess=0,t.isDelete=1 where t.missionId=?1")
	public Integer deleteMission(String missionId);
	
	@Query(value = "select t from VideoDignoseMission t where t.missionName=?1")
	public List<VideoDignoseMission> selectByName(String name);
	
	@Query(value = "select t from VideoDignoseMission t where t.missionName=?1 and t.missionId!=?2")
	public List<VideoDignoseMission> selectByNameAndNotId(String name,String missionId);
	
	@Modifying
	@Query(value = "update VideoDignoseMission t set t.isProcess=0 where t.missionId=?1")
	public Integer updateProcess(String missionId);
	
	@Query(value = "select t from VideoDignoseMission t where t.missionId = ?1")
	public List<VideoDignoseMission> findByMissionId(String missionId);
}
