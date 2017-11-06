/**
 * lwj
 */
$(function() {
	initButton();
	initTable();
	//initLeftData();
	//initEvent();
	//initEditPlanEvent();
	//validator.verify1();
});
/**
 * 初始化按钮
 */
function initButton(){
	$('#btn_add').click(function(){
		$('#mission_id').val('');
		$('#begin_time').val('00:00:00');
		$('#end_time').val('23:59:59');
		$('#mission_name').val('');
		$('#cycle').val('');
		$('#name_spam').html('');
		$('#end_time_spam').html('');
		$('#cycle_spam').html('');
		$('#myModalLabel').html('新增视频质量诊断任务');
		$("#is_run").removeAttr("checked");
		$('#add_model').modal();
		$('#nosignal').val('@value==255');
		$('#nosignal_spam').html('');
		$('#freeze').val('@value>240');
		$('#freeze_spam').html('');
		$('#color').val('@value>40');
		$('#color_spam').html('');
		$('#snow').val('@value>60');
		$('#snow_spam').html('');
		$('#covered').val('@value>100');
		$('#covered_spam').html('');
		$('#luminance').val('@value<30||@value>190');
		$('#luminance_spam').html('');
		$('#move').val('@value>45');
		$('#move_spam').html('');
		$('#roll').val('@value>140');
		$('#roll_spam').html('');
		$('#fuzzy').val('@value>200');
		$('#fuzzy_spam').html('');
		$('#contrast').val('@value<=18');
		$('#contrast_spam').html('');
		$('#shake').val('@value>130');
		$('#shake_spam').html('');
	})
	
	$('#save_mission').click(function(){
		var missionId = $('#mission_id').val();
		var missionName = $('#mission_name').val();
		var beginTime = $('#begin_time').val();
		var endTime = $('#end_time').val();
		var cycle = $('#cycle').val();
		var isRun = $("#is_run").is(':checked');
		var nosignal = $('#nosignal').val();
		var freeze = $('#freeze').val();
		var color = $('#color').val();
		var snow = $('#snow').val();
		var covered = $('#covered').val();
		var luminance = $('#luminance').val();
		var move = $('#move').val();
		var roll = $('#roll').val();
		var fuzzy = $('#fuzzy').val();
		var contrast = $('#contrast').val();
		var shake = $('#shake').val();
		
		var flag = checkInput(missionName,beginTime,endTime,cycle);
		if(flag){
			var run = isRun==true?1:0;
			var data = {"missionId":missionId,"missionName":missionName,
					"beginTime":beginTime,"endTime":endTime,"cycle":cycle,
					"isRun":run,"nosignal":nosignal,"freeze":freeze,
					"color":color,"snow":snow,"covered":covered,
					"luminance":luminance,"move":move,"roll":roll,
					"fuzzy":fuzzy,"contrast":contrast,"shake":shake}
			addOrUpdateMission(data);
		}
	})
}
/**
 * 检测输入值是否合法
 * @param missionName
 * @param beginTime
 * @param endTime
 * @param cycle
 * @returns {Boolean}
 */
function checkInput(missionName,beginTime,endTime,cycle){
	var flag = true;
	if(missionName==''){
		$('#name_spam').html('&nbsp;&nbsp;请输入任务名称');
		flag = false;
	}else{
		$('#name_spam').html('');
	}
	if(checkDate(beginTime,endTime)==false){
		$('#end_time_spam').html('&nbsp;&nbsp;结束时间必须大于开始时间');
		flag = false
	}else{
		$('#end_time_spam').html('');
	}
	if(cycle==''||isNaN(cycle)){
		$('#cycle_spam').html('&nbsp;&nbsp;请输入正确的数字');
		flag = false;
	}else{
		$('#cycle_spam').html('');
	}
	var basicInput = $('#form2').find('input');
	
	$.each(basicInput,function(index,obj){
		if($(obj).val()==''){
			$('#'+$(obj).attr('id')+'_spam').html('请输入'+$(obj).attr('placeholder'));
			flag = false;
			return false;
		}else{
			$('#'+$(obj).attr('id')+'_spam').html('');
		}
	})
	if(flag==false){
		return false;
	}
	basicInput=$('#form3').find('input');
	$.each(basicInput,function(index,obj){
		if($(obj).val()==''){
			$('#'+$(obj).attr('id')+'_spam').html('请输入'+$(obj).attr('placeholder'));
			flag = false;
			return false;
		}else{
			$('#'+$(obj).attr('id')+'_spam').html('');
		}
	})
	return flag;
}
function checkDate(begin,end){
	var b = begin.split(":");
	var e = end.split(":");
	if(parseInt(b[0])<parseInt(e[0])) return true;
	if(parseInt(b[0])>parseInt(e[0])) return false;
	if(parseInt(b[0])==parseInt(e[0])){
		if(parseInt(b[1])<parseInt(e[1])) return true;
		if(parseInt(b[1])>parseInt(e[1])) return false;
		if(parseInt(b[1])==parseInt(e[1])){
			if(parseInt(b[2])<parseInt(e[2])) return true;
			if(parseInt(b[2])>=parseInt(e[2])) return false;
		}
	}
}
/**
 * 初始化表格
 */
