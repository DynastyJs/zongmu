/**
 * @class  Demo.system.org.controller.OrgGridPanelController
 * 定义机构表格组件的ViewController，处理ui方面的逻辑与响应
 */
Gsui.define('Demo.system.org.controller.OrgGridPanelController',{
	extend : 'Gsui.app.ViewController',
	
	onAdd : function(){
		this.fireEvent('orgadded');//广播orgadded事件
	}
});