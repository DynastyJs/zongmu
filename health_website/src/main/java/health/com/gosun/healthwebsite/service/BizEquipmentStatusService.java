/**
 * @Title: BizEquipmentStatusService.java 	
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
import com.gosun.healthwebsite.entity.BizEquipmentStatus;
import com.gosun.healthwebsite.entity.UISysDevStatus;
import com.gosun.healthwebsite.repository.BizEquipmentStatusDAO;
import com.gosun.healthwebsite.repository.UISysDevStatusDAO;

/**
 * @ClassName: BizEquipmentStatusService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:37:44
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class BizEquipmentStatusService {
	@Autowired
	private BizEquipmentStatusDAO equStatusDao;
	@Autowired
	private UISysDevStatusDAO uiSysDevStatusDao;
	
	public void saveBizEquipmentStatus(BizEquipmentStatus alarmCon){
		this.equStatusDao.save(alarmCon);
	}
	
	public BizEquipmentStatus getBizEquipmentStatus(Long id) {
       return equStatusDao.findOne(id);
    }

	public List<UISysDevStatus> getListByEquId(Long id) {
	       return uiSysDevStatusDao.getListByEquId(id);
	}

	public BizEquipmentStatus getOneByIdAndPropertyName(Long id ,String propertyName){
		return equStatusDao.getOneByIdAndPropertyName(id,propertyName);
	}


	public void deleteBizEquipmentStatus(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				equStatusDao.delete(Long.parseLong(idstr));
			}
		}else{
			equStatusDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<BizEquipmentStatus> getBizEquipmentStatus(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<BizEquipmentStatus> spec = buildSpecification(searchParams);
	       
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
	private Specification<BizEquipmentStatus> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<BizEquipmentStatus> spec = DynamicSpecifications.bySearchFilter(filters.values(), BizEquipmentStatus.class);
		return spec;
	}


	
}
