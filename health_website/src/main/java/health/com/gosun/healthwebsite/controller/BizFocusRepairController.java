package com.gosun.healthwebsite.controller;

import com.gosun.healthwebsite.entity.BizFocusRepair;
import com.gosun.healthwebsite.service.BizFocusRepairService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by whoszus on 2016/7/28.
 *
 * @email whoszus@yahoo.com
 */
@RestController
@RequestMapping("/focuRepair")
public class BizFocusRepairController {

    @Autowired
    private BizFocusRepairService bizFocusRepairService;

    /**
     * 如果是获取设备属性，需要equipmentId & propertyName
     * 获取通道属性则需要 equipmentId 和 type
     * @param bizFocusRepair
     * @return
     */
    @RequestMapping("/getFPStatus")
    public String getOne(BizFocusRepair bizFocusRepair) {
        BizFocusRepair bizFocusRepairDB = null;
        if(bizFocusRepair.getType().equals("1")){ //type == 1 通道，通道不需要propertyName
            bizFocusRepairDB = bizFocusRepairService.getOneByIdAndType(bizFocusRepair.getEquipmentId(),
                    bizFocusRepair.getType());
        }else{ //设备属性
            bizFocusRepairDB = bizFocusRepairService.getOneByIdAndPName(bizFocusRepair.getEquipmentId(),
                    bizFocusRepair.getPropertyName());
        }
        if (bizFocusRepairDB == null) {
            return JSONObject.fromObject("{ret:-1,msg:'none'}").toString();
        }
        return JSONObject.fromObject(bizFocusRepairDB).toString();
    }


    /**
     * 设置设备属性或者通道的关注以及报修状态
     * @param bizFocusRepair  type == 0 ：设备属性
     * @param flag 标识操作关注还是报修
     * @param status 状态
     * @return
     */
    @RequestMapping("/FPEquipmentStatus.do")
    public String focusEquipmentStatus(BizFocusRepair bizFocusRepair,String flag,String status) {
        BizFocusRepair bizFocusRepairDB = null;
        if(bizFocusRepair.getType().equals("1")){ //type == 1 关注通道
            bizFocusRepairDB = bizFocusRepairService.getOneByIdAndType(bizFocusRepair.getEquipmentId(),
                    bizFocusRepair.getType());
        }else{ //关注设备属性
            bizFocusRepairDB = bizFocusRepairService.getOneByIdAndPName(bizFocusRepair.getEquipmentId(),
                    bizFocusRepair.getPropertyName());
        }
//        String res = null;
        if(bizFocusRepairDB ==null){
            bizFocusRepairDB =new BizFocusRepair();
            bizFocusRepairDB.setEquipmentId(bizFocusRepair.getEquipmentId());
            bizFocusRepairDB.setPropertyName(bizFocusRepair.getPropertyName());
            bizFocusRepairDB.setType(bizFocusRepair.getType());
        }
        if(flag.equals("focusFlag")){
//            res = "设置关注状态成功";
            bizFocusRepairDB.setFocusFlag(status);
        }else{
//            res = "设置报修状态成功";
            bizFocusRepairDB.setRepairFlag(status);
        }
        bizFocusRepairService.save(bizFocusRepairDB);

        return JSONObject.fromObject("{ret:1,msg:'成功'}").toString();
    }


}
