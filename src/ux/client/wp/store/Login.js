Ext.define('Ext.ux.client.wp.store.Login', {
    extend: 'Ext.data.Store',
    
    requires: [
        'Ext.ux.client.wp.model.Login',
        'Ext.data.proxy.LocalStorage'
    ],
    
    config: {
        model: 'Ext.ux.client.wp.model.Login',
                
        proxy: {
            type: 'localstorage',            
            id: 'wplogin'
        },
        
        autoLoad: true
    }
});