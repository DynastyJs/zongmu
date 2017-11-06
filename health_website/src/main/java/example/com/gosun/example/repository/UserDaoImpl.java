package com.gosun.example.repository;

import org.springframework.stereotype.Repository;

import com.gosun.core.utils.jpa.impl.EntityDaoImpl;
import com.gosun.example.entity.User;

/**
 * 用户操作实体
 * @author lwh
 *
 */
@Repository
public class UserDaoImpl extends EntityDaoImpl<User> implements IUserDao {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void testSql() {
		System.out.println("1111111111111111111");
		long id = 1;
		User user = this.get(id);
		if (user != null) {
			System.out.println(user.getLoginName());
		} else {
			System.out.println("user is null");
		}
		System.out.println("2222222222222222222");
		
	}
	
}
