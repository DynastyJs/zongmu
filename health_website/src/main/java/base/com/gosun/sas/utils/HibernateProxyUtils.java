package com.gosun.sas.utils;

import org.hibernate.proxy.HibernateProxy;

/**
 * Hibernate工具类
 * @author Abe
 *
 */
public class HibernateProxyUtils {
    /**
     * 得到Hibernate代理对象的实现
     * @param object 代理类对象
     * @return 实现对象
     */
    public static Object getImplement(Object object){
        if(object instanceof HibernateProxy ){
           if(((HibernateProxy)object).getHibernateLazyInitializer().getImplementation() == null)
               return null;
           else
               return ((HibernateProxy)object).getHibernateLazyInitializer().getImplementation();
        }else
            return object;
        
    }
    /**
     * 判断代理对象是否为空
     * @param object
     * @return
     */
    public static boolean isNull(Object object){
        if(getImplement(object) == null)
            return true;
        else
            return false;
    }
}
