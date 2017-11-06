/**
 * @Title: EquipmentStatusService.java 	
 * @Package com.gosun.healthservice.service 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-5-18 下午1:37:44 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.healthwebsite.entity.UIEquipmentStatus;
import com.gosun.healthwebsite.repository.UIEquipmentStatusDAO;

/**
 * @ClassName: EquipmentStatusService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:37:44
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class UIEquipmentStatusService {
	@Autowired
	private UIEquipmentStatusDAO equStatusDao;
	
	public void saveEquipmentStatus(UIEquipmentStatus equStatus){
		this.equStatusDao.save(equStatus);
	}
	
	public UIEquipmentStatus getEquipmentStatus(Long id) {
       return equStatusDao.findOne(id);
    }
	
	public List<UIEquipmentStatus> getListByEquipmentIdAndPropertyName(Long equipmentId,String equipmentPropertyName){
		return this.equStatusDao.getListByEquipmentIdAndPropertyName(equipmentId, equipmentPropertyName);
	}

	public void deleteEquipmentStatus(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				equStatusDao.delete(Long.parseLong(idstr));
			}
		}else{
			equStatusDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<UIEquipmentStatus> getEquipmentStatus(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<UIEquipmentStatus> spec = buildSpecification(searchParams);
	       
		return equStatusDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "equipmentId");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<UIEquipmentStatus> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<UIEquipmentStatus> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIEquipmentStatus.class);
		return spec;
	}
	
	
}
