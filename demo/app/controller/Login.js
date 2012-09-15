Ext.define('Wp.controller.Login', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.device.Notification'
    ],
    
    config: {
        refs: {
            loginForm: '#loginform',
            saveBtn: '#loginform #savebtn'
        },
        
        control: {
            loginForm: {
                show: 'onLoginFormShow'
            },
            
            saveBtn: {
                tap: 'onSaveBtnTap'
            }
        }
    },
    
    onLoginFormShow: function(form) {
        var loginId = Ext.Wp.getLoginId();
        
        if (Ext.isObject(loginId)) {
            form.setValues({
                username: loginId.get('username'),
                password: loginId.get('password')
            });
        }
    },
    
    onSaveBtnTap: function() {
        var form = this.getLoginForm();
        var values = form.getValues();
        Ext.Wp.setLoginId(values, {
            success: function(options) {
                form.hide();
                // <debug>
                console.log('Wp.user.options', options);
                // </debug>
            },
            failure: function(err) {
                Ext.device.Notification.show({
                    title: 'Authentication failed',
                    message: err.message || 'Unknown error'
                });
            }
        });        
    }
});