package com.gosun.example.webservice;

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
		factory.setAddress("http://localhost:8080/vsas/cxf/wstest");
		
		IWSTestService service = (IWSTestService) factory.create();
		String test = service.doTest("webservice client");
		System.out.println(test);
		
	}

}
