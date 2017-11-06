package com.gosun.healthwebsite.service;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.healthwebsite.entity.UIAlarmevent;
import com.gosun.healthwebsite.entity.UIAlarmeventExcel;
import com.gosun.healthwebsite.repository.UIAlarmEventDao;
import com.gosun.healthwebsite.repository.UIAlarmEventExcelDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * 
 * ClassName: UIAlarmeventService <br/>
 * Function: 页面告警事件事务处理. <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2017年3月2日 上午12:09:38 <br/>
 *
 * @author lisa
 * @version
 */
@Component
@Transactional
public class UIAlarmeventService {
    @Autowired private UIAlarmEventDao uiAlarmEventDao;
    @Autowired private UIAlarmEventExcelDao uIAlarmEventExcelDao;

    public Page<UIAlarmevent> getUIAlarmevent(Map<String, Object> searchParams,
                                              int pageNumber, int pageSize,
                                              String sort){

        PageRequest pageRequest = buildPageRequest(pageNumber,pageSize,sort);
        Specification<UIAlarmevent> specification = buildSpecification(searchParams);
        return uiAlarmEventDao.findAll(specification,pageRequest);
    }
    /**
     * 创建分页请求.
     */
    private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
        Sort sort = null;
        if ("auto".equals(sortType)) {
//            sort = new Sort(Sort.Direction.DESC, "beginTime");
        }
        return new PageRequest(pageNumber - 1, pagzSize, sort);
    }

    /**
     * 创建动态查询条件组合.
     */
    private Specification<UIAlarmevent> buildSpecification(Map<String, Object> searchParams) {
        Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
        Specification<UIAlarmevent> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIAlarmevent.class);
        return spec;
    }

    public Page<UIAlarmeventExcel> getUIAlarmeventExcle(Map<String, Object> searchParams,
            int pageNumber, int pageSize,
            String sort){
    	 PageRequest pageRequest = buildPageRequest(pageNumber,pageSize,sort);
         Specification<UIAlarmeventExcel> specification = buildSpecificationExcel(searchParams);
         return uIAlarmEventExcelDao.findAll(specification,pageRequest);
    }
    
    private Specification<UIAlarmeventExcel> buildSpecificationExcel(Map<String, Object> searchParams) {
        Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
        Specification<UIAlarmeventExcel> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIAlarmeventExcel.class);
        return spec;
    }
}
