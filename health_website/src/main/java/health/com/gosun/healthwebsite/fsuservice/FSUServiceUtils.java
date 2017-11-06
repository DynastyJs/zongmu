package com.gosun.healthwebsite.fsuservice;

import java.net.URL;
import java.util.Map.Entry;

import org.apache.axis.client.Service;

import com.gosun.healthwebsite.entity.DeviceSignalOperation;
import com.sun.corba.se.impl.orbutil.threadpool.TimeoutException;

public class FSUServiceUtils {
	
	/**
	 * 	配置网络设备信息请求的xml报文
	 * @author yrf
	 * @2016年6月13日 上午10:58:14
	 * @param entry
	 * @return
	 */
	public static String getWriteConfigXml(FSUServiceEntry entry)
	{
		if(entry == null)
			return null;
		StringBuilder strb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		strb.append("<Request>");
		strb.append("<PK_Type>");
		//strb.append("<Name>"+entry.getName()+"</Name>");
		strb.append("<Name>SET_NETDEV</Name>");
//		strb.append("<Code>"+entry.getCode()+"</Code>");10033
		strb.append("<Code>10033</Code>");
		strb.append("</PK_Type>");
		strb.append("<Info>");
		strb.append("<FsuId>"+entry.getFsuId()+"</FsuId>");
		strb.append("<FsuCode>"+entry.getFsuCode()+"</FsuCode>");
		strb.append("<chIPList>");
		if(entry.getChIPList() != null && entry.getChIPList().size() >0)
		{
			for(String ip : entry.getChIPList())
			{
				strb.append("<chIP>"+ip+"</chIP>");
			}
		}
		else
		{
			strb.append("<chIP></chIP>");
		}
		strb.append("</chIPList>");
		strb.append("<nMaxPacketLoss>"+entry.getnMaxPacketLoss()+"</nMaxPacketLoss>");
		strb.append("<fMaxRoundTripAvg>"+entry.getfMaxRoundTripAvg()+"</fMaxRoundTripAvg>");
		strb.append("<nFrequ>"+entry.getnFrequ()+"</nFrequ>");
		strb.append("<nTimePeriod>"+entry.getnTimePeriod()+"</nTimePeriod>");
		strb.append("</Info>");
		strb.append("</Request>");
		
		return strb.toString();
	}
	
	/**
	 * 	获取设备信号量请求的xml报文
	 * @author linnan
	 * @return
	 */
	public static String getGetTSemaphoreXml(DeviceSignalOperation dso)
	{
		StringBuilder strb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		strb.append("<Request>");
		strb.append("<PK_Type>");
		strb.append("<Name>GET_DATA</Name>");
		strb.append("<Code>401</Code>");
		strb.append("</PK_Type>");
		strb.append("<Info>");
		strb.append("<FsuId>"+dso.getFsuId()+"</FsuId>");
		strb.append("<FsuCode>"+dso.getFsuId()+"</FsuCode>");
//		strb.append("<Value>");
		strb.append("<DeviceList>");
		strb.append("<Device Id=\""+dso.getC3mDeviceId()+"\" Code =\""+dso.getC3mDeviceId()+"\">");
		for(String signalId:dso.getSignalMap().values()){
			strb.append("<ID>"+signalId+"</ID>");
		}
		strb.append("</Device>");
		strb.append("</DeviceList>");
//		strb.append("</Value>");
		strb.append("</Info>");
		strb.append("</Request>");
		return strb.toString();
	}
	
	/**
	 * 	修改设备信号量请求的xml报文
	 * @author linnan
	 * @return
	 */
	public static String getWriteTSemaphoreXml(DeviceSignalOperation dso)
	{
		StringBuilder strb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		strb.append("<Request>");
		strb.append("<PK_Type>");
		strb.append("<Name>SET_POINT</Name>");
		strb.append("<Code>1001</Code>");
		strb.append("</PK_Type>");
		strb.append("<Info>");
		strb.append("<FsuId>"+dso.getFsuId()+"</FsuId>");
		strb.append("<FsuCode>"+dso.getFsuId()+"</FsuCode>");
		strb.append("<Value>");
		strb.append("<DeviceList>");
		strb.append("<Device Id=\""+dso.getC3mDeviceId()+"\" Code =\""+dso.getC3mDeviceId()+"\">");
		for(Entry<String,String> entry:dso.getSignalMap().entrySet()){
			strb.append("<TSemaphore Type=\"5\" Id=\""+entry.getKey()+"\" MeasuredVal=\"\" SetupVal=\""+entry.getValue()+"\" Status=\"0\"/>");
		}
		strb.append("</Device>");
		strb.append("</DeviceList>");
		strb.append("</Value>");
		strb.append("</Info>");
		strb.append("</Request>");
		return strb.toString();
	}
	
