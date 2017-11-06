package com.gosun.healthwebsite.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gosun.core.utils.date.DateTimeUtils;
import com.gosun.core.web.Servlets;
import com.gosun.healthwebsite.entity.UIAlarmevent;
import com.gosun.healthwebsite.entity.UIAlarmeventExcel;
import com.gosun.healthwebsite.service.UIAlarmeventService;

@RestController
@RequestMapping("/uiAlarmEvent")
public class UIAlarmeventController {

    @Autowired private UIAlarmeventService uiAlarmeventService;

    @RequestMapping(value = { "/index", "" })
    public ModelAndView index() {
        return new ModelAndView("alarmevent/index");
    }

    @RequestMapping(value = { "/handling", "" })
    public ModelAndView indexOfUnHandle() {
        return new ModelAndView("handling/index");
    }


    @RequestMapping("/getAlarmevent.do")
    public String getAlarmevent(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request){
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        Page<UIAlarmevent> alarmEvent = uiAlarmeventService.getUIAlarmevent(searchParams, pageNumber, pageSize, sortType);
        return JSONObject.fromObject(alarmEvent).toString();
    }
    
    @RequestMapping("/getAlarmeventExcel.do")
    public void getAlarmeventExcel(@RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize, 
            @RequestParam(value = "sortType", defaultValue = "auto") String sortType, Model model,
            ServletRequest request,HttpServletResponse response) throws Exception {
        Map<String, Object> searchParams = Servlets.getParametersStartingWith(request, "search_");
        Page<UIAlarmeventExcel> alarmEvent = uiAlarmeventService.getUIAlarmeventExcle(searchParams, pageNumber, pageSize, sortType);
        Label label = null;
        WritableSheet sheet = null;
        WritableWorkbook workBook = null;
        List<UIAlarmeventExcel> list = alarmEvent.getContent();
        System.out.println(list.size());
        WorkbookSettings settings = new WorkbookSettings();
        settings.setWriteAccess(null);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        InputStream is = null;
        OutputStream out = null;
        try{
        	 workBook = Workbook.createWorkbook(os , settings);
             sheet = workBook.createSheet("UIAlarmeventExcel" , 0);
             
             sheet.setColumnView(0, 15);
             sheet.setColumnView(1, 15);//设置Excel的宽度
             sheet.setColumnView(2, 9);
             sheet.setColumnView(3, 13);
             sheet.setColumnView(4, 9);
             sheet.setColumnView(5, 13);
             sheet.setColumnView(6, 15);
             sheet.setColumnView(7, 30);
             sheet.setColumnView(8, 25);
             
             sheet = this.addAlarmInfoTitleInfoToLabel(label , sheet);//向Excel中添加数据 
             this.addContentInfoToLabel(label , sheet , list);
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
			response.addHeader("Content-Disposition", "attachment;filename="+ new String((DateTimeUtils.getTime("yyyy-MM-dd")+"处理中报警事件表.xls").getBytes("gb2312"), "ISO8859-1"));
	
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
    	label = new Label(0 , 0 , "组织结构编码");           sheet.addCell(label);
        label = new Label(1 , 0 , "组织机构名称");           sheet.addCell(label);
        label = new Label(2 , 0 , "报修人");           sheet.addCell(label);
        label = new Label(3 , 0 , "报修电话");           sheet.addCell(label);
        label = new Label(4 , 0 , "联系人");            sheet.addCell(label);
        label = new Label(5 , 0 , "联系电话");           sheet.addCell(label);
        label = new Label(6 , 0 , "故障描述");        sheet.addCell(label);
        label = new Label(7 , 0 , "备注");       sheet.addCell(label);
        label = new Label(8 , 0 , "故障日期");     sheet.addCell(label);
        return sheet;
    }
    
    /**
     * 往Excel中添加内容
     * @param label
     * @param sheet
     * @param snmpInfoList
     * @throws Exception 
     */
    private void addContentInfoToLabel(Label label, WritableSheet sheet, List<UIAlarmeventExcel> list) throws Exception {
    	WritableFont writableFont = new WritableFont(WritableFont.createFont("宋体"),11, WritableFont.NO_BOLD, false);
    	WritableCellFormat writableCellFormat = new WritableCellFormat(writableFont);
    	writableCellFormat.setWrap(true);
        for(int i = 0 ; i < list.size() ; i ++){
            int count = 0;
            UIAlarmeventExcel info = list.get(i);
            label = new Label(count , i + 1 , (info.getOrgId()==null?"-":info.getOrgId().toString()),writableCellFormat);         sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getOrganizeName()==null?"-":info.getOrganizeName(),writableCellFormat);             sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getWarrantyMan()==null?"-":info.getWarrantyMan(),writableCellFormat);                     sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getWarrantyPhoneNumber()==null?"-":info.getWarrantyPhoneNumber(),writableCellFormat);            sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getLinkMan()==null?"-":info.getLinkMan(),writableCellFormat);                 sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getLinkPhoneNumber()==null?"-":info.getLinkPhoneNumber(),writableCellFormat);               sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getAlarmDesc()==null?"-":info.getAlarmDesc(),writableCellFormat);               sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , getRemark(info),writableCellFormat);             sheet.addCell(label); count ++;
            label = new Label(count , i + 1 , info.getBeginTimeStr()==null?"-":info.getBeginTimeStr(),writableCellFormat);               sheet.addCell(label); count ++;
        }
    }
    
    private String getRemark(UIAlarmeventExcel info){
    	StringBuffer sb = new StringBuffer();
    	sb.append("[设备名称]");
    	sb.append(info.getEquipmentName()==null?"-":info.getEquipmentName());
    	sb.append("\n[设备类型]");
    	sb.append(info.getEquipmentType()==null?"-":info.getEquipmentType());
    	sb.append("\n[设备品牌]");
    	sb.append(info.getProducer()==null?"-":info.getProducer());
    	sb.append("\n[设备型号]");
    	sb.append(info.getModuleName()==null?"-":info.getModuleName());
    	sb.append("\n[IP]");
    	sb.append(info.getNetAddress()==null?"-":info.getNetAddress());
    	return sb.toString();
    }
}
