package com.gosun.example.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.utils.jpa.DBPage;
import com.gosun.example.entity.User;
import com.gosun.example.repository.IUserDao;

//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
@Service
public class UserService {
	
	@Autowired
	private IUserDao userDao;
	
	public void testSql() {
		userDao.testSql();
	}
	
	public void execute(String sql) {
		userDao.execute(sql);
	}
	
	public void testExecuteWithParams() {
		String jpql = "update User set loginName=? where id=?";
		Object[] parameterArray = {new String("44"), new Long(1)};
		userDao.executeWithParams(jpql, parameterArray);
	}
	
	public void testExecuteWithResults() {
		String jpql = "select u from User u";
		List<User> userList = userDao.executeWithResults(jpql);
		System.out.println("userList size = " + userList.size());
	}
	
	public List<User> testExecuteWithResultsAndParams() {
		String jpql = "select u from User u where id=?";
		Object[] parameterArray = {new Long(1)};
		List<User> userList = userDao.executeWithResultsAndParams(jpql, parameterArray);
		return userList;
	}
	
	public User testGet() {
		User user = userDao.get(new Long(1));
		return user;
	}
	
	public List<User> testGetAll() {
		List<User> userList = userDao.getAll();
		return userList;
	}
	
	public DBPage testPagedQuery() {
		int startIndex = 0;
		int pageSize = 20;
		
		LinkedHashMap conditions = new LinkedHashMap();
		conditions.put("id", new Long(1));
		
		String jpql = "select u from User u where id = ?";
		Object[] parameterArray = {new Long(1)};
		DBPage page = userDao.pagedQueryForJpql(jpql, startIndex, pageSize, parameterArray);
		//DBPage page = userDao.pagedQuery(startIndex, pageSize, conditions, null);
		return page;
	}

	@Transactional
	public void testExecute(String sql) {
		userDao.execute(sql);
	}

	
	public List<User> testQueryByProperties() {
		LinkedHashMap conditions = new LinkedHashMap();
		conditions.put("loginName", new String("111"));
		conditions.put("id", new Long(1));
		
		LinkedHashMap orderBy = new LinkedHashMap();
		conditions.put("loginName", "desc");
		
		List<User> listUser = userDao.queryByProperties(conditions, orderBy);
		return listUser;
	}

	public List<User> testQueryByProperty() {
		List<User> listUser = userDao.queryByProperty("id", 1 + "");
		return listUser;
	}

	public int testQueryCount() {
		LinkedHashMap conditions = new LinkedHashMap();
		//conditions.put("loginName", new String("111"));
		conditions.put("id", new Long(1));
		int count = userDao.queryCount(conditions);
		return count;
	}

	
	public int testQueryCountForJpql() {
		Object[] parameterArray = {new Long(1)};
		int count = userDao.queryCountForJpql("select count(*) from User u where id = ?", parameterArray);
		return count;
	}

	public User testQueryUniqueByProperty() {
		User user = userDao.queryUniqueByProperty("id", 1 + "");
		return user;
	}

	public User testQueryUniqueByProperties() {
		
		LinkedHashMap conditions = new LinkedHashMap();
		conditions.put("loginName", new String("111"));
		conditions.put("id", new Long(1));
		User user = userDao.queryUniqueByProperties(conditions) ;
		
		return user;
	}

	@Transactional
	public void testSave() {
		User user = new User();
	  //  user.setId(2l);
		user.setLoginName("2222");
		user.setPassword("123");
		user.setUserName("2222");
		this.userDao.save(user);
		
	}

	@Transactional
	public void testSaveAll() {
	
		List<User> userList = new ArrayList<User>();
		User user = new User();
		user.setLoginName("2222");
		user.setPassword("123");
		user.setUserName("2222");
		
		User user1 = new User();
		user1.setLoginName("2222");
		user1.setPassword("123");
		user1.setUserName("2222");
		
		userList.add(user);
		userList.add(user1);
		this.userDao.saveAll(userList);
	}
	
	@Transactional
	public void testUpdate() {
		User user = new User();
		user.setId(2l);
		user.setLoginName("333");
		user.setPassword("123");
		user.setUserName("2222");
		this.userDao.update(user);
		
		
	}

	@Transactional
	public void testRemove() {
		User user = new User();
		user.setId(2l);
//		user.setId(210l);
		this.userDao.remove(user);
	}

	@Transactional
	public void testRemoveById() {
		this.userDao.removeById(3l);
	}
	@Transactional
	public void testRemoveAllByIds() {
		List<Long> ids = new ArrayList<Long>();
		ids.add(2l);
		ids.add(3l);
		ids.add(4l);
		this.userDao.removeAllByIds(ids);
		
	}
	@Transactional
	public void testRemoveAll() {
		List<User> userList = new ArrayList<User>();
		User user = new User();
		user.setId(6l);
		User user1 = new User();
		user1.setId(7l);
		userList.add(user);
		userList.add(user1);
		this.userDao.removeAll(userList);
		
	} 
}
