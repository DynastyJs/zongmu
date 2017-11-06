package com.gosun.sas.qpid.sender;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.jms.BytesMessage;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.xml.stream.XMLStreamWriter;

import org.apache.qpid.client.AMQAnyDestination;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import com.gosun.core.utils.SystemConfig;
import com.gosun.sas.utils.UserUtil;

@Service
public class NoticeMessageSendService{
	@Autowired
	private JmsTemplate jmsTemplate;
//	
	@Autowired private AMQAnyDestination noticeMessageDestination;
	
	public void sendMessage(String action,Long taskId,String userName) throws JSONException {
		final StringBuffer str = new StringBuffer();
		str.append("<?xml version=\"1.0\" encoding=\"GB2312\" ?>");
		str.append("<Message Ver=\"1.0.1\" Sn=\"1\" Cmd=\"VFRAnalysis\" Type=\"Request\"/>");
		str.append( " <Task ID=\""+taskId+"\" Action=\""+action+"\"/>");
		str.append("<UserData>"+userName+"</UserData>");
		
		System.out.println("向CMS发送命令,action:"+action+",taskId:"+taskId);
		jmsTemplate.send(noticeMessageDestination, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
                BytesMessage bm = session.createBytesMessage();
                try {
                    bm.writeBytes(str.toString().getBytes(SystemConfig.getSystemConfig().getProperty("system.communication.charset")));
                } 
                catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                return bm;
            }
		});
	}
	
	public void sendMessage(String action,String ids,String userName) throws JSONException {
		final StringBuffer str = new StringBuffer();
		str.append("<?xml version=\"1.0\" encoding=\"GB2312\" ?>");
		str.append("<Message Ver=\"1.0.1\" Sn=\"1\" Cmd=\"VFRAnalysis\" Type=\"Request\"/>");
		if(ids.indexOf(",")>0){
			String arr[] = ids.split(",");
			for(String idstr : arr){
				str.append( " <Task ID=\""+idstr+"\" Action=\""+action+"\"/></Task>");
			}
		}else{
			str.append( " <Task ID=\""+ids+"\" Action=\""+action+"\"/></Task>");
		}
		str.append("</Message>");
		System.out.println("向CMS发送命令,action:"+action+",taskIds:"+ids);
		jmsTemplate.send(noticeMessageDestination, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				BytesMessage bm = session.createBytesMessage();
				try {
					bm.writeBytes(str.toString().getBytes(SystemConfig.getSystemConfig().getProperty("system.communication.charset")));
				} 
				catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				return bm;
			}
		});
	}

}
