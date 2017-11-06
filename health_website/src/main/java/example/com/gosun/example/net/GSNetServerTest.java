package com.gosun.example.net;
import com.gosun.core.utils.net.GSNetServer;


public class GSNetServerTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ServerCallbackHandler callback = new ServerCallbackHandler();
		GSNetServer netServer = new GSNetServer(10002,callback);
		callback.gsnetServer = netServer;
		try {
			netServer.init();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
