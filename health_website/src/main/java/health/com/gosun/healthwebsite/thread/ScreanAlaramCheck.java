package com.gosun.healthwebsite.thread;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


public class ScreanAlaramCheck implements ServletContextListener {
	public AlarmCheckingThread alarmCheckingThread;
	
	public void StartService(){
		alarmCheckingThread = new AlarmCheckingThread();
		alarmCheckingThread.StartTask();
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		this.StartService();
	}

}
