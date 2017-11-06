package com.gosun.example.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * @ClassName: JobTest
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author lwh
 * @date 2015-6-19 下午4:48:39
 * 
 */
public class JobTest extends QuartzJobBean
{
    
    /* (非 Javadoc) 
     * <p>Title: executeInternal</p> 
     * <p>Description: </p> 
     * @param arg0
     * @throws JobExecutionException 
     * @see org.springframework.scheduling.quartz.QuartzJobBean#executeInternal(org.quartz.JobExecutionContext) 
     */
    @Override
    protected void executeInternal(JobExecutionContext arg0)
            throws JobExecutionException
    {
        // TODO Auto-generated method stub
        System.out.println("系统调用定时器...." + System.currentTimeMillis());
    }
    
}
