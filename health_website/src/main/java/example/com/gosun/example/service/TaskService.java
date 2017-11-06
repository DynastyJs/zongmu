package com.gosun.example.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.core.persistence.SearchFilter.Operator;
import com.gosun.example.entity.Task;
import com.gosun.example.repository.TaskDao;
import com.gosun.example.repository.TaskDaoImpl;

/**
 * 
 * @ClassName: TaskService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author lwh
 * @date 2015-6-23 下午3:01:45
 * 
 */
//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class TaskService
{
   @Autowired private TaskDaoImpl taskDaoImpl;	
	
   private TaskDao taskDao; 
   
   public Task getTask(Long id) {
       return taskDao.findOne(id);
   }

   public void saveTask(Task entity) {
       taskDao.save(entity);
   }
   
   public void deleteTask(Long id) {
       taskDao.delete(id);
   }

   public List<Task> getAllTask() {
       return (List<Task>) taskDao.findAll();
   }
   
   /**
    * 自定义SQL查询
    * @param title
    * @return
    */
   public Page<Object[]> customerSqlQuery(String title) {
	   return taskDaoImpl.findByTitle(title);
   }
   
   /**
    * 测试方法名查询
    * @param title
    * @return
    */
   public Task findByDescription(String description) {
	   Task task = taskDao.findByDescription(description);
	   return task;
   }
   
   /**
    * 模糊查询条件
    * @param title
    * @return
    */
   public List<Task> findByTitleLike(String title) {
	   List<Task> list = taskDao.findByTitleLike(title);
	   return list;
   }
   
   public Page<Task> getUserTask(Long userId, Map<String, Object> searchParams, int pageNumber, int pageSize,
           String sortType) {
       PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
       Specification<Task> spec = buildSpecification(userId, searchParams);
       
       return taskDao.findAll(spec, pageRequest);
   }

   /**
    * 创建分页请求.
    */
   private PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
       Sort sort = null;
       if ("auto".equals(sortType)) {
           sort = new Sort(Direction.DESC, "id");
       } else if ("title".equals(sortType)) {
           sort = new Sort(Direction.ASC, "title");
       }

       return new PageRequest(pageNumber - 1, pagzSize, sort);
   }
   
   /**
    * 创建动态查询条件组合.
    */
   private Specification<Task> buildSpecification(Long userId, Map<String, Object> searchParams) {
       Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
       filters.put("user.id", new SearchFilter("user.id", Operator.EQ, userId));
       Specification<Task> spec = DynamicSpecifications.bySearchFilter(filters.values(), Task.class);
       return spec;
   }
   
   @Autowired
   public void setTaskDao(TaskDao taskDao) {
       this.taskDao = taskDao;
   }
}