function initTable(){
	colimns = getTableHead(); 
	
	$('#bootstrapTable').bootstrapTable({
		url: Constants.CONTEXT_PATH + "/diagnosis_mission/getPageList.do?fresh=" + Math.random(),
		cache:false,
		method: 'get',
		//height: $(window).height()-165,
		toolbar:'#toolbar',
		striped: true,
		dataType: "json",
		pagination: true,
		//showRefresh: true,
		sidePagination : 'server', 
		showPaginationSwitch : true , 
		singleSelect: false, 
		pageSize: 10,
		pageNumber:1,
		sortable: true,
		checkboxHeather:true,
		pageList: [10,15,20,25],
		search: false, //不显示 搜索框
		showColumns: false, //不显示下拉框（选择显示的列）
		showExport: true,
		exportDataType: "basic",
		queryParams: queryParams,
		sortName: 'id', // 设置默认排序为 name
	    sortOrder: 'desc', // 设置排序为反序 desc
		responseHandler: responseHandler,
		columns:colimns
	});
}
function queryParams(params) { 
	var limit = params.limit;
	var offset = params.offset;
	var pageNumber = (offset/limit)+1
	params['search_EQ_isDelete'] = 0;
	params.pageSize=params.limit;
	params.pageNumber=pageNumber;
	return params;
}
function responseHandler(res) {
	if (res) {
		totalWorldPage = res.totalPages;
		return { "rows": res.content, "total": res.totalElements};
	} else {
		return {"rows": [],"total": 0};
	}
}
/**
 * table列
 * @returns {Array}
 */
function getTableHead(){
	var temp;
		temp = [{
			title:'编号',
			formatter:function indexFormatter(value, row, index) {  
		             return index+1;  
		     },
		 },
		 {
		   	title: '任务名称',
		    field: 'missionName',
		 },
		 {
		   	title: '开始时间',
		    field: 'beginTime',
		 },
		 {
		   	title: '结束时间',
		    field: 'endTime',
		 },
		 {
			title: '周期(小时)',
			field: 'cycle',
		 },
		 {
			title: '是否启用',
			field: 'isRun',
			formatter : changeChinese,
		 },
	    ]
		temp.push({
	      	title: '操作',
	        field: 'operator',
	        formatter:function(value,row,index){
	        		a = "<div class='td-btn-div'>"
	        		a = a + "<span style='right: 0px; position: absolute;'>"
	        		a = a + "<button title='删除' class='btn-danger btn-xs btn-link pull-right btnDelete' onclick=\"deleteMission('"+row.missionId+"')\"><span class='glyphicon glyphicon-remove'></span></button>";
	        		a = a + "<button title='关联摄像机' class='btn-danger btn-xs btn-link pull-right' onclick=\"editorCamera('"+row.missionId+"')\"><span class='glyphicon glyphicon-plus'></span></button>";
	        		a = a + "<button title='修改' class='btn-danger btn-xs btn-link pull-right btnModify' " +
	        				"onclick=\"updateMission(" +
	        				"'"+row.missionId+"','"+row.missionName+"','"+row.beginTime+"','"+row.endTime+"','"+
	        				row.cycle+"','"+row.isRun+"','"+row.nosignal+"','"+row.freeze+"','"+
	        				row.color+"','"+row.snow+"','"+row.covered+"','"+row.luminance+"','"+
	        				row.move+"','"+row.roll+"','"+row.fuzzy+"','"+row.contrast+"','"+row.shake+"'"+
	        				")" +
	        				"\"><span class='glyphicon glyphicon-pencil'></span></button>";
	        		a = a + "</span>";
	        		a = a + "</div>";
	        		return a;
	      }
		});
	
	return temp;
}
function changeChinese(value){
	if(value==0){
		return '否';
	}else{
		return '是';
	}
}
/**
 * 删除任务
 * @param id
 */
