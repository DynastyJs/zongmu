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
import com.gosun.healthwebsite.entity.TbV2DevauthOrg;
import com.gosun.healthwebsite.entity.TimeTemplate;
import com.gosun.healthwebsite.entity.TimeTemplateParam;
import com.gosun.healthwebsite.entity.TimeTemplateParamSpan;
import com.gosun.healthwebsite.repository.TBV2DevauthChnDAO;
import com.gosun.healthwebsite.repository.TBV2DevauthOrgDAO;
import com.gosun.healthwebsite.repository.TimeSpanParamDAO;
import com.gosun.healthwebsite.repository.TimeTemplateDAO;
import com.gosun.healthwebsite.repository.TimeTemplateParamDAO;

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
public class TimeTemplateService {
	@Autowired
	private TimeTemplateDAO templateDao;
	@Autowired
	private TimeTemplateParamDAO templateParamDao;
	@Autowired
	private TimeSpanParamDAO templateParamSpanDao;
	@Autowired
	private TBV2DevauthChnDAO tBV2DevauthChnDAO;
	@Autowired
	private TBV2DevauthOrgDAO devauthOrgDAO;
	
	public TimeTemplate save(TimeTemplate template){
		return this.templateDao.save(template);
	}
	
	public void saveParam(TimeTemplateParam param){
		this.templateParamDao.save(param);
	}
	
	public TimeTemplate findByName(String name){
		return this.templateDao.findByName(name);
	}
	
	public void saveParamSpan(TimeTemplateParamSpan span){
		this.templateParamSpanDao.save(span);
	}
	
	public TimeTemplate getById(Long id) {
       return templateDao.findOne(id);
    }
	
	public List<TimeTemplateParam> getParamList(Long templateId){
		return this.templateParamDao.getListByTempId(templateId);
	}
	
	public List<TimeTemplateParamSpan> getSpanListByParamTmpId(Long paramtemplateId){
		return this.templateParamSpanDao.getListByTempParamId(paramtemplateId);
	}
	
	public List<TimeTemplateParamSpan> getSpanListByTmpId(Long templateId){
		return this.templateParamSpanDao.getListByTempId(templateId);
	}
	
	public void deleteSubByTempId(Long templateId){
		List<TimeTemplateParam> list = getParamList(templateId);
		for(TimeTemplateParam obj : list){
			this.templateParamSpanDao.delete(getSpanListByParamTmpId(obj.getId()));
		}
		this.templateParamDao.delete(list);
	}

	public void delete(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				templateDao.delete(Long.parseLong(idstr));
			}
		}else{
			Long templateId = Long.parseLong(ids);
			templateDao.delete(templateId);
			deleteSubByTempId(templateId);
			List<TbV2DevauthOrg> org = devauthOrgDAO.findByTemplateId(templateId);
			if(org!=null&&!org.isEmpty()){
				TbV2DevauthOrg t = org.get(0);
				devauthOrgDAO.delete(t);
				tBV2DevauthChnDAO.deleteByAuthId(t.getAuthId());
			}
		}
	}
	
	public Page<TimeTemplate> getPage(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<TimeTemplate> spec = buildSpecification(searchParams);
	       
		return templateDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.ASC, "id");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<TimeTemplate> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<TimeTemplate> spec = DynamicSpecifications.bySearchFilter(filters.values(), TimeTemplate.class);
		return spec;
	}
	
	
}
