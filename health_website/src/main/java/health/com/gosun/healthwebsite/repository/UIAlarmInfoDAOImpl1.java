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
public class UIAlarmInfoDAOImpl1{
	
	@PersistenceContext
	EntityManager em;
	
	@Value("${jdbc.url}")
	private String jdbcConn;
	@Value("${jdbc.username}")
	private String jdbcUser;
	@Value("${jdbc.password}")
	private String jdbcPwd;
	
	public List getStatisticByProcessResult(String orgId){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(*),t.PROCESS_RESULT from VIEW_UI_ALARM_LIST t where t.PROCESS_FLAG is not null group by  t.PROCESS_RESULT");
		Query q = em.createNativeQuery(sql.toString());
        List<?> list = q.getResultList();
        return list;
	}
	
	public JSONObject getAlarmLogByProcedure(Map<String, Object> searchParams,int pageNumber, int pageSize){
        String search_GE_beginTime=null;
        String search_LE_beginTime=null;
        String search_GE_endTime=null;
        String search_LE_endTime=null;
        String search_LIKE_alarmType=null;
        String search_LIKE_equipmentName=null;

        String search_LIKE_name=null;
        String search_LIKE_processResult=null;
        String search_ORGLIKE_path=null;
        String search_EQ_focusFlag=null;
        String search_EQ_alarmLevel=null;
        String search_EQ_isMask=null;
        String search_ISNULL_processFlag=null;
        if(searchParams.get("GE_beginTime")!=null){
        	search_GE_beginTime = searchParams.get("GE_beginTime").toString().isEmpty()?null:searchParams.get("GE_beginTime").toString(); 
        }
        if(searchParams.get("LE_beginTime")!=null){
        	search_LE_beginTime = searchParams.get("LE_beginTime").toString().isEmpty()?null:searchParams.get("LE_beginTime").toString(); 
        }
        if(searchParams.get("GE_endTime")!=null){
        	search_GE_endTime = searchParams.get("GE_endTime").toString().isEmpty()?null:searchParams.get("GE_endTime").toString(); 
        }
        if(searchParams.get("LE_endTime")!=null){
        	search_LE_endTime = searchParams.get("LE_endTime").toString().isEmpty()?null:searchParams.get("LE_endTime").toString(); 
        }
        if(searchParams.get("LIKE_alarmType")!=null){
        	search_LIKE_alarmType = searchParams.get("LIKE_alarmType").toString().isEmpty()?null:searchParams.get("LIKE_alarmType").toString(); 
        }
        if(searchParams.get("LIKE_equipmentName")!=null){
        	search_LIKE_equipmentName = searchParams.get("LIKE_equipmentName").toString().isEmpty()?null:searchParams.get("LIKE_equipmentName").toString(); 
        }
        
        if(searchParams.get("LIKE_name")!=null){
        	search_LIKE_name = searchParams.get("LIKE_name").toString().isEmpty()?null:searchParams.get("LIKE_name").toString(); 
        }
        if(searchParams.get("LIKE_processResult ")!=null){
        	search_LIKE_processResult = searchParams.get("LIKE_processResult").toString().isEmpty()?null:searchParams.get("LIKE_processResult").toString(); 
        }
        if(searchParams.get("ORGLIKE_path")!=null){
        	search_ORGLIKE_path = searchParams.get("ORGLIKE_path").toString().isEmpty()?null:searchParams.get("ORGLIKE_path").toString(); 
        }
        if(searchParams.get("EQ_focusFlag")!=null){
        	search_EQ_focusFlag = searchParams.get("EQ_focusFlag").toString().isEmpty()?null:searchParams.get("EQ_focusFlag").toString(); 
        }
        if(searchParams.get("EQ_alarmLevel")!=null){
        	search_EQ_alarmLevel = searchParams.get("EQ_alarmLevel").toString().isEmpty()?null:searchParams.get("EQ_alarmLevel").toString(); 
        }
        if(searchParams.get("EQ_isMask")!=null){
        	search_EQ_isMask = searchParams.get("EQ_isMask").toString().isEmpty()?null:searchParams.get("EQ_isMask").toString(); 
        }
        if(searchParams.get("ISNULL_processFlag")!=null){
        	search_ISNULL_processFlag = searchParams.get("ISNULL_processFlag").toString().isEmpty()?null:searchParams.get("ISNULL_processFlag").toString(); 
        }

		OracleConnection conn = null;
		CallableStatement prest = null;
		CallableStatement prest1 = null;
		JSONObject resultObj = new JSONObject();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn, jdbcUser, jdbcPwd);
			String count_sql = "{call pro_alarm_log.pro_alarm_log_counts(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			prest = conn.prepareCall(count_sql);
			prest.setString(1, search_GE_beginTime);
			prest.setString(2, search_LE_beginTime);
			prest.setString(3, search_GE_endTime);
			prest.setString(4, search_LE_endTime);
			prest.setString(5, search_LIKE_alarmType);
			prest.setString(6, search_LIKE_equipmentName);
			prest.setString(7, search_LIKE_name);
			prest.setString(8, search_LIKE_processResult);
			prest.setString(9, search_ORGLIKE_path);
			prest.setString(10, search_EQ_focusFlag);
			prest.setString(11, search_EQ_alarmLevel);
			prest.setString(12, search_EQ_isMask);
			prest.setString(13, search_ISNULL_processFlag);
			prest.registerOutParameter(14, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(14);
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
			String data_sql = "{call  pro_alarm_log.pro_alarm_log_datas(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			prest1 = conn.prepareCall(data_sql);
			prest1.setInt(1, 1);
			prest1.setInt(2, pageNumber);
			prest1.setInt(3, pageSize);
			prest1.setString(4, search_GE_beginTime);
			prest1.setString(5, search_LE_beginTime);
			prest1.setString(6, search_GE_endTime);
			prest1.setString(7, search_LE_endTime);
			prest1.setString(8, search_LIKE_alarmType);
			prest1.setString(9, search_LIKE_equipmentName);
			prest1.setString(10, search_LIKE_name);
			prest1.setString(11, search_LIKE_processResult);
			prest1.setString(12, search_ORGLIKE_path);
			prest1.setString(13, search_EQ_focusFlag);
			prest1.setString(14, search_EQ_alarmLevel);
			prest1.setString(15, search_EQ_isMask);
			prest1.setString(16, search_ISNULL_processFlag);
			prest1.registerOutParameter(17, OracleTypes.CURSOR);

			prest1.execute();
			ResultSet rs1 = (ResultSet) prest1.getObject(17);
			ResultSetMetaData md1 = rs1.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			int columnCount1 = md1.getColumnCount(); // 返回此 ResultSet 对象中的列数
			JSONArray resultArray = new JSONArray();
			while (rs1.next()) {			
				JSONObject dataObj = new JSONObject();
				for (int i = 0; i < columnCount1; i++) {
					
					switch(i){
					case  1:
						dataObj.put("alarmId", rs1.getLong(i+1));
						continue;
					case  2:
						dataObj.put("equipmentId", rs1.getString(i+1));
						continue;
					case  3:
						dataObj.put("propertyName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;	
					case  4:
						dataObj.put("beginTimeStr", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  5:
						dataObj.put("endTimeStr", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  6:
						dataObj.put("alarmLevel", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  7:
						dataObj.put("alarmDesc", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  8:
						dataObj.put("alarmCount", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  9:
						dataObj.put("alarmType", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  10:
						dataObj.put("processFlag", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  11:
						dataObj.put("processUser", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  12:
						dataObj.put("processTimeStr", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  13:
						dataObj.put("processResult", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  14:
						dataObj.put("processDesc", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  15:
						dataObj.put("orginizeName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  16:
						dataObj.put("path", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  17:
						dataObj.put("name", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  18:
						dataObj.put("producer", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  19:
						dataObj.put("moduleName", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  20:
						dataObj.put("equipmentTypeId", rs1.getInt(i+1));
						continue;
					case  21:
					      dataObj.put("equipmentName",  rs1.getString(i+1)==null?"":rs1.getString(i+1) );
						continue;
					case  22:
						dataObj.put("netAddress", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  23:
						dataObj.put("focusFlag", rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  24:
					      dataObj.put("maskTime",  rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  25:
					      dataObj.put("isMask",  rs1.getString(i+1)==null?"":rs1.getString(i+1));
						continue;
					case  26:
					     dataObj.put("propertyValue",  rs1.getString(i+1)==null?"":rs1.getString(i+1));
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
