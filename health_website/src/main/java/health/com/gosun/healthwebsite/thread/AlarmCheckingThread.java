package com.gosun.healthwebsite.thread;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gosun.healthwebsite.service.ScreenViewService;


public class AlarmCheckingThread extends Thread{
	private static Logger log = LoggerFactory.getLogger(AlarmCheckingThread.class);
	public ScreenViewService screenViewService;
	public void StartTask() {
		this.setName("AlarmCheckingThread Thread");
		this.start();
	}
	
	@Override
	public void run(){
		screenViewService = SpringContextUtil.getBean("screenViewService");
		log.info("大屏告警显示线程.........");
		while(true){
			try{
				System.out.println("大屏告警显示任务更新开始.....");
				screenViewService.checkAlarmPos();
				System.out.println("大屏告警显示任务更新结束.....");
				Thread.sleep(60*1000);
			}catch (Exception e){
				e.printStackTrace();
				log.info(e.getMessage());
			}
		}
	}
}
