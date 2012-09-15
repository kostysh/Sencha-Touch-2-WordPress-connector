Ext.define('Ext.ux.client.wp.model.CategoryRss', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.ux.client.wp.model.CategoryItems'
    ],
    
    config: {
        fields: [
            {name: 'title', type: 'string'},
            {name: 'description', type: 'string'}
        ],
        
        associations: [
            {
                type: 'hasMany', 
                model: 'Ext.ux.client.wp.model.CategoryItems',
                name: 'item'
            }
        ]
    }
});