package com.gosun.healthwebsite.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.healthwebsite.entity.BizEquipmentStatus;
import com.gosun.healthwebsite.entity.BizEquipmentStatusId;
import com.gosun.healthwebsite.entity.C3mFsu;
import com.gosun.healthwebsite.entity.SysEquipment;
import com.gosun.healthwebsite.repository.BizAlarmDAOImpl;
import com.gosun.healthwebsite.repository.BizEquipmentStatusDAO;
import com.gosun.healthwebsite.repository.C3mFsuDAO;
import com.gosun.healthwebsite.repository.EquipmentTypeDaoImpl;
import com.gosun.healthwebsite.repository.SysEquipmentDAO;

//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class SysEquipmentService {

	@Autowired
	private SysEquipmentDAO sysEquipmentDAO;
	@Autowired
	private C3mFsuDAO fsuDAO;
	@Autowired
	private BizEquipmentStatusDAO bizEquipmentStatusDAO;
	@Autowired
	private BizAlarmDAOImpl bizAlarmDAOImpl;
	@Autowired
	private EquipmentTypeDaoImpl equipmentTypeDaoImpl;
	
	public void save(SysEquipment equ){
		this.sysEquipmentDAO.save(equ);
	}
	
	public SysEquipment getSysEquipment(Long id) {
	       return sysEquipmentDAO.findOne(id);
	    }
	public Page<SysEquipment> getSysEquipment(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<SysEquipment> spec = buildSpecification(searchParams);
		
		return sysEquipmentDAO.findAll(spec, pageRequest); 
	}

/**
 * 创建分页请求.
 */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "equipmentId");
		}else{
			List<Order> orders = new ArrayList();
	        Order order2 = new Order(Direction.ASC, "orgId");  
	        Order order3 = new Order(Direction.ASC, "equipmentTypeId");  
			Order order = new Order(Direction.ASC, "name");  
			orders.add(order2);
			orders.add(order3);
			orders.add(order);
			sort = new Sort(orders);
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
/**
 * 创建动态查询条件组合.
 */
	private Specification<SysEquipment> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<SysEquipment> spec = DynamicSpecifications.bySearchFilter(filters.values(), SysEquipment.class);
		return spec;
	}
	
	public List findAll()
	{
		return (List) sysEquipmentDAO.findAll();
	}
	/**
	 * 进行FSU设备绑定
	 * @author yrf
	 * @2016年6月14日 下午4:56:26
	 * @param fsuId
	 * @param equipmentId
	 * @return
	 */
	public String link(String fsuId, String ids)
	{
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				SysEquipment eq = sysEquipmentDAO.findOne(Long.parseLong(idstr));
				if(eq != null){
					C3mFsu fsu = fsuDAO.findById(fsuId);
					if(fsu!= null){
						eq.setFsuId(fsuId);
						sysEquipmentDAO.save(eq);
						addNetStatus(eq.getEquipmentId());
					}
				}
			}
		}
		return "{ret:1, msg:'保存成功'}";
	}
	/**
	 * 解除绑定
	 * @author yrf
	 * @2016年6月14日 下午4:56:50
	 * @param fsuId
	 * @param equipmentId
	 * @return
	 */
	public String unlink(String ids)
	{
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				SysEquipment eq = sysEquipmentDAO.findOne(Long.parseLong(idstr));
				if(eq != null){
					eq.setFsuId(null);
					sysEquipmentDAO.save(eq);
					bizAlarmDAOImpl.updateFinishByEquipmentId(eq.getEquipmentId());
					deleteNetStatus(eq.getEquipmentId());
				}
			}
		}
		return "{ret:1, msg:'保存成功'}";
	}
	
	public void addNetStatus(Long equipmentId){
		BizEquipmentStatus status = new BizEquipmentStatus();
		BizEquipmentStatusId id = new BizEquipmentStatusId();
		id.setEquipmentId(equipmentId);
		id.setPropertyName("网络状态");
		status.setId(id);
		status.setPropertyValue("正常");
		status.setUpdateTime(new Date());
		bizEquipmentStatusDAO.save(status);
	}
	
	public void deleteNetStatus(Long equipmentId){
		bizEquipmentStatusDAO.deleteByIdAndPname(equipmentId, "网络状态");
	}
	
	/**
	 * 获取手动添加设备的分类
	 * @return
	 */
	public List getManaulEquipmentType(){
		return equipmentTypeDaoImpl.getTypeByGroupId("2");
	}
	
	/**
	 * 删除设备(伪删)
	 * @param ids
	 */
	public void deleteSysEquipments(String ids){
		Long id = null;
		if (ids.indexOf(",") > 0) {
			String arr[] = ids.split(",");
			for (String idstr : arr) {
				id = Long.parseLong(idstr);
				sysEquipmentDAO.removeEquipment(id);
			}
		} else {
			id = Long.parseLong(ids);
			sysEquipmentDAO.removeEquipment(id);
		}
	}
	
	/**
	 * 增加或修改手动添加的设备
	 * @param equipemnt
	 */
	public void saveManaualEquipment(SysEquipment equipment){
		if(equipment.getEquipmentId()==null){
			equipment.setCode("addTime:"+new Date().getTime());
		}
		equipment.setIsDelete(0l);
		equipment.setIsManualIn(1l);
		sysEquipmentDAO.save(equipment);
	}
}
