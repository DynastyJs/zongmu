/** 
*
*/
package com.gosun.healthwebsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.MultiLoopReName;

/** 
 * @ClassName: MultiLoopReNameDAO 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月5日 下午5:06:07  
 */
public interface MultiLoopReNameDAO extends PagingAndSortingRepository<MultiLoopReName, Long>,
JpaSpecificationExecutor<MultiLoopReName> {

	@Query(value="select * from MULTILOOP_RENAME m where m.EQUIPMENT_ID = ?1",nativeQuery=true)
	public List<MultiLoopReName> findByEquipmentId(Long equipmentId);
	
	@Modifying
	@Query(value="update MULTILOOP_RENAME m set m.NAME = ?1 where m.EQUIPMENT_ID = ?2 and m.ORDER_NO = ?3",nativeQuery=true)
	public int updateByEquipmentIdAndOrderNo(String name,Long equipmentId,Long orderNo);
}
