/**
 * 示例代码JS
 * 
 * @author liuxg
 * @date 2015年6月10日 上午9:50:46
 */
$(function() {
	initUserLayout();
//	initTable();
//	initOrgUserTree();
//	initChart();
//	bindEvent();
});

function initChart() {
	 $('#chart1').highcharts({
	        title: {
	            text: 'Monthly Average Temperature',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Source: WorldClimate.com',
	            x: -20
	        },
	        xAxis: {
	            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '°C'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Tokyo',
	            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	        }, {
	            name: 'New York',
	            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
	        }, {
	            name: 'Berlin',
	            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
	        }, {
	            name: 'London',
	            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	        }]
	    });
	 
	 $('#chart2').highcharts({
	        chart: {
	            type: 'area'
	        },
	        title: {
	            text: 'US and USSR nuclear stockpiles'
	        },
	        subtitle: {
	            text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
	                'thebulletin.metapress.com</a>'
	        },
	        xAxis: {
	            allowDecimals: false,
	            labels: {
	                formatter: function () {
	                    return this.value; // clean, unformatted number for year
	                }
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Nuclear weapon states'
	            },
	            labels: {
	                formatter: function () {
	                    return this.value / 1000 + 'k';
	                }
	            }
	        },
	        tooltip: {
	            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
	        },
	        plotOptions: {
	            area: {
	                pointStart: 1940,
	                marker: {
	                    enabled: false,
	                    symbol: 'circle',
	                    radius: 2,
	                    states: {
	                        hover: {
	                            enabled: true
	                        }
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'USA',
	            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
	                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
	                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
	                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
	                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
	                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
	                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
	        }, {
	            name: 'USSR/Russia',
	            data: [null, null, null, null, null, null, null, null, null, null,
	                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
	                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
	                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
	                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
	                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
	                21000, 20000, 19000, 18000, 18000, 17000, 16000]
	        }]
	    });
	 
	 $('#chart3').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: 'Browser market shares at a specific website, 2014'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Browser share',
	            data: [
	                ['Firefox',   45.0],
	                ['IE',       26.8],
	                {
	                    name: 'Chrome',
	                    y: 12.8,
	                    sliced: true,
	                    selected: true
	                },
	                ['Safari',    8.5],
	                ['Opera',     6.2],
	                ['Others',   0.7]
	            ]
	        }]
	    });
}

/**
 * 自定义滚动条
 */
function initScrollbar() {
	$('#centerDiv').mCustomScrollbar({
		verticalScroll:true,
		advanced:{
			autoExpandHorizontalScroll:true
		}
	});
	$("#centerDiv").mCustomScrollbar("update");
}

//初始化表格
function initTable(){
	$('#bootstrapTable').bootstrapTable({
		url: Constants.CONTEXT_PATH + "/task/getPageList.do",
		cache:false,
		method: 'get',
		height: 400,
		striped: true,
		dataType: "json",
		pagination: true,
		sidePagination : 'server', 
		showPaginationSwitch : true , 
		singleSelect: false, 
		pageSize: 2,
		pageNumber:1,
		pageList: [2,4,6],
		search: false, //不显示 搜索框
		showColumns: false, //不显示下拉框（选择显示的列）
		queryParams: queryParams,
		responseHandler: responseHandler
	});
	
	//查询
	$('#queryBtn').on('click', function(ev) {
		$('#bootstrapTable').bootstrapTable('refresh');
	});
	
	//添加按钮
	$('#addBtn').on('click', function(ev) {
		dialog({
				id  : "saveOrUpdateUserId",
				url : Constants.CONTEXT_PATH + "/user/findUserByUserId.do?userId=0",
				width : 580,
				height : 400,
				title : "编辑用户",
				button : [ {
					value : '确定',
					autofocus : true,
					callback : function() {
						$.gmsg({theme : "success"});
					}
				}, {
					value : '取消'
				} ]
			}).showModal();
	});
	
	//ajax异常
	$('#ajaxBtn').on('click', function(ev) {
		$.ajax( {
			type : 'GET',
			url :  Constants.CONTEXT_PATH + '/user/ajaxException.html',   
			async: false,//禁止ajax的异步操作，使之顺序执行。
			dataType : 'json',
			success : function(data,textStatus){
				alert(JSON.stringify(data));
			},
			error : function(data,textstatus){
				alert("error:" + data.responseText);
			}
		});
	});
	
	//title equal
	$('#titleEqualBtn').on('click', function(ev) {
		$.ajax( {
			type : 'GET',
			url :  Constants.CONTEXT_PATH + '/task/findByTitle.do',   
			async: false,//禁止ajax的异步操作，使之顺序执行。
			dataType : 'json',
			success : function(data,textStatus){
				alert("匹配查询 -> " + JSON.stringify(data));
			},
			error : function(data,textstatus){
				alert("error:" + data.responseText);
			}
		});
	});
	
	//title like
	$('#titleLikeBtn').on('click', function(ev) {
		$.ajax( {
			type : 'GET',
			url :  Constants.CONTEXT_PATH + '/task/findByTitleLike.do',   
			async: false,//禁止ajax的异步操作，使之顺序执行。
			dataType : 'json',
			success : function(data,textStatus){
				alert("模糊查询 -> " + JSON.stringify(data));
			},
			error : function(data,textstatus){
				alert("error:" + data.responseText);
			}
		});
	});
	
	//自定义sql 查询
	$('#sqlQueryBtn').on('click', function(ev) {
		$.ajax( {
			type : 'GET',
			url :  Constants.CONTEXT_PATH + '/task/getSQLPageList.do',   
			async: false,//禁止ajax的异步操作，使之顺序执行。
			dataType : 'json',
			success : function(data,textStatus){
				alert("自定义Sql查询 -> " + JSON.stringify(data));
			},
			error : function(data,textstatus){
				alert("error:" + data.responseText);
			}
		});
	});
}


