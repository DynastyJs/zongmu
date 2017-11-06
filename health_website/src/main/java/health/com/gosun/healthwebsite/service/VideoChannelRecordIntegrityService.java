/**
 * @Title: VideoChannelRecordIntegrityService.java 	
 * @Package com.gosun.healthwebsite.service 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-8-9 下午4:49:14 	
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
import com.gosun.healthwebsite.entity.VideoChannelRecordIntegrity;
import com.gosun.healthwebsite.repository.VideoChannelRecordIntegrityDAO;
import com.gosun.healthwebsite.repository.VideoChannelRecordIntegrityDAOImpl;

/**
 * @ClassName: VideoChannelRecordIntegrityService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-8-9 下午4:49:14
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class VideoChannelRecordIntegrityService {
	@Autowired
	private VideoChannelRecordIntegrityDAO recordIntegrityDao;
	@Autowired
	private VideoChannelRecordIntegrityDAOImpl recordIntegrityDaoImpl;
	public void saveVideoChannelRecordIntegrity(VideoChannelRecordIntegrity recordIntegrity){
		this.recordIntegrityDao.save(recordIntegrity);
	}
	
	public List<Object[]> getRecordDateAndIntegrity(String startTime,String endTime,String dvsCode,String chnnCode) {
		return recordIntegrityDaoImpl.getRecordDateAndIntegrity(startTime, endTime, dvsCode, chnnCode);
	}
	
	public VideoChannelRecordIntegrity getVideoChannelRecordIntegrity(Long id) {
       return recordIntegrityDao.findOne(id);
    }
	
	public void deleteVideoChannelRecordIntegrity(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				recordIntegrityDao.delete(Long.parseLong(idstr));
			}
		}else{
			recordIntegrityDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<VideoChannelRecordIntegrity> getVideoChannelRecordIntegrity(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<VideoChannelRecordIntegrity> spec = buildSpecification(searchParams);
	       
		return recordIntegrityDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.ASC, "recordType");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<VideoChannelRecordIntegrity> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<VideoChannelRecordIntegrity> spec = DynamicSpecifications.bySearchFilter(filters.values(), VideoChannelRecordIntegrity.class);
		return spec;
	}
	
}
