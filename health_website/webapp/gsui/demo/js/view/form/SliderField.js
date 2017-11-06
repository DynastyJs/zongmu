/**
 * Shows how the Slider control can be used in a form and participate like a form field.
 */
Gsui.define('Demo.view.form.SliderField', {
    extend: 'Gsui.form.Panel',
    
    requires: [
        'Gsui.slider.Single'
    ],
    xtype: 'slider-field',
    //<example>
    exampleTitle: 'Slider field example',
    themes: {
        classic: {
            labelWidth: 125
        },
        neptune: {
            labelWidth: 125
        },
        'neptune-touch': {
            labelWidth: 150
        }
    },
    //</example>
    
    width: 400,
    title: 'Sound Settings',
    bodyPadding: 10,
   
    initComponent: function(){
        this.msgTpl = new Gsui.Template(
            'Sounds Effects: <b>{fx}%</b><br />',
            'Ambient Sounds: <b>{ambient}%</b><br />',
            'Interface Sounds: <b>{iface}%</b>'
        );
        Gsui.apply(this, {
            defaults: {
                labelWidth: this.themeInfo.labelWidth,
                anchor: '95%',
                tipText: function(thumb){
                    return String(thumb.value) + '%';
                } 
            },
            defaultType: 'slider',
            items: [{
                fieldLabel: 'Sound Effects',
                value: 50,
                name: 'fx'
            },{
                fieldLabel: 'Ambient Sounds',
                value: 80,
                name: 'ambient'
            },{
                fieldLabel: 'Interface Sounds',
                value: 25,
                name: 'iface'
            }],
            bbar: [{
                text: 'Max All',
                scope: this,
                handler: this.onMaxAllClick
            }, '->', {
                text: 'Save',
                scope: this,
                handler: this.onSaveClick
            }, {
                text: 'Reset',
                scope: this,
                handler: this.onResetClick
            }]
        });
        this.callParent();
    },
    
    onMaxAllClick: function(){
        Gsui.suspendLayouts();
        this.items.each(function(c){
            c.setValue(100);
        });
        Gsui.resumeLayouts(true);
    },
    
    onSaveClick: function(){
        Gsui.Msg.alert({
            title: 'Settings Saved',
            msg: this.msgTpl.apply(this.getForm().getValues()),
            icon: Gsui.Msg.INFO,
            buttons: Gsui.Msg.OK
        }); 
    },
    
    onResetClick: function(){
        this.getForm().reset();
    }
});
