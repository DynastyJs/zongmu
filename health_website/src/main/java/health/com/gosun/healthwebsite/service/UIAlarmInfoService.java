/**
 * @Title: RingStatusService.java 	
 * @Package com.gosun.healthservice.service 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-5-18 下午1:37:44 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.service;

import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.healthwebsite.repository.UIAlarmInfoDAOImpl1;

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
public class UIAlarmInfoService {
	@Autowired
	private UIAlarmInfoDAOImpl1 alarmDAOImpl;
	
//	public void saveRingStatus(UIAlarmInfo uiAlarm){
//		this.uiAlarmDao.save(uiAlarm);
//	}
//	
//	public UIAlarmInfo getRingStatus(Long id) {
//       return uiAlarmDao.findOne(id);
//    }

	
	public JSONObject getAlarmLogByProcedure(Map<String, Object> searchParams, int pageNumber, int pageSize){
		return alarmDAOImpl.getAlarmLogByProcedure(searchParams, pageNumber, pageSize);
	}
	
//	public Page<UIAlarmInfo> getRingStatus(Map<String, Object> searchParams, int pageNumber, int pageSize,
//	           String sortType) {
//		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
//		Specification<UIAlarmInfo> spec = buildSpecification(searchParams);
//	       
//		return uiAlarmDao.findAll(spec, pageRequest);
//	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			//sort = new Sort(Direction.DESC, "beginTime");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
//	private Specification<UIAlarmInfo> buildSpecification(Map<String, Object> searchParams) {
//		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
//		Specification<UIAlarmInfo> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIAlarmInfo.class);
//		return spec;
//	}
	
	
}
