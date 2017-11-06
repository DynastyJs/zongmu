/**
 * @class Demo.Viewport
 * 主页面Viewport
 */
Gsui.define('Demo.Viewport',{
	
	extend : 'Gsui.container.Viewport',
	layout : 'border',//设置布局模式
	items : [{
		region : 'north',
		height : 65,
		bodyStyle : 'background-color:#157fcc'
	},{
		region : 'center',
		layout : 'fit',
		items : {
			xtype : 'tabpanel',
			items : [{
				title : '增删改演示',
				layout : 'fit',
				items : {
					xtype : 'uxiframe',
					src : 'crud/crud.html',
					listeners : {
						 load: function(iframeComponent){
					            //debugger
					        },
					      beforeload: function(iframeComponent, src){
					          // debugger;
					     }
					}
				}
			},{
				title : '机构管理',
				layout : 'fit',
				items : {
					xtype : 'uxiframe',
					src : 'system/org/org.html'
					//src : 'http://www.baidu.com'
				}
			},{
				title : '组件通信',
				layout : 'fit',
				items : {
					xtype : 'uxiframe',
					src : 'system/user/user.html',
					listeners : {
						 load: function(iframeComponent){
					            //debugger
					        },
					      beforeload: function(iframeComponent, src){
					          // debugger;
					     }
					}
				}
			}]
		}
	}]
});