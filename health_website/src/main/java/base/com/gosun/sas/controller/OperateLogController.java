package com.gosun.sas.controller;

import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.sas.entity.OperateLog;
import com.gosun.sas.service.OperateLogService;

/**
 * 操作日志控制层
* @ClassName: OperateController
* @Description: TODO
* @author TYF
* @date 2016-4-12 下午4:55:51
 */
@RestController
@RequestMapping("/operateLog")
public class OperateLogController {
	@Autowired
	private OperateLogService operateLogService;
	
	/**
	 * 
	 * @return 
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		return new ModelAndView("logging/operateLog");
	}
	
    /**
     * 
     * @Title: getPageList 
     * @Description: 获取任务的分页数据 
     * @param @param pageNumber
     * @param @param pageSize
     * @param @param sortType
     * @param @param model
     * @param @param request
     * @param @return    设定文件 
     * @return String    返回类型 
     * @throws
     */
    @RequestMapping(value="/getPageList.do")
    public String  getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType,ServletRequest request) {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

        Page<OperateLog> loggings = operateLogService.getLoggingList(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(loggings).toString();
    }
}
