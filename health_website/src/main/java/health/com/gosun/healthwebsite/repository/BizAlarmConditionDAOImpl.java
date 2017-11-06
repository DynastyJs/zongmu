package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BizAlarmConditionDAOImpl {
	@PersistenceContext
	EntityManager em;

	public List<?> getAllAlarmResult() {
		StringBuffer sql = new StringBuffer();
		sql.append(" select ALARM_RESULT from HEALTH.BIZ_ALARM_CONDITION GROUP BY ALARM_RESULT");
		Query q = em.createNativeQuery(sql.toString());
		List<?> list = q.getResultList();
		return list;
	}
	
}
