package com.gosun.example.net;

import java.io.UnsupportedEncodingException;

import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;

import com.gosun.core.utils.net.CallBackInterface;
import com.gosun.core.utils.net.Constants;
import com.gosun.core.utils.net.dto.BaseMessage;


public class ClientCallbackHandler implements CallBackInterface{
    
    public ClientCallbackHandler() {
        
    }
    
    @Override
	public void onRequestMessageReceived(IoSession ioSession,byte[] protocolContent) {
		// TODO Auto-generated method stub
		try {
			String recmsg = new String(protocolContent,Constants.CharacterSet);
			System.out.println("onRequestMessageReceived:"+recmsg);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    
	@Override
	public void onResponseMessageReceived(IoSession ioSession,byte[] protocolContent) {
		// TODO Auto-generated method stub
		try {
			String recmsg = new String(protocolContent,Constants.CharacterSet);
			System.out.println("onResponseMessageReceived:"+recmsg);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void onMessageSent(IoSession ioSession,BaseMessage protocolContent) {
		// TODO Auto-generated method stub
		try {
			String recmsg = new String(protocolContent.getData(),Constants.CharacterSet);
			System.out.println("onMessageSent:"+recmsg);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void onSessionOpened(IoSession ioSession) {
		// TODO Auto-generated method stub
		System.out.println("session opened");
	}

	@Override
	public void onSessionConnected(IoSession ioSession) {
		// TODO Auto-generated method stub
		System.out.println("session connected");
	}

	@Override
	public void onSessionClosed(IoSession ioSession) {
		// TODO Auto-generated method stub
		System.out.println("session closed");
	}

	@Override
	public void onSessionIdle(IoSession ioSession,IdleStatus status) {
		// TODO Auto-generated method stub
		
	}
    
}