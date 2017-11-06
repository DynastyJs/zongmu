package com.gosun.healthwebsite.service;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.healthwebsite.entity.UIDiagnosisStatus;
import com.gosun.healthwebsite.repository.UIDiagnasisStatusDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Created by whoszus on 2016/8/4.
 *
 * @email whoszus@yahoo.com
 */
@Component
@Transactional
public class UIDiagnasisStatusService {
    @Autowired private UIDiagnasisStatusDao diagnasisStatusDao;

    public Page<UIDiagnosisStatus> getrecordStatuses(Map<String, Object> searchParams, int pageNumber, int pageSize, String sortType) {
        PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
        Specification<UIDiagnosisStatus> spec = buildSpecification(searchParams);
        return diagnasisStatusDao.findAll(spec,pageRequest);
    }

    /**
     * 创建动态查询条件组合.
     */
    private Specification<UIDiagnosisStatus> buildSpecification(Map<String, Object> searchParams) {
        Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
        Specification<UIDiagnosisStatus> spec = DynamicSpecifications.bySearchFilter(filters.values(), UIDiagnosisStatus.class);
        return spec;
    }
    /**
     * 创建分页请求.
     */
    private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
        Sort sort = null;
        if ("auto".equals(sortType)) {
            sort = new Sort(Sort.Direction.DESC, "chnnEquipmentId");
        }
        return new PageRequest(pageNumber - 1, pagzSize, sort);
    }


}
