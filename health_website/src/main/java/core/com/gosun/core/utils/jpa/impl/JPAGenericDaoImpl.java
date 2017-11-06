package com.gosun.core.utils.jpa.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.util.Assert;

import com.gosun.core.utils.jpa.DBPage;
import com.gosun.core.utils.jpa.IJPAGenericDao;

/**
 * jpa dao 实现类
 * 封装实体的操作，
 * @author lwh
 *
 */
public class JPAGenericDaoImpl  implements Serializable, IJPAGenericDao{
	
	private static final long serialVersionUID = -1458096973524834776L;

	  @PersistenceContext
	  protected EntityManager entityManager;

	  public void clear()
	  {
	    this.entityManager.clear();
	  }
	  
	  private <T> String createQueryString(Class<T> entityClass, LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy)
	  {
	    StringBuilder queryBuilder = new StringBuilder("SELECT e FROM ");
	    queryBuilder.append(entityClass.getName()).append(" e ").append(getCondtitons(conditions)).append(getOrderBy(orderBy));
	    return queryBuilder.toString();
	  }
	  
	  /**
	   * 执行sql语句
	   * @param jpql 
	   */
	  public boolean execute(String jpql)
	  {
	    Query query = this.entityManager.createQuery(jpql);
	    return query.executeUpdate() > 0;
	  }
	  
	  /**
	   * 执行查询sql返回结果
	   * @param jpql  语句
	   * @param parameterArray  sql where 条件
	   */
	  public List executeWithResults(String jpql, Object[] parameterArray)
	  {
	    Query query = this.entityManager.createQuery(jpql);
	    if ((parameterArray != null) && (parameterArray.length > 0)) {
	      int i = 0; for (int k = parameterArray.length; i < k; i++) {
	        query.setParameter(i + 1, parameterArray[i]);
	      }
	    }
	    return query.getResultList();
	  }
	  
	  /**
	   * 执行sql语句
	   * @param jpsql 语句
	   * @param parameterArray sql where 条件
	   */
	  public boolean execute(String jpql, Object[] parameterArray)
	  {
	    Query query = this.entityManager.createQuery(jpql);
	    setQueryParameterValues(parameterArray, query);
	    return query.executeUpdate() > 0;
	  }
	  
	  /**
	   * 刷新
	   */
	  public void flush() {
	    this.entityManager.flush();
	  }
	  
	  /**
	   * 根据主键id,获取实体对象
	   */
	  public <T> T get(Class<T> entityClass, Serializable id)
	  {
	    return this.entityManager.find(entityClass, id);
	  }
	  
	  /**
	   * 获取查询条件
	   * @param conditions
	   * @return
	   */
	  private String getCondtitons(LinkedHashMap<String, String> conditions)
	  {
	    StringBuilder conditionsBuilder = new StringBuilder("  WHERE 1=1 ");
	    if ((conditions == null) || (conditions.size() == 0)) {
	      return conditionsBuilder.toString();
	    }
	    Iterator iterator = conditions.entrySet().iterator();
	    while (iterator.hasNext()) {
	      Map.Entry entry = (Map.Entry)iterator.next();
	      conditionsBuilder.append(" and e.");
	      conditionsBuilder.append((String)entry.getKey());
	      conditionsBuilder.append(" = '");
	      conditionsBuilder.append(entry.getValue() + "");
	      conditionsBuilder.append("'");
	    }

	    return conditionsBuilder.toString();
	  }
	  
	  /**
	   * 
	   * @param entityClass
	   * @param conditions
	   * @return
	   */
	  private final <T> int getCount(Class<T> entityClass, LinkedHashMap<String, String> conditions)
	  {
	    String queryString = createQueryString(entityClass, conditions, null);
	    StringBuilder countJpqlBuilder = new StringBuilder("SELECT COUNT(*) ");
	    try {
	      countJpqlBuilder.append(queryString.substring(queryString.toUpperCase().indexOf("FROM")));
	    } catch (RuntimeException ex) {
	      throw new BadSqlGrammarException("JPQL : ", queryString, null);
	    }
	    Query query = this.entityManager.createQuery(countJpqlBuilder.toString());
	    int result = Integer.parseInt(query.getSingleResult().toString());
	    return result;
	  }
	  
