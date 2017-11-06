package com.gosun.healthwebsite.repository;
// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import oracle.jdbc.OracleConnection;
import oracle.jdbc.driver.OracleTypes;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class UIRecordStatusDAOImpl {
	@PersistenceContext
	EntityManager em;
	
	@Value("${jdbc.url}")
	private String jdbcConn;
	@Value("${jdbc.username}")
	private String jdbcUser;
	@Value("${jdbc.password}")
	private String jdbcPwd;

	public String getMaxRecordDate(Long dvsEquipmentId) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select to_char(max(t.record_date),'yyyy-mm-dd') from tb_video_chnn_record_info t where t.dvs_code =(select s.code from sys_equipment s where s.equipment_id= "+dvsEquipmentId+")");
		Query q = em.createNativeQuery(sql.toString());
		List<String> list = q.getResultList();
		if(list!=null&&list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	public JSONObject getRecordStatusByProcedure(Map<String, Object> searchParams,int pageNumber, int pageSize){
    	String path = null;
    	String recordDate = null;
    	String equipmentName = null;
    	String dvsCode = null;
    	String chnnCode = null;
    	String dvsEquipmentId=null;
        if(searchParams.get("ORGLIKE_path")!=null){
        	path = searchParams.get("ORGLIKE_path").toString().isEmpty()?null:searchParams.get("ORGLIKE_path").toString(); 
        }
        if(searchParams.get("EQ_recordDate")!=null){
        	recordDate = searchParams.get("EQ_recordDate").toString().isEmpty()?null:searchParams.get("EQ_recordDate").toString(); 
        }
        if(searchParams.get("LIKE_equipmentName")!=null){
        	equipmentName = searchParams.get("LIKE_equipmentName").toString().isEmpty()?null:searchParams.get("LIKE_equipmentName").toString(); 
        }
        if(searchParams.get("EQ_dvsCode")!=null){
        	dvsCode = searchParams.get("EQ_dvsCode").toString().isEmpty()?null:searchParams.get("EQ_dvsCode").toString(); 
        }
        if(searchParams.get("EQ_chnnCode")!=null){
        	chnnCode = searchParams.get("EQ_chnnCode").toString().isEmpty()?null:searchParams.get("EQ_chnnCode").toString(); 
        }
        if(searchParams.get("EQ_dvsEquipmentId")!=null){
        	dvsEquipmentId = searchParams.get("EQ_dvsEquipmentId").toString().isEmpty()?null:searchParams.get("EQ_dvsEquipmentId").toString(); 
        }
		OracleConnection conn = null;
		CallableStatement prest = null;
		CallableStatement prest1 = null;
		JSONObject resultObj = new JSONObject();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String count_sql = "{call pro_record_status.pro_record_status_counts(?,?,?,?,?,?,?)}";
			prest = conn.prepareCall(count_sql);
			prest.setString(1, recordDate);
			prest.setString(2, path);
			prest.setString(3, equipmentName);
			prest.setString(4, dvsCode);
			prest.setString(5, chnnCode);
			prest.setString(6, dvsEquipmentId);
			prest.registerOutParameter(7, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(7);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			int columnCount = md.getColumnCount(); // 返回此 ResultSet 对象中的列数
			int totalCount = 0; 
			while (rs.next()) {				
				for (int i = 0; i < columnCount; i++) {
					totalCount=Integer.parseInt(rs.getObject(i+1).toString());
				}
			}
			int totalPages= (int)Math.ceil(totalCount/pageSize);
			resultObj.put("totalElements", totalCount);
			resultObj.put("numberOfElements",pageNumber);
			resultObj.put("totalPages",totalPages);
			resultObj.put("first",pageNumber==1);
			resultObj.put("last",pageNumber==totalPages);
			resultObj.put("number",pageNumber-1);
			resultObj.put("size",pageSize);
			String data_sql = "{call PRO_RECORD_STATUS.PRO_RECORD_STATUS_DATAS(?,?,?,?,?,?,?,?,?,?)}";
			prest1 = conn.prepareCall(data_sql);
			prest1.setInt(1, 1);
			prest1.setInt(2, pageNumber);
			prest1.setInt(3, pageSize);
			prest1.setString(4, recordDate);
			prest1.setString(5, path);
			prest1.setString(6, equipmentName);
			prest1.setString(7, dvsCode);
			prest1.setString(8, chnnCode);
			prest1.setString(9, dvsEquipmentId);
			prest1.registerOutParameter(10, OracleTypes.CURSOR);

			prest1.execute();
			ResultSet rs1 = (ResultSet) prest1.getObject(10);
			ResultSetMetaData md1 = rs1.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			int columnCount1 = md1.getColumnCount(); // 返回此 ResultSet 对象中的列数
			JSONArray resultArray = new JSONArray();
			while (rs1.next()) {			
				JSONObject dataObj = new JSONObject();
				for (int i = 0; i < columnCount1; i++) {
					
					switch(i){
					case  0:
						dataObj.put("dataId", rs1.getLong(i+1));
						continue;
					case  1:
						dataObj.put("chnnEquipmentId", rs1.getLong(i+1));
						continue;
					case  2:
						dataObj.put("chnnName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;	
					case  3:
						dataObj.put("producer", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  4:
						dataObj.put("moduleName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  5:
						dataObj.put("netAddress", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  6:
						dataObj.put("pathName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  8:
						dataObj.put("dvsCode", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  9:
						dataObj.put("chnnCode", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  10:
						dataObj.put("recordDate", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  11:
						dataObj.put("dvsEquipmentId", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  12:
						dataObj.put("timeRecord", rs1.getInt(i+1));
						continue;
					case  13:
						dataObj.put("daysAlarm", rs1.getInt(i+1));
						continue;
					case  14:
						dataObj.put("focusFlag", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  15:
						dataObj.put("repairFlag", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  16:
						dataObj.put("isMask", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  17:
						dataObj.put("realSaveDaysInplan", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  18:
						dataObj.put("realSaveDays", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  19:
						dataObj.put("saveDays", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  20:
					      oracle.sql.CLOB clob = (oracle.sql.CLOB) rs1.getClob(i+1);  
					      String value = (clob==null? "":clob.getSubString(1, (int) clob.length()));  
					      dataObj.put("loseSpan",  value );
						continue;
					case  21:
						dataObj.put("checkSpan", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  22:
						dataObj.put("equipmentName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  23:
					      oracle.sql.CLOB clob1 = (oracle.sql.CLOB) rs1.getClob(i+1);  
					      String value1 = (clob1==null? "":clob1.getSubString(1, (int) clob1.length()));  
					      dataObj.put("alarmLoseSpan",  value1);
						continue;
					}
					
				}
				resultArray.add(dataObj);
			}
			resultObj.put("content", resultArray);
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {			
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		} finally {
			try {
				if (prest != null) {
					prest.close();
				}
				if (prest1 != null) {
					prest1.close();
				}
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}

		}

		return resultObj;
	}
	
}
