/**
 * @Title: ServerInfoController.java 	
 * @Package com.gosun.sas.controller 	
 * @Description: TODO	
 * @author Lisa
 * @date 2016-3-17 上午9:29:40 	
 * @version V1.0   
 */
package com.gosun.healthwebsite.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.utils.date.DateTimeUtils;
import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.service.UIAlarmInfoService;


/**
 * @ClassName: ServerInfoController 
 * @Description: TODO 
 * @author Lisa
 * @date 2016-3-17 上午9:29:40
 */
@RestController
@RequestMapping("/uialarm")
public class UIAlarmInfoController {
	
	@Autowired
	private UIAlarmInfoService alarmService;
	
//	@RequestMapping(value = "/findById.do")
//	public String findById(Long id) {
//		if (id != 0) { // 修改用户，获取实例展现在jsp页面
//			UIAlarmInfo status = alarmService.getRingStatus(id);
//			return JSONObject.fromObject(status).toString();
//		}
//		return null;
//	}
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = { "/index", "" })
	public ModelAndView index() {	
		return new ModelAndView("alarm/index");
	}
	
	@RequestMapping(value = { "/logindex", "" })
	public ModelAndView logindex() {	
		return new ModelAndView("alarmlog/index");
	}
	
	@RequestMapping(value = { "/autoRecoveryIndex", "" })
	public ModelAndView autoRecoveryIndex() {	
		return new ModelAndView("alarmlog/autoRecovery");
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

     //   Page<UIAlarmInfo> networks = alarmService.getRingStatus(searchParams, pageNumber, pageSize, sortType);

        return alarmService.getAlarmLogByProcedure(searchParams, pageNumber, pageSize).toString();
    }
    
