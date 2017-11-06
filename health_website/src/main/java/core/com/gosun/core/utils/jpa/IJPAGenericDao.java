package com.gosun.core.utils.jpa;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * JPA 实现抽象类接口
 * @author lwh
 *
 */
public abstract interface IJPAGenericDao {
	
  public abstract void clear();

  public abstract boolean execute(String paramString);

  public abstract List executeWithResults(String paramString, Object[] paramArrayOfObject);

  public abstract boolean execute(String paramString, Object[] paramArrayOfObject);

  public abstract void flush();

  public abstract <T> T get(Class<T> paramClass, Serializable paramSerializable);

  public abstract <T> DBPage pagedQuery(Class<T> paramClass, int startIndex, int pageSize, LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy);

  public abstract DBPage pagedQuery(String paramString, int startIndex, int pageSize, Object[] paramArrayOfObject);

  public abstract <T> List<T> queryByProperties(Class<T> paramClass, LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy);

  public abstract <T> List<T> queryByProperty(Class<T> paramClass, String paramString, Object paramObject);

  public abstract <T> int queryCount(Class<T> paramClass, LinkedHashMap<String, String> paramLinkedHashMap);

  public abstract <T> int queryCount(String paramString, Object[] paramArrayOfObject);

  public abstract <T> T queryUniqueByProperty(Class<T> paramClass, String paramString, Object paramObject);

  public abstract <T> T queryUniqueByProperties(Class<T> paramClass, LinkedHashMap<String, String> paramLinkedHashMap);

  public abstract void removeAll(Collection paramCollection);

  public abstract <T> void removeById(Class<T> paramClass, Serializable paramSerializable);

  public abstract <T> void removeAllByIds(Class<T> paramClass, Collection paramCollection);

  public abstract void saveAll(Collection paramCollection);
}
