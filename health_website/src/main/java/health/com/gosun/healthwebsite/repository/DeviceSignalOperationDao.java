/** 
*
*/
package com.gosun.healthwebsite.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.DeviceSignalOperation;

/** 
 * @ClassName: DeviceSignalOperationDao 
 * @Description: TODO 
 * @author linnan
 * @date 2017年4月26日 上午10:36:53  
 */
public interface DeviceSignalOperationDao extends PagingAndSortingRepository<DeviceSignalOperation, Long>,
JpaSpecificationExecutor<DeviceSignalOperation> {
	
	 /**
	  * 查找一个用户某段时间内的操作
	  * @param userId
	  * @param beginTime
	  * @param endTime
	  * @return
	  */
	 @Query("from DeviceSignalOperation where userId =?1 and operationTime>=?2 and operationTime<=?3 ")
	 public List<DeviceSignalOperation> getOperationByUserIdAndTime(String userId,Date beginTime,Date endTime);
	
}
