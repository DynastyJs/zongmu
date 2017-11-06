/**
 * @Title: PlatformDAO.java 	
 * @Package com.gosun.sas.repository 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 下午1:34:08 	
 * @version V1.0   
 */
package com.gosun.sas.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.sas.entity.Platform;

/**
 * @ClassName: PlatformDAO 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 下午1:34:08
 */
public interface PlatformDAO extends PagingAndSortingRepository<Platform, Long>,JpaSpecificationExecutor<Platform> {

}
