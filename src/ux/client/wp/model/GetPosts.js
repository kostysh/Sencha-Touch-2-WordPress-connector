Ext.define('Ext.ux.client.wp.model.GetPosts', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'blog_id', type: 'string', defaultValue: 1},
            {name: 'username', type: 'string'},
            {name: 'password', type: 'string'}
        ],
        
        validations: [
            {type: 'presence', field: 'blog_id'},
            {type: 'presence', field: 'username'},
            {type: 'presence', field: 'password'}
        ]
    }
});