package com.gosun.core.utils.jpa.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import com.gosun.core.utils.jpa.DBPage;
import com.gosun.core.utils.jpa.GenericsUtil;
import com.gosun.core.utils.jpa.IEntityDao;

/**
 * 实体dao操作类，用于扩展自定义sql语句
 * @author lwh
 *
 * @param <T>
 */
public class EntityDaoImpl<T> extends JPAGenericDaoImpl implements Serializable, IEntityDao<T> {
	
	private static final long serialVersionUID = -2673051402551454097L;
	
	protected Class<T> entityClass;

	  public EntityDaoImpl()
	  {
	    this.entityClass = (Class<T>) GenericsUtil.getSuperClassGenricType(getClass());
	  }

	  public boolean execute(String jpql)
	  {
	    return super.execute(jpql);
	  }

	  public boolean executeWithParams(String jpql, Object[] parameterArray)
	  {
	    return super.execute(jpql, parameterArray);
	  }

	  public List executeWithResults(String jpql)
	  {
	    return super.executeWithResults(jpql, null);
	  }

	  public List executeWithResultsAndParams(String jpql, Object[] parameterArray)
	  {
	    return super.executeWithResults(jpql, parameterArray);
	  }

	  public T get(Serializable id)
	  {
	    return get(getEntityClass(), id);
	  }

	  public List<T> getAll()
	  {
	    return queryByProperties(getEntityClass(), null, null);
	  }

	  protected Class<T> getEntityClass()
	  {
	    return this.entityClass;
	  }

	  public DBPage pagedQuery(int startIndex, int pageSize, LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy)
	  {
	    return super.pagedQuery(getEntityClass(), startIndex, pageSize, conditions, orderBy);
	  }

	  public DBPage pagedQueryForJpql(String jpql, int startIndex, int pageSize, Object[] parameterArray)
	  {
	    return super.pagedQuery(jpql, startIndex, pageSize, parameterArray);
	  }

	  public DBPage pagedQueryForJpqlMap(String jpql, int startIndex, int pageSize, LinkedHashMap<String, Object> parameterMap)
	  {
	    return super.pagedQueryForJpqlMap(jpql, startIndex, pageSize, parameterMap);
	  }

	  public List<T> queryByProperties(LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy)
	  {
	    return queryByProperties(getEntityClass(), conditions, orderBy);
	  }

	  public List<T> queryByProperty(String propertyName, String value)
	  {
	    return queryByProperty(getEntityClass(), propertyName, value);
	  }

	  public int queryCount(LinkedHashMap<String, String> conditions)
	  {
	    return super.queryCount(getEntityClass(), conditions);
	  }

	  public int queryCountForJpql(String jpql, Object[] parameterArray)
	  {
	    return super.queryCount(jpql, parameterArray);
	  }

	  public T queryUniqueByProperty(String propertyName, String value)
	  {
	    return super.queryUniqueByProperty(getEntityClass(), propertyName, value);
	  }

	  public T queryUniqueByProperties(LinkedHashMap<String, String> conditions) {
	    return super.queryUniqueByProperties(getEntityClass(), conditions);
	  }

	  public void remove(Object o)
	  {
	    super.remove(o);
	  }

	  public void removeAll(Collection entities)
	  {
	    super.removeAll(entities);
	  }

	  public void removeAllByIds(Collection ids)
	  {
	    super.removeAllByIds(getEntityClass(), ids);
	  }

	  public void removeById(Serializable id)
	  {
	    super.removeById(getEntityClass(), id);
	  }

	  public T save(Object o)
	  {
	    return (T) super.save(o);
	  }

	  public void saveAll(Collection entities)
	  {
	    super.saveAll(entities);
	  }

	  public T update(Object o)
	  {
	    return super.update(o);
	  }
	
}
