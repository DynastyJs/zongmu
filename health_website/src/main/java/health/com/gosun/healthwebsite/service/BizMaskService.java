/**
 * @Title: BizMaskService.java 	
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
import com.gosun.healthwebsite.entity.BizMask;
import com.gosun.healthwebsite.repository.BizMaskDAO;

/**
 * @ClassName: BizMaskService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-5-18 下午1:37:44
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class BizMaskService {
	@Autowired
	private BizMaskDAO maskDao;
	
	public void saveBizMask(BizMask alarmCon){
		this.maskDao.save(alarmCon);
	}
	
	public BizMask getBizMask(Long id) {
       return maskDao.findOne(id);
    }
	
	public List<BizMask> getListByEquipmentIdAndPropertyName(Long equId,String propertyName){
		return maskDao.getListByEquipmentIdAndPropertyName(equId,propertyName);
	}
	
	public List<BizMask> getListByEquipmentId(Long equId){
		return maskDao.getListByEquipmentId(equId);
	}
 
	public void deleteBizMask(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				maskDao.delete(Long.parseLong(idstr));
			}
		}else{
			maskDao.delete(Long.parseLong(ids));
		}
	}
	
	public List<BizMask> getListByOrgAndEquId(Long orgId,Long equipmentId){
		return maskDao.getListByOrgAndEquId(orgId, equipmentId);
	}
 	
	public void deleteBizMaskByOrgId(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				List<BizMask> list = maskDao.getListByOrgId(Long.parseLong(idstr));
				for(BizMask mask : list){
					maskDao.delete(mask);
				}
			}
		}else{
			List<BizMask> list = maskDao.getListByOrgId(Long.parseLong(ids));
			for(BizMask mask : list){
				maskDao.save(mask);
			}
		}
	}
	
	public void deleteBizMaskByEquId(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				List<BizMask> list = maskDao.getListByEquipmentId(Long.parseLong(idstr));
				for(BizMask mask : list){
					mask.setIsMask('0');
					maskDao.save(mask);
				}
			}
		}else{
			List<BizMask> list = maskDao.getListByEquipmentId(Long.parseLong(ids));
			for(BizMask mask : list){
				mask.setIsMask('0');
				maskDao.save(mask);
			}
		}
	}
	
	public void deleteBizMaskByEquIdAndPropertyName(String ids,String propertyName) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				List<BizMask> list = maskDao.getListByEquipmentIdAndPropertyName(Long.parseLong(idstr),propertyName);
				for(BizMask mask : list){
					maskDao.delete(mask);
				}
			}
		}else{
			List<BizMask> list = maskDao.getListByEquipmentIdAndPropertyName(Long.parseLong(ids),propertyName);
			for(BizMask mask : list){
				maskDao.delete(mask);
			}
		}
	}
	
	
	public Page<BizMask> getBizMask(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<BizMask> spec = buildSpecification(searchParams);
	       
		return maskDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "maskId");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<BizMask> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<BizMask> spec = DynamicSpecifications.bySearchFilter(filters.values(), BizMask.class);
		return spec;
	}
	
	
}
