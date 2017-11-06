package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VideoChannelRecordIntegrityDAOImpl {
	@PersistenceContext
	EntityManager em;

	public List<Object[]> getRecordDateAndIntegrity(String startTime,String endTime,String dvsCode,String chnnCode) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select t.INTEGRITY_STATUS , t.RECORD_DATE  from TB_VIDEO_CHNN_RECORD_INFO t ");
		sql.append(" where t.RECORD_DATE>=to_date('"+startTime+"','yyyy-mm-dd hh24:mi:ss') and  t.RECORD_DATE<=to_date('"+endTime+"','yyyy-mm-dd hh24:mi:ss')  " );
		sql.append(" and  t.DVS_CODE='"+dvsCode+"'  and t.CHNN_CODE='"+chnnCode+"' ");
		Query q = em.createNativeQuery(sql.toString());
		List<Object[]> list = q.getResultList();
		return list;
	}
	
}
