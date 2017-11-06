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
import com.gosun.sas.entity.Domain;
import com.gosun.sas.repository.DomainDAO;

/**
 * 
 * @author Abe
 * 
 */
// Spring Bean的标识.
@Component
// 默认将类中的所有public函数纳入事务管理.
@Transactional
public class DomainService {
	@Autowired
	private DomainDAO domainDao;

	public List<Domain> getSubDomainList(Long domainId) {
		return domainDao.getSubDomainList(domainId);
	}

	public void saveDomain(Domain domain) {
		this.domainDao.save(domain);
	}

	public Domain getDomain(Long id) {
		return domainDao.findOne(id);
	}

	public void deleteDomain(String ids) {
		if (ids.indexOf(",") > 0) {
			String arr[] = ids.split(",");
			for (String idstr : arr) {
				domainDao.delete(Long.parseLong(idstr));
			}
		} else {
			domainDao.delete(Long.parseLong(ids));
		}
	}

	public Page<Domain> getDomainInfo(Map<String, Object> searchParams,
			int pageNumber, int pageSize, String sortType) {
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize,
				sortType);
		Specification<Domain> spec = buildSpecification(searchParams);

		return domainDao.findAll(spec, pageRequest);
	}

	/**
	 * 创建分页请求.
	 */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize,
			String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.DESC, "id");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}

	/**
	 * 创建动态查询条件组合.
	 */
	private Specification<Domain> buildSpecification(
			Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<Domain> spec = DynamicSpecifications.bySearchFilter(
				filters.values(), Domain.class);
		return spec;
	}

}
