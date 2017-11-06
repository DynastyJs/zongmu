/**
 * @Title: RingStatusService.java 	
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
import com.gosun.healthwebsite.entity.UIRingStatus;
import com.gosun.healthwebsite.repository.UIRingStatusDAO;

/**
 * @ClassName: RingStatusService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:37:44
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class UIRingStatusService {
	@Autowired
	private UIRingStatusDAO ringStatusDao;
	
	public void saveRingStatus(UIRingStatus ringStatus){
		this.ringStatusDao.save(ringStatus);
	}
	
	public UIRingStatus getRingStatus(Long id) {
       return ringStatusDao.findOne(id);
    }
	
	public List<UIRingStatus> getListByFsuIdAndPropertyName(Long fsuid,String equipmentPropertyName){
		return this.ringStatusDao.getListByFsuIdAndPropertyName(fsuid, equipmentPropertyName);
	}


	public void deleteRingStatus(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				ringStatusDao.delete(Long.parseLong(idstr));
			}
		}else{
			ringStatusDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<UIRingStatus> getRingStatus(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<UIRingStatus> spec = buildSpecification(searchParams);
	       
		return ringStatusDao.findAll(spec, pageRequest);
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
	private Specification<UIRingStatus> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<UIRingStatus> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIRingStatus.class);
		return spec;
	}
	
	
}