	/**
	 * 	修改监控点门限值请求的xml报文
	 * @author linnan
	 * @return
	 */
	public static String getWriteTThresholdXml(DeviceSignalOperation dso)
	{
		StringBuilder strb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		strb.append("<Request>");
		strb.append("<PK_Type>");
		strb.append("<Name>SET_THRESHOLD</Name>");
		strb.append("<Code>2001</Code>");
		strb.append("</PK_Type>");
		strb.append("<Info>");
		strb.append("<FsuId>"+dso.getFsuId()+"</FsuId>");
		strb.append("<FsuCode>"+dso.getFsuId()+"</FsuCode>");
		strb.append("<Value>");
		strb.append("<DeviceList>");
		strb.append("<Device Id=\""+dso.getC3mDeviceId()+"\" Code = \""+dso.getC3mDeviceId()+"\">");
		strb.append("<TThreshold Type=\"4\" Id=\""+dso.getSignalId()+"\" Threshold=\""+dso.getSetUpValue()+"\" AbsoluteVal=\"null\" RelativeVal=\"null\" Status=\"0\"/>");
		strb.append("</Device>");
		strb.append("</DeviceList>");
		strb.append("</Value>");
		strb.append("</Info>");
		strb.append("</Request>");
		return strb.toString();
	}
	
	/**
	 * 读取网络配置的xml请求报文
	 * @author yrf
	 * @2016年6月13日 上午11:02:46
	 * @param entry
	 * @return
	 */
	public static String getReadConfigXml(FSUServiceEntry entry)
	{
		if(entry == null)
			return null;
		StringBuilder strb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		strb.append("<Request>");
		strb.append("<PK_Type>");
		//strb.append("<Name>"+entry.getName()+"</Name>");
		strb.append("<Name>GET_NETDEV</Name>");
		//strb.append("<Code>"+entry.getCode()+"</Code>");
		strb.append("<Code>10035</Code>");
		strb.append("</PK_Type>");
		strb.append("<Info>");
		strb.append("<FsuId>"+entry.getFsuId()+"</FsuId>");
		strb.append("<FsuCode>"+entry.getFsuCode()+"</FsuCode>");
		strb.append("<chIP>"+entry.getChIP()+"</chIP>");
		strb.append("</Info>");
		strb.append("</Request>");
		
		return strb.toString();
	}
	
	/**
	 * 设备告警信息返回响应xml报文
	 * @author yrf
	 * @2016年6月13日 上午11:07:08
	 * @param entry
	 * @return
	 */
	public static String getAlarmRespXml(FSUServiceEntry entry)
	{
		if(entry == null)
			return null;
		StringBuilder strb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		strb.append("<Request>");
		strb.append("<PK_Type>");
		//strb.append("<Name>"+entry.getName()+"</Name>");
		strb.append("<Name>SEND_NETDEV_ALARM_ACK</Name>");
		strb.append("<Code>10038</Code>");
		strb.append("</PK_Type>");
		strb.append("<Info>");
		strb.append("<Result>"+entry.getRsult()+"</Result>");
		strb.append("</Info>");
		strb.append("</Request>");
		
		return strb.toString();
	}
	
	/**
	 * 发送设置配置报文并返回结果
	 * @author yrf
	 * @2016年6月13日 下午2:04:40
	 * @param ip
	 * @param port
	 * @param entry
	 * @return
	 * @throws Exception 
	 */
	public static String sendWriteConfigRequest(String ip, String port, FSUServiceEntry entry) throws Exception
	{
		try {  
			String strUrl; 
			if(port == null)
				strUrl = "http://"+ip+"/services/FSUService";
			else
				strUrl = "http://"+ip+":"+port+"/services/FSUService";
			 //"http://192.168.16.100:8080/services/FSUService"
		    URL url = new URL(strUrl);  
		    FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
		    fsuService.setTimeout(5000);//5s超时
		    String xmlData = getWriteConfigXml(entry);
		    System.out.println(xmlData);
		    String result = fsuService.invoke(xmlData);  
		    System.out.println(result);  
		    return result;
		} catch (Exception e) {  
			System.out.println(e.getMessage());
			throw new Exception("监测主机连接异常！");
		}
	}
	
	/**
	 * 获取修改设备信号量并返回结果
	 */
	public static String sendGetTSemaphoreRequest(DeviceSignalOperation dso)throws Exception{
		try {  
			String strUrl; 
			if(dso.getFsuPort() == null)
				strUrl = "http://"+dso.getFsuIp()+"/services/FSUService";
			else
				strUrl = "http://"+dso.getFsuIp()+":"+dso.getFsuPort()+"/services/FSUService";
			URL url = new URL(strUrl);  
			FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
			fsuService.setTimeout(10000);//10s超时
			String xmlData = getGetTSemaphoreXml(dso);
//			 String xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Request><PK_Type><Name>GET_DATA</Name><Code>401</Code></PK_Type><Info><FsuID>00010843800001</FsuID><FsuCode>00010843800001</FsuCode><DeviceList><Device Id=\"00010844500001\" Code = \"00010844500001\"><ID>9999999999</ID></Device></DeviceList></Info></Request>";
			System.out.println(xmlData);
			String result = fsuService.invoke(xmlData);  
			System.out.println(result);  
			return result;
		} catch (Exception e) {  
			System.out.println(e.getMessage());
			throw new Exception("监测主机连接异常！");
		}
	}
	
