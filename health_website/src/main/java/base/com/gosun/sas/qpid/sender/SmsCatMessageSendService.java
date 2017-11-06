package com.gosun.sas.qpid.sender;

import java.util.List;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public class SmsCatMessageSendService{
//	@Autowired
//	private JmsTemplate jmsTemplate;
//	
//	@Autowired private AMQAnyDestination smsCatMessageDestination;

	public void sendSmsMessage(List<String> phoneNumList,String message) throws JSONException {
////	    AMQDestination destination = (AMQDestination) SpringContextUtils.getApplicationContext().getBean("smsCatMessageDestination");
//		final JSONObject smsJson = new JSONObject();
//		String phoneStr = "";
//		for(String phoneNum : phoneNumList){
//		    phoneStr += phoneNum+",";
//		}
//		smsJson.put("SendNumber", phoneStr);
//		smsJson.put("SendContent", message);
//	    
//	    jmsTemplate.send(smsCatMessageDestination, new MessageCreator() {
//			@Override
//			public Message createMessage(Session session) throws JMSException {
//                BytesMessage bm = session.createBytesMessage();
//                try {
////                    String iso = new String(txt.getBytes("GBK"), "ISO-8859-1");
//                    bm.writeBytes(smsJson.toString().getBytes(SystemConfig.getSystemConfig().getProperty("system.communication.charset")));
////                    System.out.println(json);
//                } 
//                catch (UnsupportedEncodingException e) {
//                    e.printStackTrace();
//                }
//                return bm;
//            }
//		});
	}

}
