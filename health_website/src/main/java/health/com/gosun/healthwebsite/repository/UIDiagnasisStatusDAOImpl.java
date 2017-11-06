package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;


@Repository
public class UIDiagnasisStatusDAOImpl{
	
	@PersistenceContext
	EntityManager em;
	
	public String getImgUrlByEquipmentId(Long equipmentId){
		StringBuffer sql = new StringBuffer();
		sql.append(" select t.img_url from VIDEO_DIAGNOSE_IMG t where t.equipment_id = "+equipmentId);
		Query q = em.createNativeQuery(sql.toString());
        List<?> list = q.getResultList();
        String result = "";
        if(list!=null&&list.size()>0){
        	result = list.get(0).toString();
        }
        return result;
	}
	
}
