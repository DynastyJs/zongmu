/**
 * @class  Demo.system.org.model.Org
 * 定义机构实体
 */
Gsui.define('Demo.system.org.model.Org',{
	
	extend : 'Demo.common.model.BaseModel',
	fields : ["name", "parentId"],//定义字段
	proxy : {//设置代理，这里人内存代理，可根据需要定义其它类型
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