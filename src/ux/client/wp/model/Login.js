Ext.define('Ext.ux.client.wp.model.Login', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'username', type: 'string'},
            {name: 'password', type: 'string'}
        ],
        
        identifier: {
            type: 'uuid'
        }
    }
});