package com.gosun.healthwebsite.repository;

import com.gosun.healthwebsite.entity.BizFocusRepair;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by whoszus on 2016/7/28.
 *
 * @email whoszus@yahoo.com
 */
public interface BizFocusRepairDao extends PagingAndSortingRepository<BizFocusRepair,Long>,
        JpaSpecificationExecutor<BizFocusRepair> {
    @Query("from BizFocusRepair where equipmentId = ?1 and propertyName =?2")
    BizFocusRepair getOneByIdAndPName(Long equipmentId,String propertyName);

    @Query("from BizFocusRepair where equipmentId = ?1 and type =?2")
    BizFocusRepair getOne(Long equipmentId, String type);
}
