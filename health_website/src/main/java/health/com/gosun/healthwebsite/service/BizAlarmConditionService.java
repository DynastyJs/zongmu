/**
 * @Title: BizAlarmConditionService.java 	
 * @Package com.gosun.healthservice.service 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-5-18 下午1:37:44 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.service;

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
import com.gosun.healthwebsite.entity.BizAlarmCondition;
import com.gosun.healthwebsite.repository.BizAlarmConditionDAO;

/**
 * @ClassName: BizAlarmConditionService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:37:44
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class BizAlarmConditionService {
	@Autowired
	private BizAlarmConditionDAO alarmConDao;
	
	public void saveBizAlarmCondition(BizAlarmCondition alarmCon){
		this.alarmConDao.save(alarmCon);
	}
	
	public BizAlarmCondition getBizAlarmCondition(Long id) {
       return alarmConDao.findOne(id);
    }

	public void deleteBizAlarmCondition(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				alarmConDao.delete(Long.parseLong(idstr));
			}
		}else{
			alarmConDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<BizAlarmCondition> getBizAlarmCondition(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<BizAlarmCondition> spec = buildSpecification(searchParams);
	       
		return alarmConDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "conditionId");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<BizAlarmCondition> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<BizAlarmCondition> spec = DynamicSpecifications.bySearchFilter(filters.values(), BizAlarmCondition.class);
		return spec;
	}
	
	
}
