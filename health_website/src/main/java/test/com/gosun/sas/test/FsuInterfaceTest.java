/**
 * Project Name:health_website
 * File Name:FsuInterfaceTest.java
 * Package Name:com.gosun.sas.test
 * Date:2017年5月10日上午10:49:02
 * Copyright (c) 2017
 *
 */

package com.gosun.sas.test;

import java.net.MalformedURLException;
import java.net.URL;
import java.rmi.RemoteException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.axis.AxisFault;
import org.apache.axis.client.Service;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gosun.healthwebsite.fsuservice.FSUServiceSoapBindingStub;

/**
 * ClassName:FsuInterfaceTest <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2017年5月10日 上午10:49:02 <br/>
 * 
 * @author lisa
 * @version
 * @see
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:META-INF/applicationContext.xml")
public class FsuInterfaceTest {

	// @Test
	// public void testGetData() throws RemoteException, MalformedURLException {
	// String result = null;
	// String strUrl = "http://192.168.39.143:8080/services/FSUService";
	// // "http://192.168.16.100:8080/services/FSUService"
	// URL url = null;
	// try {
	// url = new URL(strUrl);
	// FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(
	// url, new Service());
	//
	// fsuService.setTimeout(5000);// 5s超时
	//
	// String xmlData =
	// "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Request><PK_Type><Name>GET_DATA</Name><Code>401</Code></PK_Type><Info><FsuID>00010843800001</FsuID><FsuCode>00010843800001</FsuCode><DeviceList><Device Id=\"00010844500001\" Code = \"00010844500001\"><ID>9999999999</ID></Device></DeviceList></Info></Request>";
	// System.out.println(xmlData);
	// result = fsuService.invoke(xmlData);
	// System.out.println(result);
	// } catch (AxisFault e) {
	//
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	//
	// }
	// }

	@SuppressWarnings("unchecked")
	@Test
	public void testSetThresold() throws RemoteException,
			MalformedURLException, InterruptedException {

		// list.put("0445336001");
		// list.put("0445338001");
		// list.put("0445337001");
		// list.put("0445339001");
		String result = null;
		String strUrl = "http://192.168.39.143:8080/services/FSUService";
		// "http://192.168.16.100:8080/services/FSUService"
		URL url = null;
		HashMap<String, String> map = new HashMap<String, String>();

		// 下面设置失败
//		 map.put("0445335001","1463846400");//日期时间
//		 map.put("0445344001","2");//欠压报警时间
//		 map.put("0445345001","110");//过流报警值
//		 map.put("0445346001","2");//过流报警时间
//
//		// 下面设置有问题，设置一个其他几个都变成一样的了，其他的都可以设置了
		 map.put("0445313001","0");//漏电检测保护开关
		 map.put("0445318001","1");//A相线路检测保护开关
		 map.put("0445323001","0");//B相线路检测保护开关
		 map.put("0445328001","1");//C相线路检测保护开关
		 map.put("0445333001", "1");//零线线路检测保护开关
//
//		// 下面正常设置
//		 map.put("0445340001","1"); //密码
//		map.put("0445310001", "4");// 漏电检测保护设定值
//		map.put("0445311001", "4");// 漏电检测保护延时
//		map.put("0445312001", "4");// 漏电检测保护设定值%
//		map.put("0445315001", "5");// A相线路检测保护设定值
//		map.put("0445316001", "5");// A相线路检测保护延时
//		map.put("0445317001", "5");// A相线路检测保护设定值%
//		map.put("0445320001", "6");// B相线路检测保护设定值
//		map.put("0445321001", "6");// B相线路检测保护延时
//		map.put("0445322001", "6");// B相线路检测保护设定值%
//		map.put("0445325001", "7");// C相线路检测保护设定值
//		map.put("0445326001", "7");// C相线路检测保护延时
//		map.put("0445327001", "7");// C相线路检测保护设定值%
//		map.put("0445330001", "8");// 零线线路检测保护设定值
//		map.put("0445331001", "8");// 零线线路检测保护延时
//		map.put("0445332001", "8");// 零线线路检测保护设定值%
//		map.put("0445341001", "110");// 过压报警值
//		map.put("0445342001", "0.1");// 过压报警时间
//		map.put("0445343001", "50");// 欠压报警值
//		map.put("0445314001", "1");// 漏电检测清除报警
//		map.put("0445319001", "1");// A相线路检测清除报警
//		map.put("0445324001", "1");// B相线路检测清除报警
//		map.put("0445329001", "1");// C相线路检测清除报警
//		map.put("0445334001", "1");// 零线线路检测清除报警

		try {
			url = new URL(strUrl);
			FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(
					url, new Service());

			fsuService.setTimeout(8*map.size()*1000);// 5s超时 按照没有最多8秒的超时时间计算  8*记录数

			int i = 1;
			Date date1 = new Date();

			// Thread.sleep(60000);

			String xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Request><PK_Type><Name>SET_POINT</Name><Code>1001</Code></PK_Type><Info><FsuId>00010843800001</FsuId><FsuCode>00010843800001</FsuCode><Value><DeviceList><Device Id=\"00010844500002\" Code=\"00010844500002\">";
			for (Map.Entry<String, String> entry : map.entrySet()) {
				String key = entry.getKey();
				String value = entry.getValue();
				xmlData += "<TSemaphore Type=\"5\" Id=\"" + key
						+ "\" MeasuredVal=\"\" SetupVal=\"" + value
						+ "\" Status=\"0\"/>";
			}
			xmlData += "</Device></DeviceList></Value></Info></Request>";
			// System.out.println("第"+i+"条记录");
			System.out.println(xmlData);
			result = fsuService.invoke(xmlData);
			System.out.println(result);
			// i++;
			// Thread.sleep(10000);
			//
			// String xmlData1 =
			// "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Request><PK_Type><Name>GET_DATA</Name><Code>401</Code></PK_Type><Info><FsuID>00010843800001</FsuID><FsuCode>00010843800001</FsuCode><DeviceList><Device Id=\"00010844500001\" Code = \"00010844500001\"><ID>"+list.get(i)+"</ID></Device></DeviceList></Info></Request>";
			// System.out.println(xmlData1);
			// String result1 = fsuService.invoke(xmlData1);
			// Thread.sleep(10000);
			// Document xmlDoc=null;
			// try {
			// xmlDoc = DocumentHelper.parseText(result1);
			// } catch (DocumentException e1) {
			//
			// // TODO Auto-generated catch block
			// e1.printStackTrace();
			//
			// }
			// Node infoNode = xmlDoc.selectSingleNode("//Response/Info");
			// List<Node> lstSignaldataNode =
			// infoNode.selectNodes("Values/DeviceList/Device/TSemaphore");
			// for(int index=0; index<lstSignaldataNode.size(); index++) {
			// Element e = (Element)lstSignaldataNode.get(index);
			// String measuredVal = e.attributeValue("MeasuredVal");
			// if(!measuredVal.equals("2")){
			// aa+=list.get(i)+",";
			// }
			// }
			// System.out.println("========="+result1);
			Date date2 = new Date();
			System.out.println("总 耗时：===" + (date2.getTime() - date1.getTime())
					/ 1000);
		} catch (AxisFault e) {

			// TODO Auto-generated catch block
			e.printStackTrace();

		}
	}

}
