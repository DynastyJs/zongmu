/**
 * 用户实体 
 */
Gsui.define('Demo.system.user.model.User',{
	
	extend : 'Demo.common.model.BaseModel',
	fields : ["name", "parentId","email"],
	proxy : {
		type : "memory",
		reader : {
			type : 'json',
			rootProperty : 'users'
		}
	},
	validators : {
		name : {
			type : "length",
			min : 1
		}
	} 
});