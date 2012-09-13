Ext.define('Wp.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'main',
        
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer'
    ],
    
    config: {
        fullscreen: true,
        
        items: [
            {
                id: 'Main',
                title: 'WP connector',
                
                items: [
                    {
                        docked: 'bottom',
                        xtype: 'toolbar',

                        items: [
                            {
                                xtype: 'spacer'
                            },

                            {
                                id: 'infobtn',
                                xtype: 'button',
                                iconCls: 'info',
                                iconMask: true,
                                align: 'right'
                            }
                        ]
                    },
                    {
                        id: 'mimibtn',
                        xtype: 'button',
                        centered: true,
                        text: 'MIMI'
                    }
                ]
            }
        ]

                
    }
});
