package com.gosun.example.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.collect.Maps;
import com.gosun.core.web.Servlets;
import com.gosun.example.entity.Task;
import com.gosun.example.service.TaskService;

/**
 * @ClassName: TaskController
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author lwh
 * @date 2015-6-23 下午3:46:43
 * 
 */
@RestController
@RequestMapping("/task")
public class TaskController
{
//    @Autowired
//    private TaskService taskService;
//    
//    private static Map<String, String> sortTypes = Maps.newLinkedHashMap();
//    static {
//        sortTypes.put("auto", "自动");
//        sortTypes.put("title", "标题");
//    }
//    
//    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public List<Task> list() {
//        return taskService.getAllTask();
//    }
//    
//    @RequestMapping(method = RequestMethod.GET)
//    public ModelAndView taskList() {
//        return new ModelAndView("task/taskList");
//    }
//    
//    /**
//     * 自定义sql查询条件
//     * @return
//     */
//    @RequestMapping(value="/getSQLPageList.do")
//    public String customerSqlQuery() {
//    	Page<Object[]> pages = taskService.customerSqlQuery("11");
//    	return JSONObject.fromObject(pages).toString();
//    }
//    
//    /**
//     * 测试匹配查询
//     * @return
//     */
//    @RequestMapping(value="/findByTitle.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public String findByTitle() {
//    	String description = "11";
//    	return JSONObject.fromObject(taskService.findByDescription(description)).toString();
//    }
//    
//    /**
//     * 测试模糊查询
//     * @return
//     */
//    @RequestMapping(value="/findByTitleLike.do", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public String findByTitleLike() {
//    	String title = "11";
//    	return JSONArray.fromObject(taskService.findByTitleLike(title)).toString();
//    }
//    
//    /**
//     * 
//     * @Title: getPageList 
//     * @Description: 获取任务的分页数据 
//     * @param @param pageNumber
//     * @param @param pageSize
//     * @param @param sortType
//     * @param @param model
//     * @param @param request
//     * @param @return    设定文件 
//     * @return String    返回类型 
//     * @throws
//     */
//    @RequestMapping(value="/getPageList.do")
//    public String  getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
//            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
//            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
//            ServletRequest request) {
//        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
//        Long userId = Long.parseLong("1");
//
//        Page<Task> tasks = taskService.getUserTask(userId, searchParams, pageNumber, pageSize, sortType);
//
//        return JSONObject.fromObject(tasks).toString();
//    }
//    
}
