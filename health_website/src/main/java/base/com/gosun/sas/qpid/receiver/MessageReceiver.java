package com.gosun.sas.qpid.receiver;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.BytesMessage;

import net.sf.json.JSONArray;

import org.apache.qpid.client.AMQDestination;
import org.apache.qpid.client.AMQAnyDestination;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;

import com.gosun.core.utils.SystemConfig;


/**
 * 权限修改消息接收
 * @author yaoxiangping
 *
 */
public class MessageReceiver implements MessageListener {

	@Autowired
	private JmsTemplate jmsTemplate;
	
	
    private static Logger log = LoggerFactory.getLogger(MessageReceiver.class);
    @Override
    public void onMessage(Message message) {
    	System.out.println("从消息总线中获取到处理消息!");
    	String reply = null;
    	String sn = "";
    	try {
    		reply =((AMQDestination)message.getJMSReplyTo()).getSubject();
    		sn =message.getJMSCorrelationID();
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	BytesMessage msg = (BytesMessage)message;
    	byte[] b = new byte[1024];  
	    int len = -1;  
	    String str = "";
	    try {
			while((len=msg.readBytes(b,1024))!=-1){  
				String s = new String(b, 0, len);
				str += s;
			}
	    }catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    JSONObject obj = null;
	    try {
			obj = new JSONObject(str);
		} catch (JSONException e2) {
			e2.printStackTrace();
		}
	    
	    final JSONObject response = new JSONObject();
	    try {
			if(obj.getString("cpgsascmd").equals("cpgsasgetdbinfo")){
				response.put("cpgsascmd", "cpgsasgetdbinfo");
				response.put("cpgsasversion", obj.getString("cpgsasversion"));
				response.put("cpgsassn", obj.getString("cpgsassn"));
				response.put("cpgsasmsgtype", "response");
				response.put("cpgsaserrcode", 0);
				response.put("cpgsaserrmsg", "");
				JSONObject o = new JSONObject();
				o.put("szip", SystemConfig.getSystemConfig().getProperty("jdbc.ip"));
				o.put("szport", SystemConfig.getSystemConfig().getProperty("jdbc.port"));
				o.put("szdatabase", SystemConfig.getSystemConfig().getProperty("jdbc.database"));
				o.put("szuser", SystemConfig.getSystemConfig().getProperty("jdbc.username"));
				o.put("szpwd", SystemConfig.getSystemConfig().getProperty("jdbc.password"));
				if(SystemConfig.getSystemConfig().getProperty("jdbc.type").equals("mysql")){
					o.put("ndbtype", 2);
				}else{
					o.put("ndbtype", 1);
				}
				response.put("cpgsasdbinfo", o);
			}else if(obj.getString("cpgsascmd").equals("cpgsasgetdevtree")){
				response.put("cpgsascmd", "cpgsasgetdevtree");
				response.put("cpgsasversion", obj.getString("cpgsasversion"));
				response.put("cpgsassn", obj.getString("cpgsassn"));
				response.put("cpgsasmsgtype", "response");
				response.put("cpgsaserrcode", 0);
				response.put("cpgsaserrmsg", "");
				response.put("devinfolist", "");
			}else{
				System.out.println("未找到相关的消息处理命令!："+obj.getString("cpgsascmd"));
				return ;
			}
		} catch (JSONException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	    
	    AMQDestination destination = new AMQAnyDestination();
	    try {
			destination.setDestinationString("ADDR:GoCloud/"+reply);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	    final String snnum = sn;
	    jmsTemplate.send(destination, new MessageCreator(){

			@Override
			public Message createMessage(Session session) throws JMSException {
				BytesMessage bm = session.createBytesMessage();
				bm.setJMSCorrelationID(snnum);
              try {
                  bm.writeBytes(response.toString().getBytes(SystemConfig.getSystemConfig().getProperty("system.communication.charset")));
              } 
              catch (UnsupportedEncodingException e) {
                  e.printStackTrace();
              }
              return bm;
			}
	    	
	    });
    	
    }
    
    

}
