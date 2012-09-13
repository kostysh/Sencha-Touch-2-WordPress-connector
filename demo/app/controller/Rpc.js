Ext.define('Wp.controller.Rpc', {
    extend: 'Ext.app.Controller',    
    
    requires: [
        'Ext.ux.data.Jsonrpc',
        'Ext.device.Notification'
    ],
    
    config: {
        models: [
            'Wp.model.rpc.GetCategories'
        ]
    },
    
    init: function() {
        var me = this;
        
        Ext.jsonRPC = Ext.create('Ext.ux.data.Jsonrpc', {
            url: 'http://mindsaur.com/demo/wp/xmlrpc.php',
            protocol: 'XML-RPC',
            timeout: 10000,
            scope: me,
        
            // Remote API definition
            api: [
                {
                    name: 'wp.getCategories',
                    alias: 'getCategories',
                    model: 'Wp.model.rpc.GetCategories'
                }
            ],

            hooks: {
                getCategories: function(result) {

                    // <debug>
                    if (Ext.isObject(result)) {
                        console.log('Server response: ', result);
                    }
                    // </debug>

                    return result;
                }
            },
        
            // Default exception handler
            error: function(err) {
                Ext.device.Notification.show({
                    title: err.title || 'Fail!',
                    message: err.message || 'Unknown error'
                });
            }
        });
    }
});