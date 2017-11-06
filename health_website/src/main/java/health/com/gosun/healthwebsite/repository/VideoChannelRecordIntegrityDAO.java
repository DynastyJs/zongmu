/**
 * @Title: VideoChannelRecordIntegrityDAO.java 	
 * @Package com.gosun.healthwebsite.repository 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-8-9 下午4:46:23 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.repository;


import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.VideoChannelRecordIntegrity;

/**
 * @ClassName: VideoChannelRecordIntegrityDAO 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-8-9 下午4:46:23
 */
public interface VideoChannelRecordIntegrityDAO extends PagingAndSortingRepository<VideoChannelRecordIntegrity, Long>,
JpaSpecificationExecutor<VideoChannelRecordIntegrity> {
	
	
}
