package com.gosun.healthwebsite.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gosun.core.persistence.DynamicSpecifications;
import com.gosun.core.persistence.SearchFilter;
import com.gosun.healthwebsite.entity.BizAlarmCondition;
import com.gosun.healthwebsite.entity.TimeTemplate;
import com.gosun.healthwebsite.entity.VideoDignoseMission;
import com.gosun.healthwebsite.entity.VideoDignoseMissionCh;
import com.gosun.healthwebsite.entity.VideoDignoseMissionTree;
import com.gosun.healthwebsite.repository.BizAlarmConditionDAO;
import com.gosun.healthwebsite.repository.VideoDignoseMissionChDao;
import com.gosun.healthwebsite.repository.VideoDignoseMissionDao;
import com.gosun.healthwebsite.repository.VideoDignoseMissionTreeDao;

//Spring Bean的标识.
@Component
//默认将类中的所有public函数纳入事务管理.
@Transactional
public class VideoDignoseMissionService {
	@Autowired
	private VideoDignoseMissionChDao videoDignoseMissionChDao;
	@Autowired
	private VideoDignoseMissionDao videoDignoseMissionDao;
	@Autowired
	private VideoDignoseMissionTreeDao videoDignoseMissionTreeDao;
	@Autowired
	private BizAlarmConditionDAO bizAlarmConditionDAO;
	
	/**
	 * 获取未被删除的任务列表
	 * @param searchParams
	 * @param pageNumber
	 * @param pageSize
	 * @param sortType
	 * @return
	 */
	public Page<VideoDignoseMission> getMissionPage(Map<String, Object> searchParams, int pageNumber, int pageSize, String sortType){
		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
		Specification<VideoDignoseMission> spec = buildSpecification(searchParams);
		
		return videoDignoseMissionDao.findAll(spec, pageRequest);
	}
	
	/**
	 * 新增任务
	 */
	public int addMission(VideoDignoseMission mission){
		List<VideoDignoseMission> list = videoDignoseMissionDao.selectByName(mission.getMissionName());
		if(list==null||list.isEmpty()){
			
			UUID uuid = UUID.randomUUID();
			mission.setMissionId(uuid.toString());
			mission.setIsDelete(0);
			mission.setIsProcess(0);
			mission = videoDignoseMissionDao.save(mission);
			BizAlarmCondition nosignal = new BizAlarmCondition("信号丢失",mission.getNosignal(),"视频信号丢失",mission.getMissionId());
			BizAlarmCondition freeze = new BizAlarmCondition("冻结",mission.getFreeze(),"视频冻结",mission.getMissionId());
			BizAlarmCondition color = new BizAlarmCondition("偏色",mission.getColor(),"偏色异常",mission.getMissionId());
			BizAlarmCondition snow = new BizAlarmCondition("雪花",mission.getSnow(),"视频有雪花",mission.getMissionId());
			BizAlarmCondition covered = new BizAlarmCondition("遮挡",mission.getCovered(),"视频有遮挡",mission.getMissionId());
			BizAlarmCondition luminance = new BizAlarmCondition("亮度",mission.getLuminance(),"视频亮度过亮或暗",mission.getMissionId());
			BizAlarmCondition move = new BizAlarmCondition("像机移动",mission.getMove(),"像机移动",mission.getMissionId());
			BizAlarmCondition roll = new BizAlarmCondition("条纹",mission.getRoll(),"视频有条纹",mission.getMissionId());
			BizAlarmCondition contrast = new BizAlarmCondition("对比度",mission.getContrast(),"视频对比度异常",mission.getMissionId());
			BizAlarmCondition shake = new BizAlarmCondition("抖动",mission.getShake(),"视频有抖动",mission.getMissionId());
			bizAlarmConditionDAO.save(nosignal);
			bizAlarmConditionDAO.save(freeze);
			bizAlarmConditionDAO.save(color);
			bizAlarmConditionDAO.save(snow);
			bizAlarmConditionDAO.save(covered);
			bizAlarmConditionDAO.save(luminance);
			bizAlarmConditionDAO.save(move);
			bizAlarmConditionDAO.save(roll);
			bizAlarmConditionDAO.save(contrast);
			bizAlarmConditionDAO.save(shake);
			return 0;
		}else{
			return 2;
		}
		
	}
	
