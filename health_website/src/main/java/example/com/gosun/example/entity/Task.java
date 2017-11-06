package com.gosun.example.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.gosun.core.entity.IdEntity;


//JPA标识
@Entity
@Table(name = "task")
public class Task extends IdEntity {

	private String title;
	private String description;
	private User user;

	
	@Override
    public String toString() {
    	
    	return "task = {title : "+title+" , description : "+description+" }";
    }

	// JSR303 BeanValidator的校验规则
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	// JPA 基于USER_ID列的多对一关系定义
	@ManyToOne
	@JoinColumn(name = "user_id")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
