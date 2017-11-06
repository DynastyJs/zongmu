package com.gosun.example.qpid;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;

import com.gosun.core.qpid.QpidMessageListener;
/**
 * 设备状态消息接收
 * @author yaoxiangping
 *
 */
public class DeviceStatusReceiver implements QpidMessageListener {

	public void onMessage(Message message) {
		TextMessage msg = (TextMessage)message;
		
		try {
			String xml = msg.getText();
			
			System.out.println("DEVICE STATUS:" + xml + "------------------------------------");
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
