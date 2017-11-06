/**
 * 用户Store 
 */
Gsui.define('Demo.system.user.store.UserStore',{
	
	extend : 'Gsui.data.Store',
	require : ['Demo.system.user.model.User'],
	model : 'Demo.system.user.model.User',
	proxy : {
		type : "memory",
		reader : {
			type : 'json'
		}
	}
});