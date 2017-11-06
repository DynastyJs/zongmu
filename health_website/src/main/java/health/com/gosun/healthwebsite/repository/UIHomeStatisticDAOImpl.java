package com.gosun.healthwebsite.repository;

// Generated 2016-5-18 9:19:52 by Hibernate Tools 3.6.0.Final

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

@Repository
public class UIHomeStatisticDAOImpl {
	@PersistenceContext
	EntityManager em;

	@Value("${jdbc.url}")
	private String jdbcConn;
	@Value("${jdbc.username}")
	private String jdbcUser;
	@Value("${jdbc.password}")
	private String jdbcPwd;

	public List getProcedure(String proName,String orgId) {

		OracleConnection conn = null;
		CallableStatement prest = null;
		List list = new ArrayList();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = (OracleConnection) DriverManager.getConnection(jdbcConn,
					jdbcUser, jdbcPwd);
			String sql = "{call "+proName+"(?,?)}";
			prest = conn.prepareCall(sql);
			prest.setString(1, orgId);
			prest.registerOutParameter(2, OracleTypes.CURSOR);

			prest.execute();
			ResultSet rs = (ResultSet) prest.getObject(2);
			ResultSetMetaData md = rs.getMetaData(); // 得到结果集(rs)的结构信息，比如字段数、字段名等
			int columnCount = md.getColumnCount(); // 返回此 ResultSet 对象中的列数
			while (rs.next()) {
				String[] rowData = new String[3]; 
				for (int i = 0; i < columnCount; i++) {
					rowData[i]=rs.getObject(i+1).toString();
				}
				list.add(rowData);
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

		return list;
	}

	/**
	 * 
	 * getHomeNetStatusData:(获取首页网络状态). <br/>
	 * 
	 * @author lisa
	 * @param orgId
	 * @return
	 */
//	public List getHomeNetStatusData(String orgId) {
//		StringBuffer sql = new StringBuffer();
//		// sql.append(" select t.EQUIPMENT_TYPE_NAME, sum(case when t.NET_STATUS = '正常' or t.NET_STATUS = '在线' then 1 else 0 end) AS ON_LINE,");
//		// sql.append("sum(case when (t.NET_STATUS = '异常' or t.NET_STATUS = '中断' or t.NET_STATUS = '离线') then 1 else 0 end) AS OFF_LINE "
//		// );
//		// sql.append("  select NET_GROUP_TYPE,abnormal,(case when NET_GROUP_TYPE = '服务器/PC网络状态' then");
//		// sql.append(" (select count(e.equipment_id)-abnormal from sys_equipment e where e.is_deleted=0 and e.equipment_type_id in (select s.equipment_type_id from sys_equipment_type s where s.groupid = 1) and e.path like '%#"+orgId+"#%')");
//		// sql.append(" else normal end) as normal from (");
//		sql.append(" select v2.NET_GROUP_TYPE,sum(num1)as abnormal,sum(num) as normal");
//		sql.append(" from (select V1.EQUIPMENT_ID, V1.NET_GROUP_TYPE,");
//		sql.append(" max(case when v1.ALARMEVENT_VIEW_ID is null then 1 else 0 end) AS NUM,");
//		sql.append(" max(case when v1.ALARMEVENT_VIEW_ID is not null then 1 else 0 end) AS NUM1");
//		sql.append(" from VIEW_UI_SYSDEV_STATUS V1");
//		sql.append(" where V1.NET_GROUP_TYPE != '-1'");
//		if (!orgId.equals("")) {
//			sql.append(" AND V1.PATH like '%#" + orgId + "#%' ");
//		}
//		sql.append(" group by V1.EQUIPMENT_ID, V1.NET_GROUP_TYPE) V2");
//		sql.append(" group by v2.NET_GROUP_TYPE");
//		Query q = em.createNativeQuery(sql.toString());
//		List<?> list = q.getResultList();
//		return list;
//	}

	/**
	 * 
	 * getHomeEquStatusData:(获取首页设备状态). <br/>
	 * TODO(这里描述这个方法适用条件 – 可选).<br/>
	 * TODO(这里描述这个方法的执行流程 – 可选).<br/>
	 * TODO(这里描述这个方法的使用方法 – 可选).<br/>
	 * TODO(注意:视频质量诊断只有异常的通道，正常的通道是没有状态数据，所以特殊处理).<br/>
	 *
	 * @author lisa
	 * @param orgId
	 * @return
	 */
	public List getHomeEquStatusData(String orgId) {
		StringBuffer sql = new StringBuffer();
		// sql.append("select t.EQUIPMENT_TYPE_NAME, sum(case when (t.HAS_ALARM IS NULL) then 1 else 0 end) AS NORMAL,");
		// sql.append("sum(case when (t.HAS_ALARM = 1) then 1 else 0 end) AS ABNORMAL "
		// );
		sql.append("  select ERROR_GROUP_TYPE,abnormal,(case when ERROR_GROUP_TYPE = '服务器/PC资源状态' then");
		sql.append(" (select count(e.equipment_id)-abnormal from sys_equipment e where e.is_deleted=0 and e.equipment_type_id in (select s.equipment_type_id from sys_equipment_type s where s.groupid = 1) and e.path like '%#"
				+ orgId + "#%')");
		sql.append(" else normal end) as normal from (");

		sql.append(" select v2.ERROR_GROUP_TYPE,sum(num1)as abnormal, sum(num) as normal");
		sql.append(" from (select V1.EQUIPMENT_ID, V1.ERROR_GROUP_TYPE,");
		sql.append(" min(case when v1.ALARMEVENT_VIEW_ID is null then 1 else 0 end) AS NUM,");
		sql.append(" max(case when v1.ALARMEVENT_VIEW_ID is not null then 1 else 0 end) AS NUM1");
		sql.append(" from VIEW_UI_SYSDEV_STATUS V1");
		sql.append(" where V1.ERROR_GROUP_TYPE != '-1'");
		if (!orgId.equals("")) {
			sql.append(" AND V1.PATH like '%#" + orgId + "#%' ");
		}
		sql.append(" group by V1.EQUIPMENT_ID, V1.ERROR_GROUP_TYPE) V2");
		sql.append(" group by v2.ERROR_GROUP_TYPE )");
		Query q = em.createNativeQuery(sql.toString());
		List<?> list = q.getResultList();
		return list;
	}

	/**
	 * 
	 * getHomeRingStatusData:(获取动环监控数据). <br/>
	 * TODO(这里描述这个方法适用条件 – 可选).<br/>
	 * TODO(这里描述这个方法的执行流程 – 可选).<br/>
	 * TODO(这里描述这个方法的使用方法 – 可选).<br/>
	 * TODO(温湿度监测包括环境温度、环境湿度，避免重复统计特殊处理).<br/>
	 *
	 * @author lisa
	 * @param orgId
	 * @return
	 */
	public List getHomeRingStatusData(String orgId) {
		StringBuffer sql = new StringBuffer();
		sql.append("select RING_GROUP_TYPE,abnormal,(case when RING_GROUP_TYPE = '温湿度监测' then (select count(*) - abnormal ");
		sql.append("    from (select distinct (s.EQUIPMENT_ID) ");
		sql.append("            from VIEW_UI_SYSDEV_STATUS s");
		sql.append("           where s.PROPERTY_NAME in ('环境温度', '环境湿度')");
		sql.append("             and s.path like '%#" + orgId + "#%')) ");
		sql.append("            when RING_GROUP_TYPE = 'UPS工作状态' then ");
		sql.append("             (select count(*) - abnormal ");
		sql.append("             from (select distinct (s.EQUIPMENT_ID) ");
		sql.append("              from VIEW_UI_SYSDEV_STATUS s ");
		sql.append("            where s.PROPERTY_NAME like 'UPS%' and s.PROPERTY_NAME!='UPS通信状态告警' ");
		sql.append("            and s.path like '%#" + orgId + "#%')) ");
		sql.append("            when RING_GROUP_TYPE = '市电供应' then ");
		sql.append("             (select count(*) - abnormal ");
		sql.append("             from (select distinct (s.EQUIPMENT_ID) ");
		sql.append("              from VIEW_UI_SYSDEV_STATUS s ");
		sql.append("            where s.PROPERTY_NAME in ('交流输入停电告警', '交流电压过高告警','交流电压过低告警','智能电表通信中断告警') ");
		sql.append("            and s.path like '%#" + orgId + "#%')) ");
		sql.append("            when RING_GROUP_TYPE = 'DI输入报警' then ");
		sql.append("             (select count(*) - abnormal ");
		sql.append("             from (select distinct (s.EQUIPMENT_ID) ");
		sql.append("              from VIEW_UI_SYSDEV_STATUS s ");
		sql.append("            where s.PROPERTY_NAME in ('烟雾告警','水浸告警','红外告警','门磁开关状态') ");
		sql.append("            and s.path like '%#" + orgId + "#%')) ");
		sql.append("            when RING_GROUP_TYPE = '电气火灾监测' then ");
		sql.append("             (select count(*) - abnormal ");
		sql.append("             from (select distinct (s.EQUIPMENT_ID) ");
		sql.append("              from VIEW_UI_SYSDEV_STATUS s ");
		sql.append("            where s.PROPERTY_NAME in ('电压欠压告警','电压过压告警','电流过流告警',");
		sql.append(" '火灾探测器通信告警','漏电短路检测器断线告警','漏电短路检测器短路告警',");
		sql.append(" '漏电短路检测器告警状态', 'A相线路温度检测器断线告警','A相线路温度检测器短路告警',");
		sql.append(" 'B相线路温度检测器断线告警','B相线路温度检测器短路告警','C相线路温度检测器断线告警',");
		sql.append(" 'C相线路温度检测器短路告警','A相线路温度检测器告警状态','B相线路温度检测器告警状态',");
		sql.append(" 'C相线路温度检测器告警状态','零线线路温度检测器断线告警','零线线路温度检测器短路告警','零线线路温度检测器告警状态') ");
		sql.append("            and s.path like '%#" + orgId + "#%')) ");
		sql.append("		  else normal end) as normal   from  (");

		sql.append(" select v2.RING_GROUP_TYPE, sum(num1)as abnormal,sum(num) as normal");
		sql.append(" from (select V1.EQUIPMENT_ID, V1.RING_GROUP_TYPE,");
		sql.append(" max(case when v1.ALARMEVENT_VIEW_ID is null then 1 else 0 end) AS NUM,");
		sql.append(" max(case when v1.ALARMEVENT_VIEW_ID is not null then 1 else 0 end) AS NUM1");
		sql.append(" from VIEW_UI_SYSDEV_STATUS V1");
		sql.append(" where V1.RING_GROUP_TYPE != '-1'");
		if (!orgId.equals("")) {
			sql.append(" AND V1.PATH like '%#" + orgId + "#%' ");
		}
		sql.append(" group by V1.EQUIPMENT_ID, V1.RING_GROUP_TYPE) V2");
		sql.append(" group by v2.RING_GROUP_TYPE)");
		Query q = em.createNativeQuery(sql.toString());
		List<?> list = q.getResultList();
		return list;
	}

	/**
	 * 
	 * @Title: getHasDataEquType
	 * @Description: 获取设备信息表的设备分类
	 * @param @param orgId
	 * @param @return
	 * @return List
	 * @throws
	 */
	public List getHasDataEquType(String orgId) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from sys_equipment_type s where exists ( ");
		sql.append(" select distinct(t.equipment_type_id) ");
		sql.append("  from SYS_EQUIPMENT t, pscp.tb_v2_organize o  where t.org_id = o.organize_id and s.equipment_type_id = t.equipment_type_id");
		if (!orgId.equals("")) {
			sql.append(" and o.PATH like '%#" + orgId + "#%' ");
		}
		sql.append(" ) ");
		Query q = em.createNativeQuery(sql.toString());
		List<?> list = q.getResultList();
		return list;
	}

	public List getAllSysEquProperties() {
		StringBuffer sql = new StringBuffer();
		sql.append(" select property_name from SYS_EQUIPMENT_PROPERTY where status !=1");
		Query q = em.createNativeQuery(sql.toString());
		List<?> list = q.getResultList();
		return list;
	}

	public List getAllOrgTreeByOrgId(int orgId) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from PSCP.TB_V2_ORGANIZE t where t.path like '%#"
				+ orgId + "#%' ");
		Query q = em.createNativeQuery(sql.toString());
		List<?> list = q.getResultList();
		return list;
	}

}
