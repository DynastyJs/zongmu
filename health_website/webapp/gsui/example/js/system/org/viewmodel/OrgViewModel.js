/**
 * @class Demo.system.org.viewmodel.OrgViewModel
 * 机构ViewModel,处理数据管理方面问题
 */
Gsui.define('Demo.system.org.viewmodel.OrgViewModel',{
	extend : 'Demo.common.viewmodel.BaseViewModel',
	alias : 'viewmodel.orgviewmodel',
	
	//如果模块较简单，可以一次注入所用的数据模块与store,但模块业务复杂情况，
	//可以用reqires的方式动态注入，以保证模块加载的速度
	requires : ['Demo.system.org.model.Org','Demo.system.org.store.FileStore'],
	data : {
		myData : {
			users: [//静态定义机构数据
				{
					id: 1,
					name: 'Ed Spencer',
					phoneNumber: '555 1234'
				},
				{
					id: 2,
					name: 'Abe Elias',
					phoneNumber: '666 1234'
				}
			]
		},
		orgTreeData : {//定义机构树数据
			root: {
		        expanded: true,
		        children: [
		            { text: "detention", leaf: true },
		            { text: "homework", expanded: true, children: [
		                { text: "book report", leaf: true },
		                { text: "algebra", leaf: true}
		            ] },
		            { text: "buy lottery tickets", leaf: true }
		        ]
		    }
		}
	},
	
	
	stores: {//这里设置的store是会生成store实例的
		orgs: {
			model: 'Demo.system.org.model.Org',
			autoLoad: true,
			session: true,
			data : '{myData}',
			rootProperty : 'users'
		},
		treeorgs : {//定义机构树treestore,
			type : 'tree',
			//model: 'Demo.system.org.model.Org',
			rootVisible : true,
			root : '{orgTreeData.root}',
		},
		files :Gsui.create('Demo.system.org.store.FileStore')
	}
});