function deleteMission(id){
	if(confirm("确认删除任务?")){
		$.ajax({
		url : Constants.CONTEXT_PATH+ "/diagnosis_mission/deleteMission.do?missionid="+id+"&fresh=" + Math.random(),
		type : 'GET',
		dataType : 'json',
		success : function(json) {
			if(json.result=='success'){
				layer.alert("删除成功!",{icon: 1});
				$('#bootstrapTable').bootstrapTable('refresh');
			}else{
				layer.alert("删除失败!",{icon: 1});
				$('#bootstrapTable').bootstrapTable('refresh');
			}
		},
		error : function(){
			layer.alert("删除失败!",{icon: 1});
			$('#bootstrapTable').bootstrapTable('refresh');
		}
	});
		
	}
}
/**
 * 增加任务
 * @param missionId
 * @param missionName
 * @param beginTime
 * @param endTime
 * @param cycle
 * @param isRun
 */
function addOrUpdateMission(data){
	$.ajax({
		url : Constants.CONTEXT_PATH+ "/diagnosis_mission/addOrUpadteMission.do?fresh=" + Math.random(),
		type : 'post',
		dataType : 'json',
		data : {obj:JSON.stringify(data)},
		success : function(json) {
			if(json.result=='success'){
				layer.alert("操作成功",{icon: 1});
				$('#add_model').modal('hide')
				$('#bootstrapTable').bootstrapTable('refresh');
			}else{
				layer.alert(json.msg,{icon: 1});
			}
		},
		error : function(){
			layer.alert("操作失败",{icon: 1});
		}
	});
}
/**
 * 修改任务
 * @param missionId
 * @param missionName
 * @param beginTime
 * @param endTime
 * @param cycle
 * @param isRun
 */
function updateMission(missionId,missionName,beginTime,endTime,cycle,isRun,nosignal,freeze,color,snow,covered,luminance,move,roll,fuzzy,contrast,shake){
	$('#mission_id').val(missionId);
	$('#begin_time').val(beginTime);
	$('#end_time').val(endTime);
	$('#mission_name').val(missionName);
	$('#cycle').val(cycle);
	if(isRun==1){
		$("#is_run").attr("checked","checked");
	}else{
		$("#is_run").removeAttr("checked");
	}
	$('#nosignal').val(nosignal);
	$('#nosignal_spam').html('');
	$('#freeze').val(freeze);
	$('#freeze_spam').html('');
	$('#color').val(color);
	$('#color_spam').html('');
	$('#snow').val(snow);
	$('#snow_spam').html('');
	$('#covered').val(covered);
	$('#covered_spam').html('');
	$('#luminance').val(luminance);
	$('#luminance_spam').html('');
	$('#move').val(move);
	$('#move_spam').html('');
	$('#roll').val(roll);
	$('#roll_spam').html('');
	$('#fuzzy').val(fuzzy);
	$('#fuzzy_spam').html('');
	$('#contrast').val(contrast);
	$('#contrast_spam').html('');
	$('#shake').val(shake);
	$('#shake_spam').html('');
	$('#name_spam').html('');
	$('#end_time_spam').html('');
	$('#cycle_spam').html('');
	$('#myModalLabel').html('修改视频质量诊断任务');
	$('#add_model').modal();
}
/**
 * 修改任务关联摄像机
 * @param id
 */
