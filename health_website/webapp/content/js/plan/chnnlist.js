/**
 * 首页
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	initLeftData();
	initEvent();
	serverTable.setTable();
	serverTable.searchTb();
});

var serverTable = {
	/**
	 * 设置表格
	 */
	setTable:function(){
		  var height = $(window).height()-$('.orgmgr-tool').height()-100;
		  var settings = {
		  	classes : 'table table-hover',
		  	height:height,
			queryParams : function(params) {
				var pageNumber = 1;
				if(params.limit != 0){
					pageNumber = params.offset /params.limit+1;
				}
				params.pageSize=params.limit;
				params.pageNumber=pageNumber;					
				params['search_EQ_templateId'] = $("input[name='ruleCode']").val() || "";
				params['search_OR_devName#chnnName#orgName#netAddress']=$('#condition').val()||"";
				return params;
			}
		  }
		  C.createTable("#bootstrapTable",Constants.CONTEXT_PATH+ '/devauth/getPageList.do?fresh=' + Math.random(),settings);
	},
	/**
	 * 更新表格
	 */
	refreshTb:function(){
		$("#bootstrapTable").bootstrapTable('refresh', {
			url:Constants.CONTEXT_PATH+'/devauth/getPageList.do?fresh=' + Math.random()
		});
	},
	/**
	 * 查询数据
	 */
	searchTb:function(){
		$("#search").click(function(){
			serverTable.refreshTb();
		});
	}
}
function initLeftData(){
	$.ajax({
		url:Constants.CONTEXT_PATH+'/plan/getPageList.do?fresh=' + Math.random(),
		async:false,
		data:{
			pageSize:10000,
			search_EQ_isAlarmRule:0
		},
		dataType:'json',
		success:function(res){
			if(res){
				var data = res.content;
				for(var i=0;i<data.length;i++){
					$('.list-group').append(createHtml(data[i].name,i+1,data[i].id));
				}
			}
		}
	});
}


function devFormatter(value, row, index) {
	return value+'('+row.netAddress+')';
}

function createHtml(name,index,id){
	var activeClass = (index==1?"list-active":"");
	if(index==1){
		$("input[name='ruleCode']").val(id);
	}
	var styl = (index==1?"background-color: rgb(238, 238, 238)":"");
	var html =   '<li class="list-group-item rule '+activeClass+'" style="'+styl+'" ext="'+id+'">';
	html +=' <a href="javascript:void(0)">';
	html +=  name;
	html +=' </a>';
	html +=' </li>';
	return html;
}


/**
 * 初始化布局
 */
function initLayout() {
	$(".main-container").height($(window).outerHeight() - 100);
	$(window).resize(function() {
		$('.main-container').height($(window).height() - 100);
	});
}

function initEvent(){
	  //编辑规则
    $("#btnModify").off().on("click", function (event) {
        event.preventDefault();
        var code =  $("input[name='ruleCode']").val();
        if (!code || parseInt(eval(code.toString())) <= 0) {
            layer.msg("请选择需要编辑的规则.", 1, 0);
            return;
        }  
        
        var temp = 0;
        $.ajax({
    		url : Constants.CONTEXT_PATH+'/sysdev/getVideoTreeList.do?templateId='+parseInt(code)+"&fresh=" + Math.random(),
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
        	popUpWindow.editServer(parseInt(code));
        }
    	
    })

    //切换规则
    $(".rule").click(function () {
        $(".rule").css("background-color", "").removeClass("list-active");
        $(this).addClass("list-active").css("background-color", "rgb(238,238,238)");
        $("input[name='ruleCode']").val($(this).attr("ext"));
        serverTable.refreshTb();
    })
}


/**
 * 弹出窗
 */
var popUpWindow = {
	/**
	 * 编辑
	 */
	editServer:function(Id){
		if(typeof(Id) == 'undefined' || Id == ''){
			layer.alert('请选择需要修改的记录!',{icon: 0});
		}else if(isNaN(Id)){
			layer.alert('只能选择一条记录!',{icon: 0});
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
			  		postData.postAciton(index);
			  	},
			  	cancel: function(index){ 

				}
			});

			var setting = {
//				callback: {onClick: zTreeClickNode},
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
			$.getJSON(Constants.CONTEXT_PATH+'/sysdev/getVideoTreeList.do?fresh='+ Math.random(),{templateId:Id},function(result){
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
						if(item.templateId>0){
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
					});
					$.fn.zTree.init($("#chnntree"), setting,result.equipmentlist);
				}
			});
		}
	}
}

var postData = {
	postAciton : function(win){
		var zTree = $.fn.zTree.getZTreeObj("chnntree");
		var checkedNodes = zTree.getCheckedNodes(true);
		var chnns = [];
		$.each(checkedNodes,function(i,item){
			if(item.iconSkin== "chnn"){
				chnns.push({'equipmentId':item.equipmentId});
			}
		});
		var data = { "templateId": $("input[name='ruleCode']").val(), "chnnIds": JSON.stringify(chnns) };
		$.ajax({
			type:'post',
			url:Constants.CONTEXT_PATH+'/devauth/save.do',
			data:data,
			dataType:'json',
			success:function(data){
				if(data.ret == 1){
					layer.alert(data.msg,{icon: 1});
					layer.close(win);
					serverTable.refreshTb();
					return true;
				}else{
					layer.alert(data.msg,{icon: 1});
					return false;
				}
			}
		});
	}
}

