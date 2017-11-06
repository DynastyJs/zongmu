var Util = (function(){
	return {
		apply : function(o, c, defaults){
		    // no "this" reference for friendly out of scope calls
		    if(defaults){
		        Util.apply(o, defaults);
		    }
		    if(o && c && typeof c == 'object'){
		        for(var p in c){
		            o[p] = c[p];
		        }
		    }
		    return o;
		},
		 /**
		  * 判断是否为空值
         * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         */
		isEmpty : function(v, allowBlank){
            return v === null || v === undefined || (($.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },
		/**
		 * 把数据设置到对应的目
		 */
		loadData : function(target, data){
			if (typeof data == 'string'){
				$.ajax({
					url: data,
					dataType: 'json',
					success: function(data){
						_load(target,data);
					}
				});
			} else {
				_load(target,data);
			}
			
			function _load(target,data){
				var obj = $('#'+target);
				if(Util.isHTMLElement(obj,'form')){
					for(var name in data){
						var val = data[name];
						$('input[name='+Util.escName(name)+']', obj).val(val);
						$('textarea[name='+name+']', obj).val(val);
						$('select[name='+name+']', obj).val(val);
					}
				}else{
					for(var name in data){
						var val = data[name];
						$('#'+Util.escName(name), obj).html(val);
					}
				}
				
			}
		},
		/**
		 * 转义id或者name的名字，以方便jquery查询
		 */
		escName : function(name,delimiter){
			if(typeof delimiter == 'undefined' || !delimiter){
				delimiter = ".";
			}
			var arrName = name.split(delimiter);
			var returnName = '';
			if(arrName.length > 1){
				$.each(arrName,function(item,i){
					if(i == 0){
						returnName += item;
					}else
						returnName += ('\\'+delimiter+item);
				});
				return returnName;
			}else
				return name;
		},
		/**
		 * 判断元素dom类型
		 * @param ele The element to test
		 * @param nodeName eg "input", "textarea" - check for node name (optional)
		 *         if nodeName is an array then check all for a match.
		 */
		isHTMLElement : function(ele, nodeName) {
		  var target = $(ele);
		  if (target == null || typeof target != "object" || target[0].nodeName == null) {
		    return false;
		  }
		  if (nodeName != null) {
		    var test = target[0].nodeName.toLowerCase();
		    if (typeof nodeName == "string") {
		      return test == nodeName.toLowerCase();
		    }
		    if ($.isArray(nodeName)) {
		      var match = false;
		      for (var i = 0; i < nodeName.length && !match; i++) {
		        if (test == nodeName[i].toLowerCase()) {
		          match =  true;
		        }
		      }
		      return match;
		    }
		    return false;
		  }
		  return true;
		},
		/**
		 * 添加前缀到对象的每一个属性
		 */
		addPrefix : function(obj,prefix){
			var returnObj = {};
			$.iterate(obj,function(property,value){
				if(value != null && value != ''){
					if(typeof value == 'string'){//修复换行符导致eval错误
						value = "'"+value.replace(/\r\n/ig,"<br>")+"'";
					}else if(typeof value == 'object')return;
					eval('returnObj["'+prefix+'.'+property+'"]='+value);
				}else if(typeof value == 'number'){
					eval('returnObj["'+prefix+'.'+property+'"]='+value);
				}else
					eval('returnObj["'+prefix+'.'+property+'"]=null');
			});
			return returnObj;
		},
		/**
		 * 删除前缀到对象的每一个属性
		 */
		removePrefix : function(obj){
			var returnObj = {};
			$.iterate(obj,function(key,value){
				var arrprefix = key.split('.');
				returnObj[arrprefix[arrprefix.length-1]] = value;
			});
			return returnObj;
		},
		/**
		 * 设置属性值
		 */
		 setValue : function(obj, keyPath, value){
			keyPath = keyPath.split('.');
			lastKeyIndex = keyPath.length - 1;
			for ( var i = 0; i < lastKeyIndex; ++i) {
				key = keyPath[i];
				if (!(key in obj))
					obj[key] = {};
				obj = obj[key];
			}
			obj[keyPath[lastKeyIndex]] = value;
        },
        getValue : function(obj, keyPath){
//			keyPath = keyPath.split('.');
//			lastKeyIndex = keyPath.length - 1;
//			for ( var i = 0; i < lastKeyIndex; ++i) {
//				key = keyPath[i];
//				if (!(key in obj))
//					obj[key] = {};
//				obj = obj[key];
//			}
//			obj[keyPath[lastKeyIndex]] = value;
        	try{
        		return eval('obj.'+keyPath);
        	}catch(err){
        		return null;
        	}
        	
        },
        getObjFromForm : function(jq){
        	var paramObj = {};
        	$.each(jq.serializeArray(), function(i, kv) {
        	  if (paramObj.hasOwnProperty(kv.name)) {
        	    paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
        	    paramObj[kv.name].push(kv.value);
        	  }
        	  else {
        	    paramObj[kv.name] = kv.value;
        	  }
        	});
        	return paramObj;
        },
        toStr : function(arr,field,delimiter){
    		if(!field)
    			field = 'id';
    		if(!delimiter)
    			delimiter = ',';
    		var returnString = '';
    		for(var i = 0;i < arr.length;i++){
    			if(typeof arr[i] == 'object')//process the ext record type 
    				returnString += Util.getValue(arr[i],field)+delimiter;
    			else
    				returnString += (arr[i])[field]+delimiter;
    		}
    		return returnString;
    	},
    	toSubArray : function(arr,field,delimiter){
    		if(!field)
    			field = 'id';
    		if(!delimiter)
    			delimiter = ',';
    		var returnArr = [];
    		for(var i = 0;i < arr.length;i++){
    			if(typeof arr[i] == 'object')//process the ext record type 
    				returnArr.push(Util.getValue(arr[i],field));
    			else
    				returnArr.push((arr[i])[field]);
    		}
    		return returnArr;
    	},
    	
    	/**
    	 * 把jsobject(包括array属性)转化为queryString
    	 * @param a
    	 * @param traditional
    	 * @returns
    	 */
    	param: function( a, traditional ) {
    		var s = [],
    			add = function( key, value ) {
    				// If value is a function, invoke it and return its value
    				value = $.isFunction( value ) ? value() : value;
    				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    			};

    			traditional = false;
    		if ( $.isArray( a ) || ( a.jquery && !$.isObject( a ) ) ) {
    			$.each( a, function() {
    				add( this.name, this.value );
    			});

    		} else {
    			for ( var prefix in a ) {
    				Util.buildParams( prefix, a[ prefix ], traditional, add );
    			}
    		}
    		return Util.keepLB(s.join( "&" ).replace( /%20/g, "+" ));
    	},
    	/**
		 * 在换行符\n下添加\r,成为组合\r\n换行符,ie8提交时是\r\n
		 */
    	keepLB : function(str) {
    		if(/%0D%0A/.test(str))//ie8
    			return str;
    		var reg=new RegExp("(%0A)", "g");
    		return str.replace(reg,"%0D$1");
    	},
    	/**
    	 * param的辅助方法
    	 * @param prefix
    	 * @param obj
    	 * @param traditional
    	 * @param add
    	 * @returns
    	 */
    	buildParams : function(prefix, obj, traditional, add ){
    		if ( $.isArray( obj ) ) {
    			$.each( obj, function( v, i ) {
    				if ( traditional || /\[\]$/.test( prefix ) ) {
    					add( prefix, v );

    				} else {
    					Util.buildParams( prefix + "[" + ( typeof v === "object" ? i : i ) + "]", v, traditional, add );
    				}
    			});

    		} else if ( !traditional && typeof obj  === "object" ) {
    			for ( var name in obj ) {
    				Util.buildParams( prefix + "." + name , obj[ name ], traditional, add );
    			}

    		} else {
    			add( prefix, obj );
    		}
    	},
    	clone : function(item) {
    		if (!item) { return item; } // null, undefined values check

    	    var types = [ Number, String, Boolean ], 
    	        result;

    	    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    	    $.each(types,function(type) {
    	        if (item instanceof type) {
    	            result = type( item );
    	        }
    	    });

    	    if (typeof result == "undefined") {
    	        if (Object.prototype.toString.call( item ) === "[object Array]") {
    	            result = [];
    	            var index = 0;
    	            $.each(item,function(child){
    	            	result[index] = Util.clone( child );
    	            	index++;
    	            });
    	        } else if (typeof item == "object") {
    	            // testing that this is DOM
    	            if (item.nodeType && typeof item.cloneNode == "function") {
    	                var result = item.cloneNode( true );    
    	            } else if (!item.prototype) { // check that this is a literal
    	                if (item instanceof Date) {
    	                    result = new Date(item);
    	                } else {
    	                    // it is an object literal
    	                    result = {};
    	                    for (var i in item) {
    	                        result[i] = Util.clone( item[i] );
    	                    }
    	                }
    	            } else {
    	                // depending what you would like here,
    	                // just keep the reference, or create new object
    	                if (false && item.constructor) {
    	                    // would not advice to do that, reason? Read below
    	                    result = new item.constructor();
    	                } else {
    	                    result = item;
    	                }
    	            }
    	        } else {
    	            result = item;
    	        }
    	    }

    	    return result;
    	}
	};
})();