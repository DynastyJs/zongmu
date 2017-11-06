package com.gosun.example.memcached;
import java.util.concurrent.TimeoutException;

import net.rubyeye.xmemcached.MemcachedClient;
import net.rubyeye.xmemcached.exception.MemcachedException;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author wx
 *
 */
public class MemcachedSpringTest {
	@SuppressWarnings("resource")
	public static void main(String args[])
	{
		ApplicationContext app = new ClassPathXmlApplicationContext("classpath:META-INF/applicationContext-xmemcached.xml");
		MemcachedClient memcachedClient = (MemcachedClient) app.getBean("memcachedClient");
		try {
			// 设置/获取   参数1:key 参数2:期限 0代表永久 参数3:缓存的内容 
			memcachedClient.set("gosun", 0, "set/get");
			System.out.println("get:"+memcachedClient.get("gosun"));
			
			// 替换
			memcachedClient.replace("gosun", 0, "replace");
			System.out.println("get:"+memcachedClient.get("gosun"));

			// 移除
			memcachedClient.delete("gosun");
			System.out.println("get:"+memcachedClient.get("gosun"));
		} catch (TimeoutException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (MemcachedException e) {
			e.printStackTrace();
		}
	}
}
