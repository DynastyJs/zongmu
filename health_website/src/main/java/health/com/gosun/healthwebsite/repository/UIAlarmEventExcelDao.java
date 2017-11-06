package com.gosun.healthwebsite.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.healthwebsite.entity.UIAlarmevent;
import com.gosun.healthwebsite.entity.UIAlarmeventExcel;

public interface UIAlarmEventExcelDao extends PagingAndSortingRepository<UIAlarmeventExcel, Long>,
JpaSpecificationExecutor<UIAlarmeventExcel>{

}
