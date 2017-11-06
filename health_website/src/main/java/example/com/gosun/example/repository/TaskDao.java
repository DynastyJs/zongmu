package com.gosun.example.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.gosun.example.entity.Task;

/**
 * @ClassName: TaskDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author lwh
 * @date 2015-6-23 下午2:51:43
 * 
 */
public interface TaskDao extends PagingAndSortingRepository<Task, Long>,
        JpaSpecificationExecutor<Task>
{
    Page<Task> findByUserId(Long id, Pageable pageRequest);

    @Modifying
    @Query("delete from Task task where task.user.id=?1")
    void deleteByUserId(Long id);
    
    /**
     * 匹配title条件
     * @param title
     * @return
     */
    public Task findByDescription(String description);
    
    /**
     * 模糊title条件
     * @param title
     * @return
     */
    public List<Task> findByTitleLike(String title);
}
