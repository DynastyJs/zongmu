

$(function(){
	
	bindEvent();
});

/**
 * 绑定事件
 */
function bindEvent() {

	var ret1 = null ;
	$("input[name='school']").on("click", function(ev) {
		ret1 = $.gdropdown({
			content : "#for-school",               //content 必填 需要显示的下拉框内容块,可以为jq选择器获取原生js dom对象
			target : "input[name='school']",       //target  必填 需要吸附到的元素位置 ,可以为jq选择器获取原生js dom对象
			triev : ev                             //triev   必填 触发显示下拉框的事件源，用于隐藏下来内容块，过滤事件
		});
	});
	
	$("#for-school .list li").on("click", function(event) {
		$("input[name='school']").val($(this).text());
		ret1.hide(event);
	});
	
	 $("input[name='skill']").on("click",function(ev){
		   $.gdropdown({content : "#for-skill",target : "input[name='skill']",triev : ev});
	   });
	 $("input:checkbox").on("click",function(){
			if($(this).is(":checked")){
				var value = $("input[name='skill']").val().concat($(this).parent().text() + ",");
				$("input[name='skill']").val(value);
			}else{
				var getValue = $(this).parent().text() + ",";
				var value = $("input[name='skill']").val();
				$("input[name='skill']").val(value.replace(getValue,""));
			}
	  });
    
    $("input[name='birthday']").on("click",function(){
    	WdatePicker(); //dateFmt可以按格式显示日期表
    });
    
    $("input[name='orgName']").on("click",function(){
    	window.parent.openOrgTreeDialog();
    });

}