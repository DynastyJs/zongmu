package com.gosun.healthwebsite.repository;

import com.gosun.healthwebsite.entity.UIAlarmevent;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by whoszus on 2016/7/19.
 *
 * @email whoszus@yahoo.com
 */
public interface UIAlarmEventDao extends PagingAndSortingRepository<UIAlarmevent, Long>,
        JpaSpecificationExecutor<UIAlarmevent> {
}
