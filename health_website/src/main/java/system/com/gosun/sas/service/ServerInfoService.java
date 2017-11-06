/**
 * @Title: ServerInfoService.java 	
 * @Package com.gosun.sas.service 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 下午1:35:49 	
 * @version V1.0   
 */
package com.gosun.sas.service;

import java.util.List;
import java.util.Map;

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
import com.gosun.sas.entity.ServerInfo;
import com.gosun.sas.repository.ServerInfoDAO;

/**
 * @ClassName: ServerInfoService 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 下午1:35:49
 */
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class ServerInfoService {
	@Autowired  
	private ServerInfoDAO serverInfoDao;
	
	public void saveServer(ServerInfo server){
		this.serverInfoDao.save(server);
	}
	
	public ServerInfo getServer(Long id) {
       return serverInfoDao.findOne(id);
    }

	public void deleteServerInfo(String ids) {
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				serverInfoDao.delete(Long.parseLong(idstr));
			}
		}else{
			serverInfoDao.delete(Long.parseLong(ids));
		}
	}
	
	public Page<ServerInfo> getServerInfo(Map<String, Object> searchParams, int pageNumber, int pageSize,
	           String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<ServerInfo> spec = buildSpecification(searchParams);
	       
		return serverInfoDao.findAll(spec, pageRequest);
	}

   /**
    * 创建分页请求.
    */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "serverId");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	   
   /**
    * 创建动态查询条件组合.
    */
	private Specification<ServerInfo> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<ServerInfo> spec = DynamicSpecifications.bySearchFilter(filters.values(), ServerInfo.class);
		return spec;
	}

	public List<ServerInfo> getServerInfoByType(Integer type) {
		// TODO Auto-generated method stub
		return serverInfoDao.getServerInfoByType(type);
	}

	public boolean hasCMS() {
		// TODO Auto-generated method stub
		List<ServerInfo> list = serverInfoDao.getServerInfoByType(1);
		if(list != null && list.size() >0){
			return true;
		}
		return false;
	}
}
