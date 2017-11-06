package com.gosun.healthwebsite.repository;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import oracle.jdbc.OracleConnection;
import oracle.jdbc.driver.OracleTypes;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.gosun.healthwebsite.model.FalutTrendData;
import com.gosun.healthwebsite.model.FaultTrendColumnData;
import com.gosun.healthwebsite.model.RealTimeFalutData;
import com.gosun.healthwebsite.model.UntreatedAlarmData;

@Repository
public class UISysDevStatusDaoImpl {
	@PersistenceContext
	EntityManager em;
	@Value("${jdbc.url}")
	private String jdbcConn;
	@Value("${jdbc.username}")
	private String jdbcUser;
	@Value("${jdbc.password}")
	private String jdbcPwd;
	
	//实时设备数量及故障率
	public List<RealTimeFalutData> getRealFaultDate(Integer orgId,String type,String typeName){
		OracleConnection conn = null;
		CallableStatement prest = null;
		List<RealTimeFalutData> data = new ArrayList<RealTimeFalutData>();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String sql = "{call pro_screen_realtime_fault(?,?,?,?)}";
			prest = conn.prepareCall(sql);
			prest.setInt(1, orgId);
			prest.setString(2, type);
			prest.setString(3, typeName);
			prest.registerOutParameter(4, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(4);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			while (rs.next()) {
				RealTimeFalutData obj = new RealTimeFalutData();
				obj.setOrgid(Integer.valueOf(rs.getObject(1).toString()));
				obj.setOrgName(rs.getObject(2).toString());
				obj.setFaultCount(rs.getObject(3)!=null?Integer.valueOf(rs.getObject(3).toString()):0);
				obj.setDeviceCount(rs.getObject(4)!=null?Integer.valueOf(rs.getObject(4).toString()):0);
				data.add(obj);
			}
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
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}

		}

		return data;
	}
	
	public List<Object> getRealFaultCount(String orgs){
		StringBuffer sql = new StringBuffer();
		sql.append("select count(*),t.ORG_ID from VIEW_UI_SYSDEV_STATUS t ");
		sql.append("where 1=1 ");
		sql.append("and t.ORG_ID in("+orgs+") group by t.ORG_ID");
		Query q = em.createNativeQuery(sql.toString());
		List<Object> list = q.getResultList();
        return list;
	}
	
	//故障趋势图
	public List<FalutTrendData> getFalutThrendCount(Integer orgId,String typeName){
		OracleConnection conn = null;
		CallableStatement prest = null;
		List<FalutTrendData> data = new ArrayList<FalutTrendData>();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String sql = "{call pro_screen_fault_trend(?,?,?)}";
			prest = conn.prepareCall(sql);
			prest.setInt(1, orgId);
			prest.setString(2, typeName);
			prest.registerOutParameter(3, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(3);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			while (rs.next()) {
				FalutTrendData obj = new FalutTrendData();
				obj.setMonth(Integer.valueOf(rs.getObject(1).toString()));
				obj.setCount(Integer.valueOf(rs.getObject(2).toString()));
				data.add(obj);
			}
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
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}

		}

		return data;
	}
	
	//未处理报警数量
	public List<UntreatedAlarmData> getUntreatedAlarmData(Integer orgId,String typeName){
		OracleConnection conn = null;
		CallableStatement prest = null;
		List<UntreatedAlarmData> data = new ArrayList<UntreatedAlarmData>();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String sql = "{call pro_screen_dealorundeal_alarm(?,?,?)}";
			prest = conn.prepareCall(sql);
			prest.setInt(1, orgId);
			prest.setString(2, typeName);
			prest.registerOutParameter(3, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(3);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			while (rs.next()) {
				UntreatedAlarmData obj = new UntreatedAlarmData();
				obj.setLevel(rs.getObject(1).toString());
				obj.setAllAlarm(Integer.valueOf(rs.getObject(2).toString()));
				obj.setUntreatedAlarm(Integer.valueOf(rs.getObject(3).toString()));
				data.add(obj);
			}
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
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}

		}

		return data;
	}
	
	//处理中报警数量
	public List<UntreatedAlarmData> getProcessingAlarmData(Integer orgId,String typeName){
		OracleConnection conn = null;
		CallableStatement prest = null;
		List<UntreatedAlarmData> data = new ArrayList<UntreatedAlarmData>();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String sql = "{call pro_screen_dealorundeal_alarm(?,?,?)}";
			prest = conn.prepareCall(sql);
			prest.setInt(1, orgId);
			prest.setString(2, typeName);
			prest.registerOutParameter(3, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(3);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			while (rs.next()) {
				UntreatedAlarmData obj = new UntreatedAlarmData();
				obj.setLevel(rs.getObject(1).toString());
				obj.setAllAlarm(Integer.valueOf(rs.getObject(2).toString()));
				obj.setUntreatedAlarm(Integer.valueOf(rs.getObject(4).toString()));
				data.add(obj);
			}
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
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}

		}

		return data;
	}
	
	//所有报警
	public List<Object> getAllAlarmData(String orgs,String type){
		StringBuffer sql = new StringBuffer();
		sql.append("select count(t.DATA_ID),t.ALARM_LEVEL from VIEW_UI_ALARMEVENT t ");
		sql.append("where t.org_id in("+orgs+") ");
		sql.append("and t.ALARM_TYPE like '%"+type+"%'group by t.ALARM_LEVEL ");
		Query q = em.createNativeQuery(sql.toString());
		List<Object> list = q.getResultList();
        return list;
	}
	
	//故障趋势柱状图
	public List<FaultTrendColumnData>  getFaultTrendColumnData(Integer orgId,String beginTime){
		OracleConnection conn = null;
		CallableStatement prest = null;
		List<FaultTrendColumnData> data = new ArrayList<FaultTrendColumnData>();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String sql = "{call pro_screen_fault_columdata(?,?,?)}";
			prest = conn.prepareCall(sql);
			prest.setInt(1, orgId);
			prest.setString(2, beginTime);
			prest.registerOutParameter(3, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(3);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			while (rs.next()) {
				FaultTrendColumnData obj = new FaultTrendColumnData();
				obj.setType(rs.getObject(1).toString());
				obj.setCount(Integer.valueOf(rs.getObject(2).toString()));
				data.add(obj);
			}
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
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}

		}
		return data;
	}
	//故障趋势柱状图
}