	/**
	 * 修改任务
	 */
	public int updateMission(VideoDignoseMission mission){
		List<VideoDignoseMission> list = videoDignoseMissionDao.selectByNameAndNotId(mission.getMissionName(),mission.getMissionId());
		if(list==null||list.isEmpty()){
			
			mission.setIsDelete(0);
			mission.setIsProcess(0);
			mission = videoDignoseMissionDao.save(mission);
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getNosignal(), "信号丢失", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getFreeze(), "冻结", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getColor(), "偏色", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getSnow(), "雪花", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getCovered(), "遮挡", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getLuminance(), "亮度", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getMove(), "像机移动", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getRoll(), "条纹", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getContrast(), "对比度", mission.getMissionId());
			bizAlarmConditionDAO.updateVideoDiagnoseCondition(mission.getShake(), "抖动", mission.getMissionId());
			return 0;
		}else{
			return 2;
		}
	}
	
	/**
	 * 删除任务
	 */
	public int deleteMission(String id){
		int count = 0;
		try{
			count = videoDignoseMissionDao.deleteMission(id);
			videoDignoseMissionChDao.deleteChById(id);
			bizAlarmConditionDAO.deleteVideoDiagnoseCondition(id);
		}
		catch (Exception e){
				e.printStackTrace();
			}
		return count;
	}
	
	/**
	 * 获取摄像机树
	 */
	public List<VideoDignoseMissionTree> getVideDignoseMissionTree(String missionId){
		List<VideoDignoseMissionTree> list =  videoDignoseMissionTreeDao.getVideoTreeList(missionId);
		return list;
	}
	/**
	 * 处理关联
	 */
	public int processLink(String missionId,String chnn){
		try{
			//List<BizAlarmCondition> conditionList = new ArrayList<BizAlarmCondition>();
			videoDignoseMissionChDao.deleteChById(missionId);
			//bizAlarmConditionDAO.deleteVideoDiagnoseCondition(missionId);
			List<VideoDignoseMission> mission = videoDignoseMissionDao.findByMissionId(missionId);
			if(mission==null||mission.isEmpty()){
				return 0;
			}
			JSONArray jsonArr = JSONArray.fromObject(chnn);
			List<VideoDignoseMissionCh> list = new ArrayList<VideoDignoseMissionCh>();
			if(jsonArr!=null&&jsonArr.size()>0){
				for(int i=0;i<jsonArr.size();i++){
					JSONObject obj = JSONObject.fromObject(jsonArr.get(i));
					VideoDignoseMissionCh ch = new VideoDignoseMissionCh();
					ch.setEquipmentId(Long.valueOf(obj.getString("equipmentId")));
					ch.setDvs(obj.getString("dvs"));
					ch.setChannel(obj.getString("code"));
					ch.setMissionId(missionId);
					list.add(ch);
					
					//conditionList.addAll(createCondition(mission.get(0),Long.valueOf(obj.getString("equipmentId"))));
				}
				videoDignoseMissionChDao.save(list);
				//bizAlarmConditionDAO.save(conditionList);
				videoDignoseMissionDao.updateProcess(missionId);
			}
		}catch (Exception e){
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	public List<BizAlarmCondition> createCondition(VideoDignoseMission mission,Long eqId){
		List<BizAlarmCondition> list = new ArrayList<BizAlarmCondition>();
		for(int i=0;i<11;i++){
			BizAlarmCondition con = new BizAlarmCondition();
			con.setEquipmentTypeId((long)24);
			con.setProducer("-1");
			con.setModuleName("-1");
			con.setAlarmResult("摄像机视频异常");
			con.setAlarmLevel("重要");
			con.setIsCamera(1);
			con.setEquipmentId(eqId);
			con.setMissionId(mission.getMissionId());
			list.add(con);
		}
		list.get(0).setPropertyName("信号丢失");
		list.get(0).setExpression(mission.getNosignal());
		list.get(0).setAlarmDesc("视频信号丢失");
		list.get(1).setPropertyName("冻结");
		list.get(1).setExpression(mission.getFreeze());
		list.get(1).setAlarmDesc("视频冻结");
		list.get(2).setPropertyName("偏色");
		list.get(2).setExpression(mission.getColor());
		list.get(2).setAlarmDesc("偏色异常");
		list.get(3).setPropertyName("雪花");
		list.get(3).setExpression(mission.getSnow());
		list.get(3).setAlarmDesc("视频有雪花");
		list.get(4).setPropertyName("遮挡");
		list.get(4).setExpression(mission.getCovered());
		list.get(4).setAlarmDesc("视频有遮挡");
		list.get(5).setPropertyName("亮度");
		list.get(5).setExpression(mission.getLuminance());
		list.get(5).setAlarmDesc("视频亮度过亮或暗");
		list.get(6).setPropertyName("像机移动");
		list.get(6).setExpression(mission.getMove());
		list.get(6).setAlarmDesc("像机移动");
		list.get(7).setPropertyName("条纹");
		list.get(7).setExpression(mission.getRoll());
		list.get(7).setAlarmDesc("视频有条纹");
		list.get(8).setPropertyName("模糊");
		list.get(8).setExpression(mission.getFuzzy());
		list.get(8).setAlarmDesc("视频模糊");
		list.get(9).setPropertyName("对比度");
		list.get(9).setExpression(mission.getContrast());
		list.get(9).setAlarmDesc("视频对比度异常");
		list.get(10).setPropertyName("抖动");
		list.get(10).setExpression(mission.getShake());
		list.get(10).setAlarmDesc("视频有抖动");
		return list;
	}
	
	/**
	 * 创建分页请求.
	 */
	private PageRequest buildPageRequest(int pageNumber, int pagzSize,
			String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(Direction.ASC, "missionId");
		}
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}

	/**
	 * 创建动态查询条件组合.
	 */
	private Specification<VideoDignoseMission> buildSpecification(Map<String, Object> searchParams) {
		Map<String, SearchFilter> filters = SearchFilter.parse(searchParams);
		Specification<VideoDignoseMission> spec = DynamicSpecifications.bySearchFilter(filters.values(), VideoDignoseMission.class);
		return spec;
	}
}
