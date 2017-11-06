package com.gosun.example.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

/**
 * 任务的自定义实现类
 * @author lwh
 *
 */
@Repository
public class TaskDaoImpl {
	
	@PersistenceContext
	EntityManager em;
	
	/**
	 * 自定义查询
	 * @param taskName
	 * @return
	 */
	public Page<Object[]> findByTitle(String title) {
		String hql = "select  t.id, t.title, t.description from Task t where t.title = ?";
		Query q = em.createQuery(hql);
		q.setParameter(1, title);
		q.setFirstResult(0);
		q.setMaxResults(1);
		
		Page<Object[]> page = new PageImpl<Object[]>(q.getResultList(), new PageRequest(0, 1), 3);
		return page;
	}
	
}
