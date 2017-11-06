package com.gosun.healthwebsite.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.healthwebsite.entity.DeviceSignalOperation;
import com.gosun.healthwebsite.entity.SysEquipment;
import com.gosun.healthwebsite.entity.UIFsuInfo;
import com.gosun.healthwebsite.entity.ViewDeviceSignalOperation;
import com.gosun.healthwebsite.fsuservice.FSUServiceEntry;
import com.gosun.healthwebsite.fsuservice.FSUServiceUtils;
import com.gosun.healthwebsite.repository.DeviceSignalOperationDao;
import com.gosun.healthwebsite.repository.SysEquipmentDAO;
import com.gosun.healthwebsite.repository.UIFsuInfoDAO;
import com.gosun.healthwebsite.repository.ViewDeviceSignalOperationDao;

//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class UIFsuInfoService {

	@Autowired
	private UIFsuInfoDAO fsuDAO;
	@Autowired
	private SysEquipmentDAO sysEquipmentDAO;
	@Autowired
	private DeviceSignalOperationDao deviceSignalOperationDao;
	@Autowired
	private ViewDeviceSignalOperationDao viewDeviceSignalOperationDao;
	
	public UIFsuInfo findById(String id){
		return fsuDAO.findById(id);
	}
	
	public Page<UIFsuInfo> getFusInfo(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<UIFsuInfo> spec = buildSpecification(searchParams);
		return fsuDAO.findAll(spec, pageRequest); 
	}
	


	/**
	 * 创建分页请求.
	 */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "fsuId");
		}else{
			String[] sortStrs = sortType.split("_");
			if(sortStrs.length==2)
				sort = new Sort(sortStrs[0].toUpperCase().equals("DESC")?Direction.DESC:Direction.ASC,sortStrs[1]);
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
	/**
	 * 创建动态查询条件组合.
	 */
	private Specification buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification spec = DynamicSpecifications.bySearchFilter(filters.values(), UIFsuInfo.class);
		return spec;
	}
	
	public List findAll()
	{
		return (List) fsuDAO.findAll();
	}
	
	/**
	 * 通过WebService查询FSU设备配置信息
	 * @author yrf
	 * @2016年6月14日 下午15:52:54
	 * @param id
	 * @return
	 */
	public Map getFsuConfig(String id)
	{
		UIFsuInfo fsu = fsuDAO.findById(id);
		if(fsu == null)
		{
			return  null;
		}
		FSUServiceEntry entry = new FSUServiceEntry();
		entry.setChIP(fsu.getNetAddress());
		entry.setFsuCode(fsu.getFsuCode());
		entry.setFsuId(fsu.getFsuId());
		String result = FSUServiceUtils.sendReadConfigRequest(fsu.getNetAddress(), fsu.getNetPort(), entry);
		try {
			Document document = DocumentHelper.parseText(result);
			Element rootNode  = document.getRootElement();//Response
		    Element info  = rootNode.element("Info");//Info
		    Map<String, Object> map = new HashMap<String, Object>();
		    map.put("nMaxPacketLoss", info.element("nMaxPacketLoss").getText());
		    map.put("fMaxRoundTripAvg", info.element("fMaxRoundTripAvg").getText());
		    map.put("nFrequ", info.element("nFrequ").getText());
		    map.put("nTimePeriod", info.element("nTimePeriod").getText());
		    return map;
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	   
	}
	
	/**
	 * 设置FSU设备配置参数
	 * @author yrf
	 * @2016年6月15日 上午9:53:57
	 * @param entry
	 * @param equipmentIds
	 * @param type 0:绑定 1:解绑
	 * @return
	 * @throws Exception 
	 */
	public String setFsuConfig(FSUServiceEntry entry,String equipmentIds,int type) throws Exception
	{
		UIFsuInfo fsu = fsuDAO.findById(entry.getFsuId());
		if(fsu == null)
		{
			return  null;
		}
		Set<String> ipList = sysEquipmentDAO.listIpByFsu(entry.getFsuId());
		entry.setFsuCode(fsu.getFsuCode());
		if(equipmentIds!=null&&equipmentIds.indexOf(",")>0){
			String arr[] = equipmentIds.split(",");
			for(String idstr : arr){
				SysEquipment eq = sysEquipmentDAO.findOne(Long.parseLong(idstr));
				if(type==0){
					ipList.add(eq.getNetAddress());
				}else{
					ipList.remove(eq.getNetAddress());
				}
			}
		}
		entry.setChIPList(ipList);
		String result = FSUServiceUtils.sendWriteConfigRequest(fsu.getNetAddress(), fsu.getNetPort(), entry);
		try {
			if(result!=null){
				Document document = DocumentHelper.parseText(result);
				Element rootNode  = document.getRootElement();//Response
			    Element info  = rootNode.element("Info");//Info
			    
			    return info.element("Result").getText();
			}
			
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			
		}
		return null;
	}
	
	/**
	 * 获取设备信号量
	 */
	@SuppressWarnings("finally")
	public Map getTSemaphore(DeviceSignalOperation dso){
		Map<String,String> map = new HashMap<String,String>();
		if(dso.getSignalMap()==null||dso.getSignalMap().size()==0)
			return map;
		try {
			String responseText = FSUServiceUtils.sendGetTSemaphoreRequest(dso);
			if(responseText!=null){
				Document document = DocumentHelper.parseText(responseText);
				Element rootNode  = document.getRootElement();//Response
				Element device  = rootNode.element("Info").element("Values").element("DeviceList").element("Device");
				List<Element> tSemaphores = device.elements("TSemaphore");
				if(tSemaphores!=null&&tSemaphores.size()>0){
					for(Element e:tSemaphores){
						map.put(e.attributeValue("Id"), e.attributeValue("MeasuredVal"));
					}
				}
			}
		} catch (DocumentException e) {
			
		}finally{
			return map;
		}
	}
	
	/**
	 * 修改设备信号量
	 */
	@SuppressWarnings("finally")
	public List<DeviceSignalOperation> setTSemaphore(DeviceSignalOperation dso){
		Map<String,String> resultMap = new HashMap<String,String>();
		List<DeviceSignalOperation> dsoList = new ArrayList<DeviceSignalOperation>(dso.getSignalMap().size());
		try {
			String responseText = FSUServiceUtils.sendWriteTSemaphoreRequest(dso);
			if(responseText!=null){
				Document document = DocumentHelper.parseText(responseText);
				Element rootNode  = document.getRootElement();//Response
				List<Element> successList = rootNode.element("Info").element("DeviceList").element("Device").element("SuccessList").elements("Id");//SuccessList
				List<Element> failList = rootNode.element("Info").element("DeviceList").element("Device").element("FailList").elements("Id");//FailList
				if(successList.size()>0){
					for(Element e:successList){
						DeviceSignalOperation dsoIndex = (DeviceSignalOperation)dso.clone();
						dsoIndex.setOperationStatus("成功");
						dsoIndex.setSignalId(e.getText().substring(2)); //去掉signalId前面的04
						dsoIndex.setSetUpValue(dso.getSignalMap().get(e.getText()));
						dsoList.add(dsoIndex);
					}
				}
				if(failList.size()>0){
					for(Element e:failList){
						DeviceSignalOperation dsoIndex = (DeviceSignalOperation)dso.clone();
						dsoIndex.setOperationStatus("失败");
						dsoIndex.setSignalId(e.getText().substring(2)); //去掉signalId前面的04
						dsoIndex.setSetUpValue(dso.getSignalMap().get(e.getText()));
						dsoList.add(dsoIndex);
					}
				}
			}
		} catch (Exception e) {
			System.out.println(e);
		}finally{
			deviceSignalOperationDao.save(dsoList);
			return dsoList;
		}
	}
	
	/**
	 * 修改监控点门限值
	 */
	@SuppressWarnings("finally")
	public String setTThreshold(DeviceSignalOperation dso){
		String result = null;
		dso.setOperationStatus("失败");
		try {
			String responseText = FSUServiceUtils.sendWriteTThresholdRequest(dso);
			if(responseText!=null){
				Document document = DocumentHelper.parseText(responseText);
				Element rootNode  = document.getRootElement();//Response
				Element info  = rootNode.element("Info");//Info
				result = info.element("Result").getText();
				if(result!=null&&result.equals("1")){
					dso.setOperationStatus("成功");
				}
			}
		} catch (DocumentException e) {
			
		}finally{
			dso.setSignalId(dso.getSignalId().substring(2)); //去掉signalId前面的04
			deviceSignalOperationDao.save(dso);
			return result;
		}
	}
	
	/**
	 * 获取修改数据历史记录
	 */
	public Page<ViewDeviceSignalOperation> getViewDeviceSignalOperationPageList(
			Map<String, Object> searchParams, int pageNumber, int pageSize,
			String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize,
				sortType);
		Specification<ViewDeviceSignalOperation> spec = buildSpecification(searchParams);
		return viewDeviceSignalOperationDao.findAll(spec, pageRequest);
	}
}
