/**
 * 部门树
 */

$(function(){
	initOrgTree();
});

/**
 * initOrgUserTree
 */
function initOrgTree() {

	var setting = {
			view : {
				showLine : false,
				selectedMulti : false,
				showIcon : true//, //dontShowAreaIcon
			},
		"callback" : {
			onDblClick : function(event, treeId, treeNode){ 
            	   if(window.parent.orgTreeDlClick)
            		   window.parent.orgTreeDlClick(event, treeId, treeNode);//双击事件，调用父页面接口
              }
		}
	};
	$.ajax({
		url : Constants.CONTEXT_PATH + "/user/findOrgTree.do?fresh=" + Math.random(),
		dataType : "json" ,
		success : function(zNodes) {
			var zTree = $.fn.zTree.init($("#orgTree"), setting, zNodes);
			autoComplete(zNodes, zTree);
		},
		error : function() {
			//$.msg({theme:"danger"});
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
	$("#orgSearch").autocompleter(
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