	  /**
	   * 
	   * @param jpql
	   * @param parameterArray
	   * @return 返回数量
	   */
	  private final int getCount(String jpql, Object[] parameterArray)
	  {
	    StringBuilder countJpqlBuilder = new StringBuilder("SELECT COUNT(*) ");
	    try {
	      countJpqlBuilder.append(jpql.substring(jpql.toUpperCase().indexOf("FROM")));
	    } catch (RuntimeException ex) {
	      throw new BadSqlGrammarException("SQL : ", jpql, null);
	    }
	    
	    System.out.println(removeOrders(countJpqlBuilder));
	    
	    Query query = this.entityManager.createQuery(removeOrders(countJpqlBuilder));
	    setQueryParameterValues(parameterArray, query);
	    int result = Integer.parseInt(query.getSingleResult().toString());
	    return result;
	  }
	  
	  /**
	   * 
	   * @param orderBy
	   * @return 返回排序条件
	   */
	  private String getOrderBy(LinkedHashMap<String, String> orderBy)
	  {
	    if ((orderBy == null) || (orderBy.size() == 0))
	      return "";
	    StringBuilder orderByBuilder = new StringBuilder(" ORDER BY ");

	    Iterator iterator = orderBy.entrySet().iterator();
	    while (iterator.hasNext()) {
	      Map.Entry entry = (Map.Entry)iterator.next();
	      orderByBuilder.append(" e.").append((String)entry.getKey()).append(" ").append((String)entry.getValue()).append(",");
	    }

	    orderByBuilder.delete(orderByBuilder.length() - 1, orderByBuilder.length());
	    return orderByBuilder.toString();
	  }
	  
	  /**
	   * 分页查询
	   */
	  public <T> DBPage pagedQuery(Class<T> entityClass, int startIndex, int pageSize, LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy)
	  {
	    int totalCount = getCount(entityClass, conditions);
	    if (totalCount < 1) {
	      return new DBPage();
	    }

	    String queryString = createQueryString(entityClass, conditions, orderBy);
	    Query query = this.entityManager.createQuery(queryString);
	    if (pageSize > 0) {
	      if (startIndex < 0) {
	        query.setFirstResult(0);
	      } else {
	        if (startIndex >= totalCount) {
	          return new DBPage();
	        }
	        query.setFirstResult(startIndex);
	      }query.setMaxResults(pageSize);
	    }
	    
	    return new DBPage(startIndex, totalCount, pageSize, query.getResultList());
	  }
	  
	  /**
	   * 
	   * @param jpql
	   * @param startIndex
	   * @param pageSize
	   * @param parameterMap
	   * @return 返回分页结果
	   */
	  public DBPage pagedQueryForJpqlMap(String jpql, int startIndex, int pageSize, LinkedHashMap<String, Object> parameterMap)
	  {
	    Assert.hasText(jpql);
	    Assert.isTrue(startIndex >= 0, "startIndex should start from 0");

	    int totalCount = 0;
	    StringBuilder countJpqlBuilder = new StringBuilder("SELECT COUNT(1) ");
	    try {
	      countJpqlBuilder.append(jpql.substring(jpql.toUpperCase().indexOf("FROM")));
	    } catch (RuntimeException ex) {
	      throw new BadSqlGrammarException("SQL : ", jpql, null);
	    }

	    Query totalQuery = this.entityManager.createQuery(removeOrders(countJpqlBuilder));
	    if ((parameterMap != null) && (parameterMap.size() > 0)) {
	      Iterator iterator = parameterMap.entrySet().iterator();
	      while (iterator.hasNext()) {
	        Map.Entry entry = (Map.Entry)iterator.next();
	        totalQuery.setParameter((String)entry.getKey(), entry.getValue());
	      }
	    }

	    totalCount = Integer.parseInt(totalQuery.getSingleResult().toString());

	    if (totalCount < 1) {
	      return new DBPage();
	    }

	    Query query = this.entityManager.createQuery(jpql);

	    if ((parameterMap != null) && (parameterMap.size() > 0)) {
	      Iterator iterator = parameterMap.entrySet().iterator();
	      while (iterator.hasNext()) {
	        Map.Entry entry = (Map.Entry)iterator.next();
	        query.setParameter((String)entry.getKey(), entry.getValue());
	      }
	    }

	    if (pageSize > 0) {
	      if (startIndex < 0) {
	        query.setFirstResult(0);
	      } else {
	        if (startIndex >= totalCount) {
	          return new DBPage();
	        }
	        query.setFirstResult(startIndex);
	      }query.setMaxResults(pageSize);
	    }
	    return new DBPage(startIndex, totalCount, pageSize, query.getResultList());
	  }
	  