//    @RequestMapping(value="/getUnDoPageList.do")
//    public String  getUnDoPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
//            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
//            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
//            ServletRequest request) {
//        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
//        searchParams.put("ISNULLOR_processFlag", '0');
//        searchParams.put("ISNULLOR_isFinished", '0');
//        Page<UIAlarmInfo> networks = alarmService.getRingStatus(searchParams, pageNumber, pageSize, sortType);
//
//        return JSONObject.fromObject(networks).toString();
//    }
//    
//    @RequestMapping(value="/getHasDoPageList.do")
//    public String  getHasDoPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
//            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
//            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
//            ServletRequest request) {
//        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");     
//        searchParams.put("EQ_processFlag", '1'); 
//        Page<UIAlarmInfo> networks = alarmService.getRingStatus(searchParams, pageNumber, pageSize, sortType);
//
//        return JSONObject.fromObject(networks).toString();
//    }
//    
//    @RequestMapping(value="/getUnFinishedPageList.do")
//    public String  getUnFinishPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
//            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
//            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
//            ServletRequest request) {
//        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
//        searchParams.put("ISNULLOR_isFinished", '0');
//        Page<UIAlarmInfo> networks = alarmService.getRingStatus(searchParams, pageNumber, pageSize, sortType);
//
//        return JSONObject.fromObject(networks).toString();
//    }
//    
//    @RequestMapping(value="/getHasFinishedPageList.do")
//    public String  getHasFinishedPageList(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
//            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
//            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
//            ServletRequest request) {
//        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
//        searchParams.put("EQ_isFinished", '1'); 
//        Page<UIAlarmInfo> networks = alarmService.getRingStatus(searchParams, pageNumber, pageSize, sortType);
//
//        return JSONObject.fromObject(networks).toString();
//    }
    
    /**
     * 把日志数据记录导出为Excel
     * @return byte[]
     * @throws WriteException 
     * @throws RowsExceededException 
     * @throws Exception 
     */
    @RequestMapping(value="/export.do")
    public void exportExcel(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            @RequestParam(value = "mark", defaultValue = "0") int mark,
            ServletRequest request,HttpServletResponse response) throws Exception {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        JSONObject resultObj = alarmService.getAlarmLogByProcedure(searchParams, pageNumber, pageSize);
        Label label = null;
        WritableSheet sheet = null;
        WritableWorkbook workBook = null;
        JSONArray list = resultObj.getJSONArray("content");
        WorkbookSettings settings = new WorkbookSettings();
        settings.setWriteAccess(null);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        InputStream is = null;
        OutputStream out = null;
        try {
            workBook = Workbook.createWorkbook(os , settings);
            sheet = workBook.createSheet("alarmInfo" , 0);
            for(int i = 0 ; i < 17 ; i++){
                sheet.setColumnView(i, 20);//设置Excel的宽度
            }
            sheet = this.addAlarmInfoTitleInfoToLabel(label , sheet);//向Excel中添加数据 
            this.addContentInfoToLabel(label , sheet , list);
            workBook.write();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            workBook.close();
        }
        try {
			is = new ByteArrayInputStream(os.toByteArray());
			out = response.getOutputStream();

			// 设置输出文件信息
			response.setContentType("application/octet-stream;charset=UTF-8");
			if(mark==0){
				response.addHeader("Content-Disposition", "attachment;filename="
						+ new String((DateTimeUtils.getTime("yyyy-MM-dd")+"自动恢复报警表.xls").getBytes("gb2312"), "ISO8859-1"));
			}else{
				response.addHeader("Content-Disposition", "attachment;filename="
						+ new String((DateTimeUtils.getTime("yyyy-MM-dd")+"报警日志表.xls").getBytes("gb2312"), "ISO8859-1"));
			}
	
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
     * @param label
     * @param sheet
     * @return WritableSheet
     * @throws WriteException 
     * @throws RowsExceededException 
     */
    private WritableSheet addAlarmInfoTitleInfoToLabel(Label label, WritableSheet sheet) throws RowsExceededException, WriteException {
        label = new Label(0 , 0 , "关注");           sheet.addCell(label);
        label = new Label(1 , 0 , "组织机构");           sheet.addCell(label);
        label = new Label(2 , 0 , "设备名称");           sheet.addCell(label);
        label = new Label(3 , 0 , "设备类型");           sheet.addCell(label);
        label = new Label(4 , 0 , "设备品牌");            sheet.addCell(label);
        label = new Label(5 , 0 , "设备型号");           sheet.addCell(label);
        label = new Label(6 , 0 , "IP地址");        sheet.addCell(label);
        label = new Label(7 , 0 , "检测属性");       sheet.addCell(label);
        label = new Label(8 , 0 , "报警级别");     sheet.addCell(label);
        label = new Label(9 , 0 , "事件类型");           sheet.addCell(label);
        label = new Label(10 , 0 , "报警描述");           sheet.addCell(label);
        label = new Label(11 , 0 , "检测值");           sheet.addCell(label);
        label = new Label(12 , 0 , "报警时间");           sheet.addCell(label);
        label = new Label(13 , 0 , "处置时间");           sheet.addCell(label);
        label = new Label(14 , 0 , "处置人");           sheet.addCell(label);
        label = new Label(15 , 0 , "处置结果");           sheet.addCell(label);
        label = new Label(16 , 0 , "回复内容");           sheet.addCell(label);
        return sheet;
    }

    /**
     * 往Excel中添加内容
     * @param label
     * @param sheet
     * @param snmpInfoList
     * @throws Exception 
     */
    private void addContentInfoToLabel(Label label, WritableSheet sheet, JSONArray list) throws Exception {
        for(int i = 0 ; i < list.size() ; i ++){
            int count = 0;
            JSONObject info = list.getJSONObject(i);
           
            label = new Label(count , i + 1 , info.getString("focusFlag")!=null?(info.getString("focusFlag").equals("1")?"是":"否"):"");         sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("orginizeName"));             sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("name"));                     sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("equipmentName"));            sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("producer"));                 sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("moduleName"));               sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("netAddress"));               sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("propertyName"));             sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("alarmLevel"));               sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("alarmType"));                sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("alarmDesc"));                sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("propertyValue"));            sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getString("beginTimeStr"));             sheet.addCell(label); count ++;
			if(info.getString("processTimeStr")==null||info.getString("processTimeStr").equals("")){
				label = new Label(count , i + 1 , info.getString("endTimeStr"));           sheet.addCell(label); count ++;
			}else{
				label = new Label(count , i + 1 , info.getString("processTimeStr"));           sheet.addCell(label); count ++;
			}
			if(info.getString("processTimeStr")==null||info.getString("processTimeStr").equals("")){
				label = new Label(count , i + 1 , "自动恢复");              sheet.addCell(label); count ++;
				label = new Label(count , i + 1 , "自动恢复");            sheet.addCell(label); count ++;
				label = new Label(count , i + 1 , "自动恢复");              sheet.addCell(label); count ++;
			}else{
				label = new Label(count , i + 1 , info.getString("processUser"));              sheet.addCell(label); count ++;
				label = new Label(count , i + 1 , info.getString("processResult"));            sheet.addCell(label); count ++;
				label = new Label(count , i + 1 , info.getString("processDesc"));              sheet.addCell(label); count ++;
			}
        }
    }
    
	
}
