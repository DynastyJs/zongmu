package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TimeTemplateDAOImpl {
	@PersistenceContext
	EntityManager em;

	public List<Object[]> getSpanInfoByTemplateId(Long templateId) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select to_char(t.timespanbegin,'HH24:mi:ss'),to_char(t.timespanend,'HH24:mi:ss'),p.weekdate,p.timetemplateid from TB_V2_TIMESPANPARAM t,tb_v2_timetemplateparam p ");
		sql.append(" where t.ttpid = p.ttpid and p.timetemplateid = " +templateId );
		sql.append(" order by p.weekdate asc,t.timespanbegin asc");
		Query q = em.createNativeQuery(sql.toString());
		List<Object[]> list = q.getResultList();
		return list;
	}
	
}
