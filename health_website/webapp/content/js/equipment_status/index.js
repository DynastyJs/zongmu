
$(function(){
	$("#btn2").click(function(){
		//addDiv();
		getStatus();
	});
	
	init();
});
serverTable.refreshTb();

var serverTable={
		refreshTb:function()
		{
			alert($("#id").val());
			alert("finsh");
		}
}
function init()
{
	$.ajax({
		url:'getCheckedEqType.do',
		method:'get',
		dataType:'json',
		success:function(eqType)
		{
			//alert("success");
			for(var i=0; i<eqType.length; i++)
			{
				var div_text = '<fieldset><legend>'+eqType[i][2]+'</legend><div class="row" style="height:200px; overflow:auto" id="'+eqType[i][0]+'">'
					+'<div class="col-md-6" >设备1</div></div></fieldset>';
				
				$("#user-index-layout").append(div_text);
			}
		},
		error:function(){
			alert("error");
		}
	})

}

function addDiv()
{
	var eqs = [{id:1, name:"设备1", status:"正常"},{id:2, name:"设备2", status:"离线"},{id:3, name:"设备3", status:"空闲"}];
	$.each(eqs, function(i, item){
		
		var div_text = '<div class="col-md-6" align="left"><div class="thumbnail"><div class="row">'
			+'<div class="col-md-3" align="center"><div class="thumbnail colorBox" style="height:100px; background-color:green !important">图</div>'
			+'</div><div class="col-md-9" align="left" ><div class="row">'+item.name+':'+item.status+'</div></div></div></div></div>';
		$("#div-server").append(div_text);
	});
	//$("#div-server");
}

function getStatus()
{
	alert("ajax");
	var seach_param = {search_EQ_equipmentId:423};
	$.ajax({
//		data:seach_param,
		url:'getPageList.do',
		method:'get',
		dataType:'json',
		success:function(data)
		{
			alert("success");
			//alert($(data).find('Name').text());
			deal(data);
		},
		error:function(){
			alert("error");
		}
	})
}

/**
 * 
 * @param data
 */
function deal(data)
{
	var list = data.content;
	var info = '';
	var eqArray = [];
	$.each(list, function(i, item){
		//info += item.propertyName+" "+item.propertyValue+';';
//		var id = item.equipmentId;
//		for(var j=0; j<eqArray.length; j++)
//		{
//			if(id == eqArray[j].id)
//			{
//				eqArray[j].value.push(item);
//			}
//			
//		}
	});
	function exists(rows, id){
		for(var i=0; i<rows.length; i++){
			if (rows[i].id == id) return i;
		}
		return -1;
	}
	for(var i=0; i<list.length; i++)
		{
		var item = list[i];
		var id = list[i].id.equipmentId;
		var eqIndex = exists(eqArray, id);
		if(eqIndex == -1){
			var eqstatus = new Object();
			eqstatus.id = id;
			eqstatus.propertyList = [];
			eqstatus.info = list[i].id.propertyName+' '+list[i].propertyValue+'; <br/>';
			eqArray.push(eqstatus);
		}
		else{
			eqArray[eqIndex].info += list[i].id.propertyName+' '+list[i].propertyValue+'; <br/>';
			eqArray[eqIndex].propertyList.push(item);
		}
		//info += item.propertyName+" "+item.propertyValue+';'
		}
	
	for(var i=0; i<eqArray.length; i++)
		{
		if( $('#'+eqArray[i].id).length >0)//元素存在
		{
			$('#'+eqArray[i].id).html(eqArray[i].id+'<br/>'+eqArray[i].info+"111");
		}
		else
		{
		var div_text = '<div class="col-md-6" align="left">' 
			+'<div class="thumbnail"><div class="row">'
			
			+'<div class="col-md-3" align="center"><div class="thumbnail colorBox" style="height:100px; background-color:green !important">图</div>'
			+'<button  id=btn-'+eqArray[i].id+' class="btn btn-default" onClick="dealEq('+eqArray[i].id+ ')">处理</button>'
			+'</div><div class="col-md-9" align="left" ><div class="row" id='+eqArray[i].id+'>'+eqArray[i].id+'<br/>'+eqArray[i].info
			+'</div></div></div></div></div>';
		
		$("#div-server").append(div_text);
		}
		}
}

function dealEq(id)
{
	alert(id);
}