function responseHandler(res) {
	if (res) {
		return { "rows": res.content, "total": res.totalElements};
	} else {
		return {"rows": [],"total": 0};
	}
}

//传递的参数
function queryParams(params) {
	var pageNumber = (params.offset == 0?1:params.offset);
	var search_LIKE_title = $('#search_LIKE_title').val();
	var search_LIKE_description = $('#search_LIKE_description').val();
	
	return {
		pageSize: params.limit,
		pageNumber: pageNumber,
		search_LIKE_title:search_LIKE_title,
		search_LIKE_description:search_LIKE_description
	};
}

/**
 * 绑定事件
 */
function bindEvent() {
	$("#rightMenu li").on("click",function(ev){
		switch($(this).attr("id")){
		case "addOrg":
			break;
		case "editOrg":
			break;
		case "delOrg":
			break;
		case "searchOrg":
			break;
		}
		dialog(
				{
					id  : "saveOrUpdateOrgd",
					url : Constants.CONTEXT_PATH
							+ "/user/toSaveOrUpdateOrg.do",
					width : 270,
					height : 100,
					title : "编辑部门",
					button : [ {
						value : '确定',
						autofocus : true,
						callback : function() {
							$.gmsg({theme : "danger"});
						}
					}, {
						value : '取消'
					} ]
		}).showModal();
		rightContext.hide(ev);
		
	});
	
	$("button").on(
			"click",
			function() {

				switch ($(this).attr("id")) {

				case "addUser":
					dialog(
							{
								id  : "saveOrUpdateUserId",
								url : Constants.CONTEXT_PATH
										+ "/user/findUserByUserId.do?userId=0",
								width : 580,
								height : 400,
								title : "编辑用户",
								button : [ {
									value : '确定',
									autofocus : true,
									callback : function() {
										$.gmsg({theme : "success"});
									}
								}, {
									value : '取消'
								} ]
							}).showModal();

					break;
				case "editUser":
					dialog(
							{
								id  : "saveOrUpdateUserId",
								url : Constants.CONTEXT_PATH
								+ "/user/findUserByUserId.do?userId=1",
								width : 580,
								height : 400,
								title : "编辑用户",
								button : [ {
									value : '确定',
									autofocus : true,
									callback : function() {
										$.gmsg({theme : "success"});
									}
								}, {
									value : '取消'
								} ]
							}).showModal();
					
					break;

				}
				

			});

}

/**
 * 打开部门树dialog
 * @iframeDocument 子页面的document，可以获取弹出窗口的一些信息
 */
function openOrgTreeDialog(){
	dialog(
			{
				id  : "orgTreeId",
				url : Constants.CONTEXT_PATH + "/user/toOrgTree.do",
				width : 230,
				height : 300,
				title : "部门树"
			}).show();
}

/**
 * 打开的部门树的双击事件调用的接口
 * @param ev
 * @param treeId
 * @param treeNode
 */
function orgTreeDlClick(ev,treeId,treeNode){
	if(dialog.get("saveOrUpdateUserId")){
		var orgName = dialog.get("saveOrUpdateUserId").iframeNode.contentDocument.getElementsByName("orgName")
		if(orgName){
			orgName[0].value = treeNode.name ;
		}
	}
	if(dialog.get("orgTreeId")){
		dialog.get("orgTreeId").close();
	}
	
}

/**
 * 高危帐号提醒
 */
function accountTip(){
	$.gmsg({theme : "warning",maskLayer : false ,contentHtml : "帐号存在异常操作!!",delayTime : 2 * 1000});
}


/**
 * 初始化用户布局
 */
function initUserLayout() {
	$(".main-container").height($(window).outerHeight() - 75);
	
	$('#user-index-layout').layout({
		applyDefaultStyles : true,
		spacing_open:2//边框的间隙 
	});
}

/**
 * initOrgUserTree
 */
function initOrgUserTree() {

	var setting = {
		"callback" : {
              onClick : function(event, treeId, treeNode){ //点击事件
            	   //更新右边用户列表
            	   
              },
              onRightClick : function(ev, treeId, treeNode){ //右键菜单
            	 rightContext =  $.gdropdown({content : "#rightMenu",target : ev.target,triev:ev,width : "90px",height : "50px"}); //返回值作为全局变量
              }
		}
	};
	$.ajax({
		url : Constants.CONTEXT_PATH + "/user/findOrgUserTree.do",
		success : function(zNodes) {
			var zTree = $.fn.zTree.init($("#userOrgTree"), setting, zNodes);
			autoComplete(zNodes, zTree);
		},
		error : function() {
			errorBox("服务器出错");
		}
	});

}
/**
 * 将tree的格式转话成autocomplete的格式
 */
function tree2autoComplate(treeData, list) {
	for (var i = 0; i < treeData.length; i++) {
		if (treeData[i].id != -1) {
			list.push({
				label : treeData[i].name,
				id : treeData[i].id,
				nodeType : treeData[i].nodeType
			});
		}
		if (treeData[i].children.length > 0) {
			tree2autoComplate(treeData[i].children, list);
		}
	}
	return list;
}

function autoComplete(treeData, zTree) {
	var data = tree2autoComplate(treeData, new Array());
	$("#orgUserSearch").autocompleter(
	{
		source : data,
		limit : 5,
		highlightMatches : true, // 高亮匹配的值
		customValue : "label", // 显示在input上的value
		callback : function(label, index, selected) {
			zTree.getNodesByFilter(function(node) {
				if (node.id == selected.id
						&& node.nodeType == selected.nodeType) {
					zTree.selectNode(node);
				}
			});
		}
	});
}
