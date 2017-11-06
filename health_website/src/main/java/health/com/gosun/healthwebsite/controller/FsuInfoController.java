package com.gosun.healthwebsite.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.DeviceSignalOperation;
import com.gosun.healthwebsite.entity.UIFsuInfo;
import com.gosun.healthwebsite.entity.ViewDeviceSignalOperation;
import com.gosun.healthwebsite.fsuservice.FSUServiceEntry;
import com.gosun.healthwebsite.service.LogService;
import com.gosun.healthwebsite.service.UIFsuInfoService;
import com.gosun.sas.utils.UserUtil;

@RestController
@RequestMapping("/fsuinfo")
public class FsuInfoController {

	@Autowired
	private UIFsuInfoService fusService;

	@Autowired
	private LogService logService;

	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {
		return new ModelAndView("fsuinfo/index");
	}

	@RequestMapping(value = { "/config", "" })
	public ModelAndView config() {
		return new ModelAndView("fsuinfo/config");
	}

	@RequestMapping(value = "/getPageList.do")
	public String getPageList(
			@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(value = "sortType", defaultValue = "auto") String sortType,
			Model model, ServletRequest request) {
		Map<String, Object> searchParams = Servlets.getParametersStartingWith(
				request, "search_");

		Page<UIFsuInfo> fusInfo = fusService.getFusInfo(searchParams,
				pageNumber, pageSize, sortType);

		return JSONObject.fromObject(fusInfo).toString();
		// return null;
	}

	@RequestMapping(value = "/getByFsuId")
	public String getByFsuId(@RequestParam(value = "id") String id) {
		UIFsuInfo fusInfo = fusService.findById(id);
		return JSONObject.fromObject(fusInfo).toString();
	}

	@RequestMapping(value = "/getConfigById")
	public String getFsuConfig(@RequestParam(value = "id") String id) {
		Map map = fusService.getFsuConfig(id);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("result", (map != null ? true : false));
		data.put("config", map);
		return JSONObject.fromObject(data).toString();
	}

	@RequestMapping(value = "/setFsuConfig", method = RequestMethod.POST)
	public String setFsuConfig(FSUServiceEntry entry) throws Exception {
		String result = fusService.setFsuConfig(entry, null, 0);
		if (result != null && result.equals("1")) {
			result = "{ret : 1, msg:'保存成功'}";
			logService.log("设置参数成功", "主机ID:" + entry.getFsuId());
		} else {
			result = "{ret : " + result + ", msg:'保存失败'}";
			logService.log("设置参数失败", "主机ID:" + entry.getFsuId());
		}
		return JSONObject.fromObject(result).toString();
	}
	
