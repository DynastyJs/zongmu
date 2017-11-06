/**
 * @Title: ServerInfoDAO.java 	
 * @Package com.gosun.sas.repository 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 下午1:34:08 	
 * @version V1.0   
 */
package com.gosun.sas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.sas.entity.ServerInfo;

/**
 * @ClassName: ServerInfoDAO 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 下午1:34:08
 */
public interface ServerInfoDAO extends PagingAndSortingRepository<ServerInfo, Long>,JpaSpecificationExecutor<ServerInfo> {

	@Modifying
	@Query("from ServerInfo serverInfo where serverInfo.serverType=?1")
	List<ServerInfo> getServerInfoByType(Integer type);

}
