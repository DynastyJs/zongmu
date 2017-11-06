var MyPagination = function(){
	
	var config = {
		targetId : '',
		url : '',
		defaultsPages : 5,
		loadCallback : function(){},
		pageSize : 0,
		pageNumber : 0
	}
	var totalPage = 0;
	var currentPage = 0;
	function load(params){
		params.pageSize = params.pageSize ? params.pageSize : config.pageSize ;
		params.pageNumber = params.pageNumber ? params.pageNumber : config.pageNumber;
		$.ajax({
            	  		url : config.url,
            	  		data : params,
						dataType : "json",
						success : function(response) {
							loadCallback.call(this,response);
						}
          });
		
	}
	function initPages(){
			$(config.targetId).find("li").each(function(index){
				$li = $(this);
				$li.click(function(){
					var v =$(this).data("value");
				});
			});
	}
	
	function reset(){
		$(config.targetId).find("li").each(function(index){
				$li = $(this);
				$li.removeClass("active");
				$li.addClass("disabled");
				if($(this).data("value") != "pre" && $(this).data("value") != "next"){
					$(this).data("value",index);
					$(this).find("a").html(index);
				}
		});
	}
	return {
		init : function(c){
			for(var o in c){
				config[o] =c[o];
			}
			
			initPages();
		},
		reset : reset,
		load : load
	};
};