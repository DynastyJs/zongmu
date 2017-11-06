/**
 * @class  Demo.system.org.store.OrgStore
 * 定义机构store
 */
Gsui.define('Demo.system.org.store.OrgStore',{
	
	extend : 'Gsui.store.Store',
	require : ['Demo.system.org.model.Org'],//依赖了org实体
	model : 'Org',
	proxy : {
		type : "memory",//'设置为内存store,只为了方便演示，实际用的比较多的个ajax类型,可参考api文档'
		reader : {
			type : 'json',
			rootProperty : 'users'
		}
	}
});