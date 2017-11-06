package com.gosun.healthwebsite.repository;

import com.gosun.healthwebsite.entity.UIDiagnosisStatus;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by whoszus on 2016/8/4.
 *
 * @email whoszus@yahoo.com
 */
public interface UIDiagnasisStatusDao extends PagingAndSortingRepository<UIDiagnosisStatus, Long>,
        JpaSpecificationExecutor<UIDiagnosisStatus> {
}
