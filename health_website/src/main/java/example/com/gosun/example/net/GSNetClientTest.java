package com.gosun.example.net;

import com.gosun.core.utils.net.Constants;
import com.gosun.core.utils.net.GSNetClient;

public class GSNetClientTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ClientCallbackHandler callback = new ClientCallbackHandler();
		GSNetClient netClinet = new GSNetClient("127.0.0.1",10002,callback);
		netClinet.setSendHeartBeat(false);
		try {
			netClinet.init();
			while(true)
			{
				String content = "{\"User\":\"gxxsysadmin\",\"PlatformID\":0,\"Password\":\"d842e27a359e496d4a150f73bc52d3c0\",\"MSGTYPE\":1001,\"ClientType\":6}";
				byte[] data = content.getBytes(Constants.CharacterSet);
				netClinet.sendMessage(data, Constants.MESSAGE_TYPE_JSON);	
				Thread.sleep(10000);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
