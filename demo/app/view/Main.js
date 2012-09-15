Ext.define('Wp.view.Main', {
    extend: 'Ext.NavigationView',
    id: 'home',
        
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
                layout: 'fit',
                
                items: [
                    {
                        docked: 'bottom',
                        xtype: 'toolbar',

                        items: [
                            {
                                id: 'setbtn',
                                xtype: 'button',
                                iconCls: 'settings',
                                iconMask: true,
                                align: 'left'
                            },
                            
//                            {
//                                id: 'menubtn',
//                                xtype: 'button',
//                                iconCls: 'list',
//                                iconMask: true,
//                                align: 'right'
//                            },
                            
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
                        xtype: 'wptoolbar'
                    }
                ]
            }
        ]

                
    }
});