	/**
	 * 发送修改设备信号量并返回结果
	 */
	public static String sendWriteTSemaphoreRequest(DeviceSignalOperation dso)throws Exception{
		try {  
			String strUrl; 
			if(dso.getFsuPort() == null)
				strUrl = "http://"+dso.getFsuIp()+"/services/FSUService";
			else
				strUrl = "http://"+dso.getFsuIp()+":"+dso.getFsuPort()+"/services/FSUService";
		    URL url = new URL(strUrl);  
		    FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
		    fsuService.setTimeout(dso.getSignalMap().size()*10000);//每个信号量8s超时
		    String xmlData = getWriteTSemaphoreXml(dso);
//		    String xmlData ="<?xml version=\"1.0\" encoding=\"UTF-8\"?><Request><PK_Type><Name>SET_POINT</Name><Code>1001</Code></PK_Type><Info><FsuId>00010843800001</FsuId><FsuCode>00010843800001</FsuCode><Value><DeviceList><Device Id=\"00010844500001\" Code=\"00010844500001\"><TSemaphore Type=\"5\" Id=\"0445325001\" MeasuredVal=\"\" SetupVal=\"7\" Status=\"0\"/></Device></DeviceList></Value></Info></Request>";
		    System.out.println(xmlData);
		    String result = fsuService.invoke(xmlData);  
		    System.out.println(result);  
		    return result;
		}catch (Exception e) {  
			System.out.println(e.getMessage());
			throw new Exception(e);
		}
		
	}
	
	/**
	 * 发送修改监控点门限数据并返回结果
	 */
	public static String sendWriteTThresholdRequest(DeviceSignalOperation dso)throws Exception{
		try {  
			String strUrl; 
			if(dso.getFsuPort() == null)
				strUrl = "http://"+dso.getFsuIp()+"/services/FSUService";
			else
				strUrl = "http://"+dso.getFsuIp()+":"+dso.getFsuPort()+"/services/FSUService";
			URL url = new URL(strUrl);  
			FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
			fsuService.setTimeout(10000);//10s超时
			String xmlData = getWriteTThresholdXml(dso);
			System.out.println(xmlData);
			String result = fsuService.invoke(xmlData);  
			System.out.println(result);  
			return result;
		} catch (Exception e) {  
			System.out.println(e.getMessage());
			throw new Exception("监测主机连接异常！");
		}
	}
	
	/**
	 * 发送读取配置信息报文请求
	 * @author yrf
	 * @2016年6月13日 下午2:07:35
	 * @param ip
	 * @param port
	 * @param entry
	 * @return
	 */
	public static String sendReadConfigRequest(String ip, String port, FSUServiceEntry entry)
	{
		try {  
			String strUrl; 
			if(port == null)
				strUrl = "http://"+ip+"/services/FSUService";
			else
				strUrl = "http://"+ip+":"+port+"/services/FSUService";
			//"http://192.168.16.100:8080/services/FSUService"
		    URL url = new URL(strUrl);  
		    FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
		    String xmlData = getReadConfigXml(entry);
		    String result = fsuService.invoke(xmlData);  
		    //System.out.println(result);  
		    return result;
		} catch (Exception e) {  
			e.printStackTrace();
			System.out.println(e.getMessage());
			return null;
		}
	}
	/**
	 * 发送告警信息响应报文
	 * @author yrf
	 * @2016年6月13日 下午2:09:43
	 * @param ip
	 * @param port
	 * @param entry
	 * @return
	 */
	public static String sendAlarmResponse(String ip, String port, FSUServiceEntry entry)
	{
		try {  
			String strUrl; 
			if(port == null)
				strUrl = "http://"+ip+"/services/FSUService";
			else
				strUrl = "http://"+ip+":"+port+"/services/FSUService";
			//"http://192.168.16.100:8080/services/FSUService"
		    URL url = new URL(strUrl);  
		    FSUServiceSoapBindingStub fsuService = new FSUServiceSoapBindingStub(url,new Service());
		    String xmlData = getReadConfigXml(entry);
		    String result = fsuService.invoke(xmlData);  
		    //System.out.println(result);  
		    return result;
		} catch (Exception e) {  
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public static void main(String[] agrs)
	{
		//String ip = "192.168.16.100";
		String ip = "192.168.30.127";
		String port = "8080";
		FSUServiceEntry fsu = new FSUServiceEntry();
		fsu.setCode("10033");
		fsu.setFsuId("00121633800082");
		fsu.setFsuCode("00121633800082");
		//FSUServiceUtils fsuService = new FSUServiceUtils();
		String result = sendReadConfigRequest(ip, port, fsu);
		System.out.println(result);
		System.out.println("end");
	}
}
