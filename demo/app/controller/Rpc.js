Ext.define('Wp.controller.Rpc', {
    extend: 'Ext.app.Controller',    
    
    requires: [
        'Ext.ux.client.wp.Wp',
        'Ext.device.Notification'
    ],
    
    config: {
        refs: {
            wpToolBar: '#tools'
        }
    },
    
    init: function() {
        var me = this;
        
        Ext.Wp = Ext.create('Ext.ux.client.wp.Wp', {
            url: 'http://mindsaur.com/demo/wp/xmlrpc.php',
            blogId: 1
        });
        
        // Listen for Wp client exceptions
        Ext.Wp.on({
            scope: Ext.Wp,
            exception: function(err) {
                Ext.Viewport.setMasked(false);                
                Ext.device.Notification.show({
                    title: err.title || 'Exception',
                    message: err.message || 'Unknown error'
                });
            },
            authenticationsuccess: function() {
                var toolbar = me.getWpToolBar();
                if (toolbar && toolbar.isComponent) {
                    toolbar.setHidden(false);
                }
            },
            authenticationfailure: function() {
                var toolbar = me.getWpToolBar();
                if (toolbar && toolbar.isComponent) {
                    toolbar.setHidden(true);
                }
            }
        });
    }
});