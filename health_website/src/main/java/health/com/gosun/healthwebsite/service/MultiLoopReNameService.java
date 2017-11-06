/** 
*
*/
package com.gosun.healthwebsite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.healthwebsite.entity.MultiLoopReName;
import com.gosun.healthwebsite.entity.MultiLoopReNameId;
import com.gosun.healthwebsite.repository.MultiLoopReNameDAO;

/** 
 * @ClassName: MultiLoopReNameService 
 * @Description: TODO 
 * @author linnan
 * @date 2017年7月5日 下午5:33:03  
 */
@Component
@Transactional
public class MultiLoopReNameService {

	@Autowired
	private MultiLoopReNameDAO multiLoopReNameDAO;
	
	public List<MultiLoopReName> getMultiPathNameByEquipmentId(Long equipmentId){
		return multiLoopReNameDAO.findByEquipmentId(equipmentId);
	}
	
	public void updateByEquipmentIdAndOrderNo(String name,Long equipmentId,Long orderNo){
//		multiLoopReNameDAO.updateByEquipmentIdAndOrderNo(name, equipmentId, orderNo);
		MultiLoopReName multiLoopReName = new MultiLoopReName();
		MultiLoopReNameId multiLoopReNameId = new MultiLoopReNameId(equipmentId,orderNo);
		multiLoopReName.setMultiLoopReNameId(multiLoopReNameId);
		multiLoopReName.setName(name);
		multiLoopReNameDAO.save(multiLoopReName);
	}
	
}
