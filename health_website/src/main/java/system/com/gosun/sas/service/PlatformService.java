/**
 * @Title: PlatformService.java 	
 * @Package com.gosun.sas.service 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 下午1:35:49 	
 * @version V1.0   
 */
package com.gosun.sas.service;

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
import com.gosun.sas.entity.Platform;
import com.gosun.sas.repository.PlatformDAO;

/**
 * @ClassName: PlatformService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 下午1:35:49
 */
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class PlatformService {
	@Autowired  
	private PlatformDAO platformDao;
	
	public void savePlatform(Platform platform){
		this.platformDao.save(platform);
	}
	
	public Platform getPlatform(Long id) {
       return platformDao.findOne(id);
    }

	public void deletePlatform(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				platformDao.delete(Long.parseLong(idstr));
			}
		}else{
			platformDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<Platform> getPlatform(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<Platform> spec = buildSpecification(searchParams);
	       
		return platformDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "id");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<Platform> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<Platform> spec = DynamicSpecifications.bySearchFilter(filters.values(), Platform.class);
		return spec;
	}

	public List<Platform> getAllList() {
		// TODO Auto-generated method stub
		return (List<Platform>) platformDao.findAll();
	}
}
