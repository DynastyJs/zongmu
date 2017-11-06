//package com.gosun.sas.listeners;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationListener;
//import org.springframework.context.event.ContextRefreshedEvent;
//import org.springframework.stereotype.Service;
//
//import com.gosun.sas.dto.Constants;
//import com.gosun.service.dictionary.IDictionaryService;
//import com.gosun.service.entity.DictionaryFieldRsp;
//
//@Service
//public class StartListener implements ApplicationListener<ContextRefreshedEvent> {
//
//	@Autowired 
//	private IDictionaryService dictionaryService;
//	@Override
//	public void onApplicationEvent(ContextRefreshedEvent evt) {
//		// TODO Auto-generated method stub
//		if (evt.getApplicationContext().getParent() == null) {
////			this.initParams();
//        }
//
//	}
//	
//	
//	private void initParams(){
//		//获取设备类型
//		List<DictionaryFieldRsp> list =dictionaryService.getDictionaryFieldsByCatalogCode("vsas", "SAS_DEV_TYPE");
//		if(list != null && list.size()>0){
//			for(int i=0;i<list.size();i++){
//				DictionaryFieldRsp obj = list.get(i);
//				Constants.devTypeList.put(obj.getFieldValue(), obj.getFieldName());
//			}
//		}
//		//获取颜色
//		list =dictionaryService.getDictionaryFieldsByCatalogCode("vsas", "SAS_COLOR");
//		if(list != null && list.size()>0){
//			for(int i=0;i<list.size();i++){
//				DictionaryFieldRsp obj = list.get(i);
//				Constants.colorTypeList.put(obj.getFieldValue(), obj.getFieldName());
//			}
//		}
//		
//		//获取车牌
//		list =dictionaryService.getDictionaryFieldsByCatalogCode("vsas", "SAS_PLATE_TYPE");
//		if(list != null && list.size()>0){
//			for(int i=0;i<list.size();i++){
//				DictionaryFieldRsp obj = list.get(i);
//				Constants.carNumTypeList.put(obj.getFieldValue(), obj.getFieldName());
//			}
//		}
//		
//		//获取车标
//		list =dictionaryService.getDictionaryFieldsByCatalogCode("vsas", "SAS_VEHICLE_LOGO");
//		if(list != null && list.size()>0){
//			for(int i=0;i<list.size();i++){
//				DictionaryFieldRsp obj = list.get(i);
//				Constants.carLogoTypeList.put(obj.getFieldValue(), obj.getFieldName());
//			}
//		}
//		
//		//获取车型
//		list =dictionaryService.getDictionaryFieldsByCatalogCode("vsas", "SAS_VEHICLE_TYPE");
//		if(list != null && list.size()>0){
//			for(int i=0;i<list.size();i++){
//				DictionaryFieldRsp obj = list.get(i);
//				Constants.carTypeList.put(obj.getFieldValue(), obj.getFieldName());
//			}
//		}
//	}
//
//
//}