	/**
	 * 获得监控点设置值
	 */
	@RequestMapping("/getTSemaphore")
	public String getTSemaphore(DeviceSignalOperation dso){
		Map<String,String> map = new HashMap<String,String>();
		try {
			map = fusService.getTSemaphore(dso);
		} catch (Exception e) {
			logService.log("发生异常,获取监控点值失败", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tSemaphoreIDs and Values:"+dso.getSignalMap().toString());
		} finally {
			return JSONObject.fromObject(map).toString();
		}
	}

	/**
	 * 修改监控点设置值
	 */
	@SuppressWarnings("finally")
	@RequestMapping("/setTSemaphore")
	public String setTSemaphore(DeviceSignalOperation dso) {
		List<DeviceSignalOperation> dsoList = null;
		dso.setUserId(UserUtil.getUser().getAccountId());
		try {
			dsoList = fusService.setTSemaphore(dso);
			if (dsoList != null && dsoList.size()>0) {
				for(DeviceSignalOperation dsoIndex:dsoList){
					logService.log("设置监控点值"+dsoIndex.getOperationStatus(), "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tSemaphoreIDs and Values:"+dso.getSignalMap().toString());
				}
			} else {
				logService.log("发生异常,设置监控点值无返回结果", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tSemaphoreIDs and Values:"+dso.getSignalMap().toString());
			}
		} catch (Exception e) {
			logService.log("发生异常,设置监控点值失败", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tSemaphoreIDs and Values:"+dso.getSignalMap().toString());
		} finally {
			return JSONObject.fromObject(dsoList).toString();
		}
	}
	
	/**
	 * 修改监控点门限数据值
	 */
	@SuppressWarnings("finally")
	@RequestMapping("/setTThreshold")
	public String setTThreshold(DeviceSignalOperation dso) {
		String result = "";
		dso.setUserId(UserUtil.getUser().getAccountId());
		try {
			result = fusService.setTThreshold(dso);
			if (result != null && result.equals("1")) {
				result = "{ret : 1, msg:'保存成功'}";
				logService.log("设置监控点门限数据成功", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tThresholdId:"+dso.getSignalId());
			} else {
				result = "{ret : " + result + ", msg:'保存失败'}";
				logService.log("设置监控点门限数据失败", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tThresholdId:"+dso.getSignalId());
			}
		} catch (Exception e) {
			result = "{ret : " + 0 + ", msg:'发生异常,保存失败'}";
			logService.log("发生异常,设置监控点门限数据失败", "主机ID:" + dso.getFsuId()+" devID:"+dso.getDeviceId()+" tThresholdId:"+dso.getSignalId());
		} finally {
			return JSONObject.fromObject(result).toString();
		}
	}
	
	/**
	 * 获取修改记录分页记录
	 */
	@RequestMapping(value="/getDeviceSignalOperationPageList")
	public String getDeviceSignalOperationPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request){
		Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        Page<ViewDeviceSignalOperation> page = fusService.getViewDeviceSignalOperationPageList(searchParams, pageNumber, pageSize, sortType);
        return JSONObject.fromObject(page).toString();
	}
	
	/**
	 * 导出特定时间内的修改记录
	 */
	@RequestMapping("/getDeviceSignalOperationExcel")
    public void getDeviceSignalOperationExcelExcel(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10000") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request,HttpServletResponse response) throws Exception {
		Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        Page<ViewDeviceSignalOperation> page = fusService.getViewDeviceSignalOperationPageList(searchParams, pageNumber, pageSize, sortType);
        Label label = null;
        WritableSheet sheet = null;
        WritableWorkbook workBook = null;
        WorkbookSettings settings = new WorkbookSettings();
        settings.setWriteAccess(null);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        InputStream is = null;
        OutputStream out = null;
        try{
        	 workBook = Workbook.createWorkbook(os , settings);
             sheet = workBook.createSheet("DeviceSignalOperationExcel" , 0);
             sheet.setColumnView(0, 20);//设置Excel的宽度
             sheet.setColumnView(1, 20);
             sheet.setColumnView(2, 30);
             sheet.setColumnView(3, 40);
             sheet.setColumnView(4,30);
             sheet.setColumnView(5, 30);
             sheet.setColumnView(6, 30);
             sheet.setColumnView(7, 15);
             sheet.setColumnView(8, 18);
             sheet.setColumnView(9, 25);
             this.addAlarmInfoTitleInfoToLabel(label , sheet);//向Excel添加标题
             this.addContentInfoToLabel(label , sheet , page.getContent());//向Excel添加表格数据
             workBook.write();
        }catch(Exception e){
        	e.printStackTrace();
        }finally{
            workBook.close();
        }
        try {
			is = new ByteArrayInputStream(os.toByteArray());
			out = response.getOutputStream();
			// 设置输出文件信息
			response.setContentType("application/octet-stream;charset=UTF-8");
			response.addHeader("Content-Disposition", "attachment;filename="+ new String(("设备信息号修改操作记录"+new SimpleDateFormat("yyyy-MM-dd HH-mm-ss").format(new Date())+".xls").getBytes("gb2312"), "ISO8859-1"));
//			response.setHeader("Content-Disposition", "attachment,filename="+
//					new String(("告警标准化").getBytes("gb2312"), "ISO8859-1")+new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date())+".xls");
			// 写文件流
			byte[] buffer = new byte[6 * 1024];
			int len = 0;
			while ((len = is.read(buffer, 0, buffer.length)) != -1) {
				out.write(buffer, 0, len);
			}
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
        	is.close();
        	out.close();
        }
    }
	
	/**
     * 给Excel导出增加标题
     */
    private WritableSheet addAlarmInfoTitleInfoToLabel(Label label, WritableSheet sheet) throws RowsExceededException, WriteException {
    	//设置字体;  
        WritableFont font1 = new WritableFont(WritableFont.ARIAL,12,WritableFont.BOLD);  
  
        WritableCellFormat cellFormat1 = new WritableCellFormat(font1);  
//        //设置自动换行;  
//        cellFormat1.setWrap(true);  
//        //设置文字居中对齐方式;  
//        cellFormat1.setAlignment(Alignment.CENTRE);  
//        //设置垂直居中;  
//        cellFormat1.setVerticalAlignment(VerticalAlignment.CENTRE); 
    	label = new Label(0 , 0 , "操作人员",cellFormat1);           
    	sheet.addCell(label);
    	label = new Label(1 , 0 , "FSU设备",cellFormat1);           
    	sheet.addCell(label);
    	label = new Label(2 , 0 , "FSU设备IP",cellFormat1);           
    	sheet.addCell(label);
        label = new Label(3 , 0 , "组织机构",cellFormat1);           
        sheet.addCell(label);
        label = new Label(4 , 0 , "设备名称",cellFormat1);           
        sheet.addCell(label);
        label = new Label(5 , 0 , "设备ID",cellFormat1);           
        sheet.addCell(label);
        label = new Label(6 , 0 , "设置参数",cellFormat1);            
        sheet.addCell(label);
        label = new Label(7 , 0 , "设置参数值",cellFormat1);           
        sheet.addCell(label);
        label = new Label(8 , 0 , "操作结果",cellFormat1);           
        sheet.addCell(label);
        label = new Label(9 , 0 , "操作时间",cellFormat1);           
        sheet.addCell(label);
        return sheet;
    }
    
    /**
     * 往Excel中添加内容
     */
    private void addContentInfoToLabel(Label label, WritableSheet sheet, List<ViewDeviceSignalOperation> list) throws Exception {
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	WritableFont writableFont = new WritableFont(WritableFont.createFont("宋体"),11, WritableFont.NO_BOLD, false);
    	WritableCellFormat writableCellFormat = new WritableCellFormat(writableFont);
    	writableCellFormat.setWrap(true);
        for(int i = 0 ; i < list.size() ; i ++){
        	ViewDeviceSignalOperation vdso = list.get(i);
            label = new Label(0 , i + 1 , vdso.getUserName(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(1 , i + 1 , vdso.getFsuName(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(2 , i + 1 , vdso.getFsuIp(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(3 , i + 1 , vdso.getAreaName(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(4 , i + 1 , vdso.getEquipmentName(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(5 , i + 1 , vdso.getDeviceId()+"",writableCellFormat);
            sheet.addCell(label);
            label = new Label(6 , i + 1 , vdso.getSignalName(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(7 , i + 1 , vdso.getSetUpValue(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(8 , i + 1 , vdso.getOperationStatus(),writableCellFormat);
            sheet.addCell(label);
            label = new Label(9 , i + 1 , sdf.format(vdso.getOperationTime()),writableCellFormat);
            sheet.addCell(label);
        }
    }
}
