/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.TbV2DevauthChn;
import com.gosun.healthwebsite.entity.TbV2DevauthOrg;
import com.gosun.healthwebsite.entity.UIDevAuthInfo;
import com.gosun.healthwebsite.repository.TBV2DevauthChnDAO;
import com.gosun.healthwebsite.repository.TBV2DevauthOrgDAO;
import com.gosun.healthwebsite.service.UIDevAuthInfoService;
import com.gosun.sas.log.Log;


/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/devauth")
public class UIDevAuthInfoController {
	
	@Autowired
	private UIDevAuthInfoService devAuthService;
	@Autowired
	private TBV2DevauthOrgDAO devauthOrgDAO ;
	@Autowired
	private TBV2DevauthChnDAO devauthChnDAO ;

	
	@Log(desc="设置模板关联摄像机",objId="#{templateId}")
	@RequestMapping(value="/save.do")
	public String save(Long templateId,String chnnIds){
		List<TbV2DevauthOrg> list = devauthOrgDAO.findByTemplateId(templateId);
		TbV2DevauthOrg orgobj = null;
		if(list==null||list.size()==0){
			orgobj = new TbV2DevauthOrg();
			orgobj.setTimeTempLateId(templateId);
			devauthOrgDAO.save(orgobj);
		}else{
			orgobj = list.get(0);
		}
			devauthChnDAO.delete(devauthChnDAO.findByAuthId(orgobj.getAuthId()));
			JSONArray jsonArr = JSONArray.fromObject(chnnIds);
			if(jsonArr!=null&&jsonArr.size()>0){
				
				for(int i=0;i<jsonArr.size();i++){
					JSONObject obj = JSONObject.fromObject(jsonArr.get(i));
					TbV2DevauthChn authChnn = new TbV2DevauthChn();
					authChnn.setAuthId(orgobj.getAuthId());
					authChnn.setChnId(obj.getLong("equipmentId"));	
					devauthChnDAO.save(authChnn);
				}
			}
		devAuthService.updateCamAlarmFinished();
		return JSONObject.fromObject("{ret:1,msg:'保存成功'}").toString();
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
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request) {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");

        Page<UIDevAuthInfo> networks = devAuthService.getPageList(searchParams, pageNumber, pageSize, sortType);

        return JSONObject.fromObject(networks).toString();
    }
	
}
