package com.gosun.example.repository;

import com.gosun.core.utils.jpa.IEntityDao;
import com.gosun.example.entity.User;

public interface IUserDao extends IEntityDao<User> {
	
	public void testSql();
	
}
