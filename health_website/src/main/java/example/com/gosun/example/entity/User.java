package com.gosun.example.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.gosun.core.entity.IdEntity;


/**
 * 用户实体类
 * @author liuxg
 * @date 2015年6月9日 下午5:10:05
 */
@Entity
@Table(name = "user")
public class User extends IdEntity implements Serializable{
    
    private String loginName;
    
    private String userName;
    
    private String password;

    @Override
    public String toString() {
    	
    	return "user = {loginName : "+loginName+" , userName : "+userName+" , password : "+password+"}";
    }
    
    
    public String getLoginName()
    {
        return loginName;
    }

    public void setLoginName(String loginName)
    {
        this.loginName = loginName;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
}