	  /**
	   * 分页查询
	   * @param jpql           sql条件 
	   * @param startIndex     开始页数
	   * @param pageSize	        分页大小
	   * @param parameterArray 查询条件
	   */
	  public DBPage pagedQuery(String jpql, int startIndex, int pageSize, Object[] parameterArray)
	  {
	    Assert.hasText(jpql);
	    Assert.isTrue(startIndex >= 0, "startIndex should start from 0");

	    int totalCount = getCount(jpql, parameterArray);
	    if (totalCount < 1) {
	      return new DBPage();
	    }

	    Query query = this.entityManager.createQuery(jpql);
	    setQueryParameterValues(parameterArray, query);

	    if (pageSize > 0) {
	      if (startIndex < 0) {
	        query.setFirstResult(0);
	      } else {
	        if (startIndex >= totalCount) {
	          return new DBPage();
	        }
	        query.setFirstResult(startIndex);
	      }query.setMaxResults(pageSize);
	    }
	    return new DBPage(startIndex, totalCount, pageSize, query.getResultList());
	  }
	  
	  /**
	   * 
	   * @param entityClass 实体
	   * @param conditions  查询条件
	   * @param orderBy     排序条件
	   */
	  public <T> List<T> queryByProperties(Class<T> entityClass, LinkedHashMap<String, String> conditions, LinkedHashMap<String, String> orderBy)
	  {
	    String queryString = createQueryString(entityClass, conditions, orderBy);
	    Query query = this.entityManager.createQuery(queryString);
	    return query.getResultList();
	  }
	  
	  /**
	   * @param entityClass  实体
	   * @param propertyName 查询条件的属性名称
	   * @param value		   查询条件的属性值
	   */
	  public <T> List<T> queryByProperty(Class<T> entityClass, String propertyName, Object value)
	  {
	    Assert.hasText(propertyName);
	    LinkedHashMap condition = new LinkedHashMap();
	    condition.put(propertyName, value);
	    String queryString = createQueryString(entityClass, condition, null);
	    Query query = this.entityManager.createQuery(queryString);
	    return query.getResultList();
	  }
	  
	  /**
	   * 获取符合条件的记录数量
	   * @param entityClass 实体
	   * @param conditions  条件
	   */
	  public <T> int queryCount(Class<T> entityClass, LinkedHashMap<String, String> conditions)
	  {
	    return getCount(entityClass, conditions);
	  }
	  
	  /**
	   * 获取符合条件的
	   * @param jpql 
	   * @param parameterArray
	   * @return 返回符合查询条件的记录数量
	   */
	  public <T> int queryCount(String jpql, Object[] parameterArray)
	  {
	    Query query = this.entityManager.createQuery(removeOrders(jpql));
	    setQueryParameterValues(parameterArray, query);
	    int result = Integer.parseInt(query.getSingleResult().toString());
	    return result;
	  }
	  
	  /**
	   * 返回查询的唯一记录值
	   * @param entityClass 实体
	   * @param propertyName 属性名
	   * @param value 属性值
	   */
	  public <T> T queryUniqueByProperty(Class<T> entityClass, String propertyName, Object value)
	  {
	    Assert.hasText(propertyName);
	    LinkedHashMap condition = new LinkedHashMap();
	    condition.put(propertyName, value);
	    String queryString = createQueryString(entityClass, condition, null);
	    Query query = this.entityManager.createQuery(queryString);
	    try {
	      return (T) query.getSingleResult(); 
	    } catch (NoResultException e) {
	    	
	    }
	    return null;
	  }
	  
