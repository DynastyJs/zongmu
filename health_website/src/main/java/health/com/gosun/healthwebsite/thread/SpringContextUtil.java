package com.gosun.healthwebsite.thread;

import java.util.Locale;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringContextUtil implements ApplicationContextAware {
	// Spring应用上下文环境
	private static ApplicationContext context = null;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		// TODO Auto-generated method stub
		SpringContextUtil.context = applicationContext;
	}
	
	public static ApplicationContext getApplicationContext() {
        return SpringContextUtil.context;
    }
	
    /**
     * 获取对象 这里重写了bean方法，起主要作用
     */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName){
        return (T) context.getBean(beanName);
    }

    public static String getMessage(String key){
        return context.getMessage(key, null, Locale.getDefault());
    }
}
