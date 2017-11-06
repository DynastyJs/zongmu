package com.gosun.healthwebsite.service;

import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.healthwebsite.repository.UIRecordStatusDAOImpl;

/**
 * Created by whoszus on 2016/8/4.
 *
 * @email whoszus@yahoo.com
 */
@Component
@Transactional
public class UIRecordStatusService {

//    @Autowired 
//    private UIRecordStatusDao recordStatusDao;
    @Autowired
    private UIRecordStatusDAOImpl statusDAOImpl;
    
    public String getMaxRecordDate(Long dvsEquipmentId){
    	return statusDAOImpl.getMaxRecordDate(dvsEquipmentId);
    }
    
    public JSONObject getRecordStatusByProcedure(Map<String, Object> searchParams,int pageNumber, int pageSize){

        return statusDAOImpl.getRecordStatusByProcedure(searchParams,pageNumber,pageSize);
    }
    
//    public Page<UIRecordStatus> getrecordStatuses(Map<String, Object> searchParams, int pageNumber, int pageSize, String sortType) {
//        PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
//        Specification<UIRecordStatus> spec = buildSpecification(searchParams);
//        return recordStatusDao.findAll(spec,pageRequest);
//    }
//
//   
//    private Specification<UIRecordStatus> buildSpecification(Map<String, Object> searchParams) {
//        Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
//        Specification<UIRecordStatus> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIRecordStatus.class);
//        return spec;
//    }
    
    private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
        Sort sort = null;
//        if ("auto".equals(sortType)) {
//            sort = new Sort(Sort.Direction.DESC, "recordDate");
//        }
        return new PageRequest(pageNumber - 1, pagzSize, sort);
    }


}
