package com.gosun.healthwebsite.service;

import com.gosun.healthwebsite.entity.BizFocusRepair;
import com.gosun.healthwebsite.repository.BizFocusRepairDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by whoszus on 2016/7/28.
 *
 * @email whoszus@yahoo.com
 */
@Component
@Transactional
public class BizFocusRepairService {

    @Autowired private BizFocusRepairDao bizFocusRepairDao;

    public BizFocusRepair getOneByIdAndPName(Long equipmentId,String propertyName){
        return bizFocusRepairDao.getOneByIdAndPName(equipmentId,propertyName);
    }

    public BizFocusRepair getOneByIdAndType(Long equipmentId ,String type){
        return bizFocusRepairDao.getOne(equipmentId,type);
    }

    public void save(BizFocusRepair bizFocusRepair){
        bizFocusRepairDao.save(bizFocusRepair);
    }

}
