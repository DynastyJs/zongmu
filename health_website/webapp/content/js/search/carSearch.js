$(function(){
	_car.init();
	
});

var _car =_car || {
	pageSize : 10,
	infoW : 120,
	colorMap : {},
	directMap : {0:"未知",1:'上',2:'下',3:'左',4:'右'},
	logoMap :{},
	pageBar:null,
	param:{
		numColor : -1,
		speed : -1,
		direction : -1,
		seatBelt : -1,
		phoning:-1,
		smoking : -1,
		tired : -1,
		visitorSel :-1,
		shapeType :-1,
		resType :-1,
		type :-1
	},
	init : function(){
//		$('#resultPanel').height($('#containPanel').height()-$('#northPanel').height()-25);
//		$('#resultCar').height($('#resultPanel').height()-$('#paginationBar').height());
		this.initEvent();
		this.initResult();
	},
	initEvent : function(){
		$.ajax({
		 url: Constants.CONTEXT_PATH+ '/resource/getcarColor.do?',
		 dataType : "json",
		 type : "post",
		 success : function(ret){
		 	var str ="";
		 	for(var i=0;i<ret.length;i++){
		 		if(ret[i].fieldDesc != ""){
		 			str+='<span class="outer selction" data-value="'+ret[i].fieldValue+'" ><span  title="'+ret[i].fieldName+'" class="inner  btn btn-default" style="background-color:'+ret[i].fieldDesc+'"></span></span>';
		 		}
		 		_car.colorMap[ret[i].fieldValue] = ret[i].fieldName;
		 	}
		 	$("#colorSel").append(str);
		 	
		 	if(ret.length > 0){
		 		$("#colorSel .selction").each(function(){
		 			var $li = $(this);
		 			var value = $li.data('value');
		 			$li.click(function(){
		 				var v =_car.param.numColor;
		 				if(v == value){
		 					return ;
		 				}else{
		 					_car.param.numColor = value;
		 					$('#colorSel .selction.active').removeClass("active");
		 					$li.addClass("active");
		 				}
		 			});
		 			
		 		});
		 	}
		 }
	 });
	 
	   $.ajax({
		 url: Constants.CONTEXT_PATH+ '/resource/getcarLogo.do?',
		 dataType : "json",
		 type : "post",
		 success : function(ret){
		 	var str ="";
		 	for(var i=0;i<ret.length;i++){
		 		if(ret[i].fieldDesc != ""){
		 			str+='<button type="button" data-value="'+ret[i].fieldValue+'" class="btn btn-default" style="height:30px;display:inline-block;margin:5px;" >'+ret[i].fieldName+'</button>';
		 		}
		 		_car.logoMap[ret[i].fieldValue] = ret[i].fieldName;
		 	}
		 	$("#typeSel ul").append(str);
		 	
			$("#typeSel ul button").each(function(){
		  		var $b=$(this);
		  		var value=$b.data("value");
		  		$b.click(function(){
		  			if(_car.param.type == value){
		  				return;
		  			}else{
		  				_car.param.type = value;
		  				$("#typeSel ul button.active").removeClass("active");
		  				$b.addClass("active");
		  			}
		  		});
		  });
	  
		 }
	  });
	  
	  $('#moreLogo').click(function(){
			var $b =$(this);
			var value = $b.data("value");
			if(value ==0 ){
				$("#typeSel").height(200);
				$("#typeSel ul").height(200);
				$b.data("value",1);
				$("#typeSel ul").css("overflow","auto");
				$b.text("收起");
			}else{
				$("#typeSel").height(35);
				$('#typeSel ul').animate({scrollTop:0}, 10);
				$("#typeSel ul").height(35);
				$("#typeSel ul").css("overflow","hidden");
				$b.data("value",0);
				$b.text("更多");
			}
		});
		
		$("#shapeSel ul button").each(function(){
		  		var $b=$(this);
		  		var value=$b.data("value");
		  		$b.click(function(){
		  			if(_car.param.shapeType == value){
		  				return;
		  			}else{
		  				_car.param.shapeType = value;
		  				$("#shapeSel ul button.active").removeClass("active");
		  				$b.addClass("active");
		  			}
		  		});
		  });
		  
		$('#speedSel .meter-label').each(function(){
			var $btn = $(this);
			var value = $btn.data('value');
			$btn.click(function(){
				$('#speedSel .meter-label.active').removeClass('active');
				$btn.addClass("active");
				_car.param.speed = value;
			});
		});
		
		$('#directSel .meter-label').each(function(){
			var $btn = $(this);
			var value = $btn.data('value');
			$btn.click(function(){
				$('#directSel .meter-label.active').removeClass('active');
				$btn.addClass("active");
				_car.param.direction =value;
			});
		});
		
		$('#sourceSel .meter-label').each(function(){
			var $btn = $(this);
			var value = $btn.data('value');
			$btn.click(function(){
				$('#sourceSel .meter-label.active').removeClass('active');
				$btn.addClass("active");
				_car.param.resType =value;
			});
		});
		
		$("#setBeltSel .dropdown-menu li").each(function(){
		 			var $li = $(this);
		 			var value = $li.data('value');
		 			var text = $li.text();
		 			var cur = $('#setBeltSel .dropdown-toggle');
		 			$li.click(function(){
		 				var v =cur.data("value");
		 				if(v == value){
		 					return ;
		 				}else{
		 					cur.data("value",value);
		 					_car.param.seatBelt = value;
		 					cur.html(text+' <span class="caret">');
		 				}
		 			});
		 			
		 });
		 
		$("#phoneSel .dropdown-menu li").each(function(){
		 			var $li = $(this);
		 			var value = $li.data('value');
		 			var text = $li.text();
		 			var cur = $('#phoneSel .dropdown-toggle');
		 			$li.click(function(){
		 				var v =cur.data("value");
		 				if(v == value){
		 					return ;
		 				}else{
		 					cur.data("value",value);
		 					_car.param.phoning = value;
		 					cur.html(text+' <span class="caret">');
		 				}
		 			});
		 			
		 });
		 
		$("#smokingSel .dropdown-menu li").each(function(){
		 			var $li = $(this);
		 			var value = $li.data('value');
		 			var text = $li.text();
		 			var cur = $('#smokingSel .dropdown-toggle');
		 			$li.click(function(){
		 				var v =cur.data("value");
		 				if(v == value){
		 					return ;
		 				}else{
		 					cur.data("value",value);
		 					_car.param.smoking = value;
		 					cur.html(text+' <span class="caret">');
		 				}
		 			});
		 			
		 });
		 
		$("#tiredSel .dropdown-menu li").each(function(){
		 			var $li = $(this);
		 			var value = $li.data('value');
		 			var text = $li.text();
		 			var cur = $('#tiredSel .dropdown-toggle');
		 			$li.click(function(){
		 				var v =cur.data("value");
		 				if(v == value){
		 					return ;
		 				}else{
		 					cur.data("value",value);
		 					_car.param.tired = value;
		 					cur.html(text+' <span class="caret">');
		 				}
		 			});
		 			
		 });
		
		$("#visitorSel .dropdown-menu li").each(function(){
		 			var $li = $(this);
		 			var value = $li.data('value');
		 			var text = $li.text();
		 			var cur = $('#visitorSel .dropdown-toggle');
		 			$li.click(function(){
		 				var v =cur.data("value");
		 				if(v == value){
		 					return ;
		 				}else{
		 					cur.data("value",value);
		 					_car.param.vistor = value;
		 					cur.html(text+' <span class="caret">');
		 				}
		 			});
		 			
		 });
		
		$('#searchBtn').click(function(){
			_car.btnSearch();
		});
		
		$('.bottombar .clopse').click(function(){
			var _this =$('.bottombar .clopse');
			var v = _this.data("value");
			$('#paramForm').stop();
			if(v == 0){
				$('#paramForm').slideUp();
				_this.addClass("active");
				_this.data("value",1);
			}else{
				$('#paramForm').slideDown();
				_this.removeClass("active");
				_this.data("value",0);
			}
			
		});
		
		
		
	},
	initResult : function(){
		var param ={
			pageSize : _car.pageSize,
			pageNumber : 1,
			sortType : "id"
		}
		_car.search(param);
	},
	btnSearch : function(){
		var param ={
			pageSize : _car.pageSize,
			pageNumber : 1
		}
		param = _car.loadParam(param);
		if(param == null){
			return ;
		}
		_car.search(param);
	},
	search : function(param){
			$.ajax({
			 url: Constants.CONTEXT_PATH+ '/carSearch/getListByType.do?',
			 dataType : "json",
			 type : "post",
			 data : param,
			 success : function(ret){
			 	var result = [];
			 	for(var i=0;i<ret.totalElements;i++){
			 		result.push(i);
			 	}
			 	if(result.length <= 0){
					_car.emptyPic();
					if(_car.pageBar != null){
						_car.pageBar.pagination("destroy");
					}
					return ;
				}else if(result.length <= _car.pageSize){
					if(_car.pageBar != null){
						_car.pageBar.pagination("destroy");
					}
					_car.showResult(ret.content);
					return ;
				}else{
				 	var options = {
							dataSource :result,
							pageSize : _car.pageSize,
							showGoInput: true,
					    	showGoButton: true,
							callback : function(response, pagination){
								if(pagination.direction == 0){
									_car.showResult(ret.content);
								}else{
									_car.loadResult(pagination.pageNumber);
								}
							}
					};
				}
				if(_car.pageBar != null){
					_car.pageBar.pagination("destroy");
				}
				_car.pageBar = $("#paginationBar").pagination(options);
			 }
		});
	},
	emptyPic : function(){
		$('#resultCar').empty();
	},
	loadParam : function(param){
		for(o in _car.param){
			if(_car.param[o] != -1){
				if( o == "speed"){
					if(_car.param[o] == 1){
						param["search_LT_"+o] = 60;
					}else if(_car.param[o] == 2){
						param["search_GTE_"+o] = 60;
						param["search_LTE_"+o] = 90;
					}else{
						param["search_GT_"+o] = 90;
					}
				}else{
					var name = "search_EQ_"+o;
					param[name] =_car.param[o];
				}
			}
		}
		var st = $("input[name='startTime']").val(); 
		if(st != ""){
			param["search_GTE_timeStamp"]=st;
		}
		var et = $("input[name='endTime']").val(); 
		if(et != ""){
			param["search_LTE_timeStamp"]=et;
		}
		if(st!= "" && et !="" && st > et){
			$.gmsg({contentHtml:'结束时间不能小于开始时间!',theme:'danger'});
			return ;
		}
		var num = $.trim($("input[name='number']").val());
		if(num != ""){
			param["search_LIKE_number"]=num;
		}
		param["sortType"]="id";
		return param;
	},
	loadResult : function(pageNumber){
		var param = {
			pageNumber : pageNumber,
			pageSize : _car.pageSize
		}
		
		param = _car.loadParam(param);
		if(param == null){
			return ;
		}
		$.ajax({
			 url: Constants.CONTEXT_PATH+ '/carSearch/getListByType.do?',
			 dataType : "json",
			 type : "post",
			 data : param,
			 success : function(ret){
			 	_car.showResult(ret.content);
			 }
	     });
	},
	showResult :function(result){
		$('#resultCar').empty();
		var mdsetarr = [] ;
		for(var i=0;i<result.length;i++){
				mdsetarr = mdsetarr.concat(_car.getByTpl(result[i]));
		}
		var str = mdsetarr.join("");
		$('#resultCar').html(str);
	},
	getByTpl : function(record){
		var url = top.uuidMapIpList[record.uuid] + "/"+record.imgUrl;
		var numUrl = "../content/images/carsearch/nocarnum.png";
		if(record.numUrl){
			numUrl = top.uuidMapIpList[record.uuid] + "/"+record.numUrl;
		}
		return [
			'<div class="car-list-item" style="margin:5px;width:200px;display:inline-block;">'
			+'	<div class="thumbnail" style="position:relative;">'
			 +'     <a><img alt="Load fail" onclick="_car.clickImg(\''+url+'\',\''+record.number+'\')" src="'+numUrl+'" style="width:100%;height:106px;"></a>'
			 +'     <div class="caption">'
			 +'       <p><span class="carinfo">车牌:</span><span class="carinfo">'+record.number+'</span></p>'
			 +'       <p><span class="carinfo">类型:</span><span class="carinfo">'+_car.logoMap[record.type]+'</span></p>'
			 +'       <p><span class="carinfo">颜色:</span><span class="carinfo">'+_car.colorMap[record.numColor]+'</span></p>'
			 +'      <p><span class="carinfo">时间:</span><span class="carinfo">'+record.timeStamp.substring(0,record.timeStamp.lastIndexOf("."))+'</span></p>'
			 +'      <p><span class="carinfo">车速:</span><span class="carinfo">'+record.speed+'KM/S</span></p>'
			 +'		<p><span class="carinfo">运动方向:</span><span class="carinfo">'+_car.directMap[record.direction]+'</span></p>'
			 +'     </div>'
			 +'   <p class="bottomInfo"><span>'+record.numConfidence+'%</span></p>'
			+'	</div>'
		+'	</div>'
		]
	},
	clickImg : function(url,name){
		$.fancybox({
					'href':url,
					'title':name,
					'type':'image',
					'transitionIn'	: 'elastic',
					'transitionOut'	: 'elastic'
		});
	}
}