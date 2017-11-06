package com.gosun.sas.test;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gosun.core.utils.jpa.DBPage;
import com.gosun.example.entity.User;
import com.gosun.example.repository.IUserDao;
import com.gosun.example.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:META-INF/applicationContext.xml")
public class UserServiceTest extends AbstractJUnit4SpringContextTests{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private IUserDao userDao;
	
	@Test
	public void testExecute() {
		String sql = "update User set loginName='33' where id=1";
		userService.testExecute(sql);
	}
	
	@Test
	public void testExecuteWithParams() {
		userService.testExecuteWithParams();
	}
	
	@Test
	public void testExecuteWithResults() {
		userService.testExecuteWithResults();
	}
	
	@Test
	public void testExecuteWithResultsAndParams() {
		List<User> userList = userService.testExecuteWithResultsAndParams();
		Assert.assertNotNull(userList);
	}
	
	@Test
	public void testGet() {
		User user = userService.testGet();
		Assert.assertNotNull(user);
	}
	
	@Test
	public void testGetAll() {
		List<User> userList = userService.testGetAll();
		Assert.assertNotNull(userList);
	}
	
	@Test
	public void testPagedQuery() {
		DBPage page = userService.testPagedQuery();
		Assert.assertNotNull(page.getResult());
	}
	
	@Test
	public void testQueryByProperty(){
		List<User> userList = userService.testQueryByProperty();
		Assert.assertNotNull(userList);
	}
	
	@Test
	public void testQueryByProperties(){
		List<User> userList = userService.testQueryByProperties();
		Assert.assertNotNull(userList);
	}
	
	@Test
	public void testQueryUniqueByProperty(){
	    User user = userService.testQueryUniqueByProperty();
		Assert.assertNotNull(user);
	}
	
	@Test
	public void testQueryUniqueByProperties(){
		User user = userService.testQueryUniqueByProperties();
		Assert.assertNotNull(user);
	}
	
	@Test
	public void testQueryCount(){
		int count = userService.testQueryCount();
		Assert.assertNotNull(count);
	}
	@Test
	public void testQueryCountForJpql(){
		int count = userService.testQueryCountForJpql();
		Assert.assertNotNull(count);
	}
	@Test
	public void testSave(){
		userService.testSave();
	}
	
	@Test
	public void testSaveAll(){
		userService.testSaveAll();
	}
	@Test
	public void testUpdate(){
		userService.testUpdate();
	}
	
	@Test
	public void testRemove(){
		userService.testRemove();
	}
	@Test
	public void testRemoveById(){
		userService.testRemoveById();
	}
	@Test
	public void testRemoveAllByIds(){
		userService.testRemoveAllByIds();
	}
	@Test
	public void testRemoveAll(){
		userService.testRemoveAll();
	}
}
