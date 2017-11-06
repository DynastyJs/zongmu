package com.gosun.healthwebsite.controller;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.TimeTemplate;
import com.gosun.healthwebsite.entity.VideoDignoseMission;
import com.gosun.healthwebsite.entity.VideoDignoseMissionCh;
import com.gosun.healthwebsite.entity.VideoDignoseMissionTree;
import com.gosun.healthwebsite.service.LogService;
import com.gosun.healthwebsite.service.VideoDignoseMissionService;
import com.gosun.service.entity.OrgRsp;
import com.gosun.service.org.IOrgService;
/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lwj
 * @date 2016-10-09 上午9:29:40
 */
@RestController
@RequestMapping("/diagnosis_mission")
public class DiagnosisMissionController {
	@Autowired
	private VideoDignoseMissionService videoDignoseMissionService;
	@Autowired
	private LogService logService;
	@Autowired
	private IOrgService orgService;
	
	@RequestMapping(value = { "/index", "" })
	public ModelAndView plan() {	
		return new ModelAndView("diagnosis_mission/index");
	}
	@RequestMapping(value = { "/rule", "" })
	public ModelAndView rule() {	
		return new ModelAndView("diagnosis_mission/rule");
	}
	@RequestMapping(value = { "/list", "" })
	public ModelAndView list() {	
		return new ModelAndView("diagnosis_mission/chnnlist");
	}
	
	
	/**
	 * 获取任务列表
	 * @param pageNumber
	 * @param pageSize
	 * @param sortType
	 * @param model
	 * @param request
	 * @return
	 */
    @RequestMapping(value="/getPageList.do")
    public String  getPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request) {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
       
        Page<VideoDignoseMission> videoDignoseMission = videoDignoseMissionService.getMissionPage(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(videoDignoseMission).toString();
    }
    
    /**
     * 新增或修改任务
     */
    @ResponseBody
    @RequestMapping(value = "/addOrUpadteMission.do",method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    public String addOrUpdateMission(String obj){
    	int vdm = 0;
		JSONObject jsonObject = JSONObject.fromObject(obj);
		VideoDignoseMission mission = (VideoDignoseMission) JSONObject.toBean(jsonObject, VideoDignoseMission.class);
    	if(mission.getMissionId()==null||mission.getMissionId().equals("")){
    		vdm = videoDignoseMissionService.addMission(mission);
    		if(vdm==0){
    			logService.log("新增诊断任务成功", "任务ID:"+mission.getMissionId());
    		}
    		//新增任务
    	}else{
    		//修改任务
    		vdm = videoDignoseMissionService.updateMission(mission);
    		if(vdm==0){
    			logService.log("修改诊断任务成功", "任务ID:"+mission.getMissionId());
    		}
    	}
    	if(vdm!=0){
    		if(vdm==1){
    			return "{\"result\":\"error\",\"msg\":\"内部异常请重试\"}";
    		}else if(vdm==2){
    			return "{\"result\":\"error\",\"msg\":\"任务名已存在\"}";
    		}
    	}
    	return "{\"result\":\"success\"}";
    }
    /**
     * 删除诊断任务
     */
    @RequestMapping(value="/deleteMission.do")
    public String deleteMission(String missionid){
    	int count = videoDignoseMissionService.deleteMission(missionid);
    	if(count>0){
    		logService.log("删除诊断任务成功", "任务ID:"+missionid);
    		return "{\"result\":\"success\"}";
    	}else{
    		return "{\"result\":\"error\"}";
    	}
    }
    
    /**
     * 获取摄像机树
     */
    @RequestMapping(value="/getCameraTree.do")
    public String getCameraTree(String missionId){
    	List<VideoDignoseMissionTree> equipmentlist = videoDignoseMissionService.getVideDignoseMissionTree(missionId);
    	List<OrgRsp> orglist = orgService.getAllOrgRsp();
    	JSONObject jsonObject = new JSONObject();
    	jsonObject.put("equipmentlist", equipmentlist);
    	jsonObject.put("orglist", orglist);
    	return jsonObject.toString();
    }
    /**
     * 保存任摄像机
     */
    @ResponseBody
    @RequestMapping(value = "/saveMissionCamera.do",method = RequestMethod.POST, produces = "text/html;charset=UTF-8")
    public String saveMissionCamera(String missionId,String chnnIds){
    	int t = videoDignoseMissionService.processLink(missionId,chnnIds);
    	if(t==1){
    		return "{\"result\":\"success\",\"msg\":\"设置成功\"}";
    	}else{
    		return "{\"result\":\"error\",\"msg\":\"内部异常请重试\"}";
    	}
    }
}
