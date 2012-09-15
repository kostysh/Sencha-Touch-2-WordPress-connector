Ext.define('Wp.controller.Toolbar', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            tools: '#tools'
        },
        
        control: {
            tools: {
                itemtap: 'onToolBarItemtap'
            }
        }
    },
    
    onToolBarItemtap: function(list, index, target, record) {
        console.log('Action', record.get('action'));
    }
});