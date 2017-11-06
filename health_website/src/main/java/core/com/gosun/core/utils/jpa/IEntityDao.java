package com.gosun.core.utils.jpa;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * 实体Dao接口
 * @author lwh
 *
 */
public abstract interface IEntityDao<T> {
	  
	  public abstract boolean execute(String jpql);

	  public abstract boolean executeWithParams(String jpql, Object[] paramArrayOfObject);
	
	  public abstract List executeWithResults(String jpql);
	
	  public abstract List executeWithResultsAndParams(String jpql, Object[] paramArrayOfObject);
	
	  public abstract T get(Serializable id);
	
	  public abstract List<T> getAll();
	
	  public abstract DBPage pagedQuery(int startIndex, int pageSize, LinkedHashMap<String, String> condition, LinkedHashMap<String, String> orderBy);
	
	  public abstract DBPage pagedQueryForJpql(String jpql, int startIndex, int pageSize, Object[] paramArrayOfObject);
	
	  public abstract DBPage pagedQueryForJpqlMap(String jpql, int startIndex, int pageSize, LinkedHashMap<String, Object> paramLinkedHashMap);
	
	  public abstract List<T> queryByProperties(LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy);
	
	  public abstract List<T> queryByProperty(String paramString1, String paramString2);
	
	  public abstract int queryCount(LinkedHashMap<String, String> paramLinkedHashMap);
	
	  public abstract int queryCountForJpql(String jpql, Object[] paramArrayOfObject);
	
	  public abstract T queryUniqueByProperty(String paramString1, String paramString2);
	
	  public abstract T queryUniqueByProperties(LinkedHashMap<String, String> paramLinkedHashMap);
	
	  public abstract void remove(Object paramObject);
	
	  public abstract void removeAll(Collection paramCollection);
	
	  public abstract void removeById(Serializable paramSerializable);
	
	  public abstract void removeAllByIds(Collection paramCollection);
	
	  public abstract T save(Object paramObject);
	
	  public abstract void saveAll(Collection paramCollection);
	
	  public abstract T update(Object paramObject);
}