function editorCamera(id){
        if (id==null||id=='') {
            layer.msg("请选择需要编辑的任务.", 1, 0);
            return;
        }        
        var temp = 0;
        $.ajax({
    		url : Constants.CONTEXT_PATH+'/diagnosis_mission/getCameraTree.do?missionId='+id+"&fresh=" + Math.random(),
    		type : 'get',
    		dataType : 'json',
    		async: false,
    		success : function(json) {
    			$.each(json.equipmentlist,function(index,val){
    				if(val.parentId!=0){
    					temp = 1;
    					return false;
    				}
    			});
    		},
    		error : function(){
    			temp = 0;
    			layer.alert("获取列表失败",{icon: 1});
    		}
    	});
        if(temp==0){
        	layer.alert("没有可编辑的摄像机",{icon: 1});
        }else{
    		popUpWindow.editServer(id);
        }
}
var popUpWindow = {
		/**
		 * 编辑
		 */
		editServer:function(Id){
			if(typeof(Id) == 'undefined' || Id == ''){
				layer.alert('请选择需要修改的任务!',{icon: 0});
			}else{
				// 弹窗编辑
				layer.open({
			 		type: 1,
					title : '选择摄像机',
					content : $('#eqwin'),
					height:400,
					width:400,
				 	btn: ['保存','关闭'],
				  	yes: function(index, layero){
				  		postData.postAciton(index,Id);
				  	},
				  	cancel: function(index){ 
  	
  					}
				});
				var setting = {
//					callback: {onClick: zTreeClickNode},
					check: {
						enable: true,
						autoCheckTrigger : true
					},
					view : {
						showIcon : true,
						dblClickExpand: false,
						showLine: true
					},
					data : {
						simpleData : {
							enable : true,
							idKey : "id",
							pIdKey : "parentId",
							rootPId : '-1'
						}
					}
				};
				
				$.getJSON(Constants.CONTEXT_PATH+'/diagnosis_mission/getCameraTree.do?fresh=' + Math.random(),{missionId:Id},function(result){
					if(result.equipmentlist&&result.orglist){
						var orgList = {};//所有组织结构
						var redyOrgList = {};
						$.each(result.orglist,function(i,item){
							item.id += '';
							item.parentId += '';
							orgList[item.id] = item;
							var icon;
							switch(item.path.split('#').length){
							case 3:
								icon =  'zh';break;
							case 4:
								icon =  'fh';break;
							default:
								icon =  'bh';break;
							}
							item.iconSkin = icon;
						});
						$.each(result.equipmentlist,function(i,item){
							if(item.missionId!=null&&item.missionId!=''){
								item.checked = true;
							}
							item.id = item.equipmentId+'#';//保持唯一
							if(item.parentId==0){
								item.iconSkin =  "dvr";
								item.parentId = item.orgId;//dvs节点
								//过滤没有设备的节点
								var orgIds = item.path.split('#');
								for(var i in orgIds){
									var orgId = orgIds[i];
									if(orgId&&!(orgId in redyOrgList)&&(orgId in orgList)){
										redyOrgList[orgId] = orgList[orgId];
										result.equipmentlist.push(orgList[orgId]);
									}
								}
							}else{
								item.iconSkin =  "chnn";
								item.parentId += '#';//通道节点
							}
						})
						$.fn.zTree.init($("#chnntree"), setting,result.equipmentlist);
					}
				});
				
			}
		}
	}
var postData = {
		postAciton : function(win,id){
			var zTree = $.fn.zTree.getZTreeObj("chnntree");
			var checkedNodes = zTree.getCheckedNodes(true);
			var chnns = [];
			$.each(checkedNodes,function(i,item){
				if(item.iconSkin=== "chnn"){
					chnns.push({'dvs':item.dvs,'code':item.code,'equipmentId':item.equipmentId});
				}
			});
			var data = { "missionId": id, "chnnIds": JSON.stringify(chnns) };
			$.ajax({
				url:Constants.CONTEXT_PATH+'/diagnosis_mission/saveMissionCamera.do?fresh=' + Math.random(),
				data:data,
				dataType:'json',
				type:'post',
				success:function(data){
					if(data.result == 'success'){
						layer.alert(data.msg,{icon: 1});
						layer.close(win);
						return true;
					}else{
						layer.alert(data.msg,{icon: 1});
						return false;
					}
				}
			});
		}
	}