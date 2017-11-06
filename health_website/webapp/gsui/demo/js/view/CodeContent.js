Gsui.define('Demo.view.CodeContent', {
    extend: 'Gsui.panel.Panel',
    alias: 'widget.codeContent',
    scrollable: true,
    
    cls: 'code-content',
    
    afterRender: function() {
        this.callParent(arguments);
      /**  Gsui.Loader.loadScript({
        	url : '/lib/prettify/prettify.js',
        	onLoad : function(){
        		prettyPrint();
        	}
        });**/
        prettyPrint();
    }
});