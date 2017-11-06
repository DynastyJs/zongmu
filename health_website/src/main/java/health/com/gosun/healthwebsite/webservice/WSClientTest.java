package com.gosun.healthwebsite.webservice;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class WSClientTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*ApplicationContext ctx = new ClassPathXmlApplicationContext("/META-INF/applicationContext-client.xml");
	        
		IWSTestService service = ctx.getBean("wstestClient", IWSTestService.class);
	    String test = service.doTest("do webservice");
		System.out.println(test);*/
	    
		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
		factory.setServiceClass(IWSTestService.class); 
		factory.setAddress("http://192.168.16.100:8080/services/FSUService");
		
		IWSTestService service = (IWSTestService) factory.create();
		String test = service.invoke("<?xml version=“1.0” encoding=“UTF-8”?>" +
				"<Request>" +
					"<PK_Type>" +
					"		<Name>GET_NETDEV</Name>" +
					"       <Code>10033</Code>" +
					"</PK_Type>" +
					"<Info>" +
						"<FsuId/></FsuId>" +
						"<FsuCode/></FsuCode>" +
						"<chIP/></chIP>" +
					"</Info>" +
				"</Request>");
		System.out.println(test);
		
	}

}
