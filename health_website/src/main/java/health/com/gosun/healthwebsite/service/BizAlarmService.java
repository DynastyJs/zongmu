/**
 * @Title: BizAlarmService.java 	
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
import com.gosun.healthwebsite.entity.BizAlarm;
import com.gosun.healthwebsite.repository.BizAlarmDAO;
import com.gosun.healthwebsite.repository.BizAlarmDAOImpl;

/**
 * @ClassName: BizAlarmService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:37:44
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class BizAlarmService {
	@Autowired
	private BizAlarmDAO alarmDao;
	@Autowired
	private BizAlarmDAOImpl alarmDaoImpl;
	
	public void updateFinish(Long alarmId,Long equId,String propertyName){
		alarmDaoImpl.updateFinish(alarmId,equId,propertyName);
	}
	
	public void saveBizAlarm(BizAlarm alarmExd){
		this.alarmDao.save(alarmExd);
	}
	
	public BizAlarm getBizAlarm(Long id) {
       return alarmDao.findOne(id);
    }

	public void deleteBizAlarm(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				alarmDao.delete(Long.parseLong(idstr));
			}
		}else{
			alarmDao.delete(Long.parseLong(ids));
		}
	}
	public List<BizAlarm> getAlarmByEidAndPName(Long equipmentId,String propertyName){
		return  alarmDao.getAlarmByEidAndPName(equipmentId,propertyName);
	}
	
	public List<BizAlarm> getAlarmByEid(Long equipmentId,String alarmType){
		return  alarmDao.getAlarmByEid(equipmentId,alarmType);
	}
	
	public void deleteFocusAndRepairStatus(Long devId,String alarmType) {
		alarmDaoImpl.deleteFocusAndRepairStatus(devId, alarmType);
	}
	
	public Page<BizAlarm> getBizAlarm(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<BizAlarm> spec = buildSpecification(searchParams);
	       
		return alarmDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "alarmId");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<BizAlarm> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<BizAlarm> spec = DynamicSpecifications.bySearchFilter(filters.values(), BizAlarm.class);
		return spec;
	}
	
	
}
