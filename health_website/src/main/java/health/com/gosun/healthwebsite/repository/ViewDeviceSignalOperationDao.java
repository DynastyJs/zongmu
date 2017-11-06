/** 
*
*/
package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.ViewDeviceSignalOperation;

/** 
 * @ClassName: ViewDeviceSignalOperationDao 
 * @Description: TODO 
 * @author linnan
 * @date 2017年4月28日 下午2:38:23  
 */
public interface ViewDeviceSignalOperationDao extends PagingAndSortingRepository<ViewDeviceSignalOperation, Long>,
JpaSpecificationExecutor<ViewDeviceSignalOperation>{

}
