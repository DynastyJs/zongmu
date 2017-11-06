package com.gosun.example.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.example.entity.User;

/**
 * @ClassName: UserDao
 * @Description: 用户表操作
 * @author lwh
 * @date 2015-6-23 下午2:44:23
 * 
 */
public interface UserDao extends PagingAndSortingRepository<User, Long> 
{
    
}