	  /**
	   * 返回查询的唯一记录值
	   * @param entityClass 实体
	   * @param conditions 查询条件
	   */
	  public <T> T queryUniqueByProperties(Class<T> entityClass, LinkedHashMap<String, String> conditions)
	  {
	    String queryString = createQueryString(entityClass, conditions, null);
	    Query query = this.entityManager.createQuery(queryString);
	    try {
	      return (T) query.getSingleResult(); 
	    } catch (NoResultException e) {
	    	
	    }
	    return null;
	  }
	  
	  /**
	   * 删除实体
	   * @param o
	   */
	  protected void remove(Object o)
	  {
	    this.entityManager.remove(this.entityManager.contains(o) ? o : this.entityManager.merge(o));
	  }
	  
	  /**
	   * 删除所有实体
	   * @param entities
	   */
	  public void removeAll(Collection entities)
	  {
	    try
	    {
	      for (Iterator localIterator = entities.iterator(); localIterator.hasNext(); ) { Object entity = localIterator.next();
	        remove(entity); }
	    } catch (RuntimeException re) {
	      throw re;
	    }
	  }
	  
	  /**
	   * 根据IDS删除实体
	   * 
	   */
	  public <T> void removeAllByIds(Class<T> entityClass, Collection ids)
	  {
	    for (Iterator localIterator = ids.iterator(); localIterator.hasNext(); ) {
	    	Object id = localIterator.next();
	    	removeById(entityClass, (Serializable)id);
	    }
	  }
	  
	  /**
	   * 根据ID删除实体对象
	   * 
	   */
	  public <T> void removeById(Class<T> entityClass, Serializable id)
	  {
	    Object o = this.entityManager.find(entityClass, id);
	    if (o != null)
	      this.entityManager.remove(o);
	  }
	  
	  /**
	   * 去掉排序条件
	   * @param jpql
	   * @return
	   */
	  private String removeOrders(Object jpql)
	  {
	    Assert.hasText(jpql.toString());
	    Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*", 2);
	    Matcher m = p.matcher(jpql.toString());
	    StringBuffer sb = new StringBuffer();
	    while (m.find())
	      m.appendReplacement(sb, "");
	    m.appendTail(sb);
	    return sb.toString();
	  }
	  
	  /**
	   * 保存对象
	   * @param o
	   * @return
	   */
	  protected <T> T save(T o)
	  {
	    this.entityManager.persist(o);
	    return o;
	  }
	  
	  /**
	   * 保存所有的实体对象
	   * @param entities
	   */
	  public void saveAll(Collection entities)
	  {
	    try
	    {
	      for (Iterator localIterator = entities.iterator(); localIterator.hasNext(); ) {
	    	  Object entity = localIterator.next();
	          this.entityManager.merge(entity); 
	      }
	    } catch (RuntimeException re) {
	      throw re;
	    }
	  }
	  
	  /**
	   * 设置查询参数
	   * @param parameterArray
	   * @param query
	   */
	  private void setQueryParameterValues(Object[] parameterArray, Query query)
	  {
	    if ((parameterArray == null) || (parameterArray.length == 0))
	      return;
	    for (int i = 0; i < parameterArray.length; i++)
	      query.setParameter(i + 1, parameterArray[i]);
	  }
	  
	  /**
	   * 更新对象
	   * @param o
	   * @return
	   */
	  protected <T> T update(Object o)
	  {
	    this.entityManager.merge(o);
	    return (T) o;
	  }
	  
	  /**
	   * 执行sql查询
	   * @param queryString
	   * @return
	   */
	  public <T> List<T> queryByNativeSql(String queryString)
	  {
	    Query query = this.entityManager.createNativeQuery(queryString);
	    List objecArraytList = query.getResultList();
	    return objecArraytList;
	  }
	
}
