Ext.define('Wp.view.Toolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'wptoolbar',
    id: 'tools',
    
    requires: [
        'Ext.SegmentedButton'
    ],
    
    config: {
        docked: 'top',
        hidden: true,
        
        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },
        
        items: [
            {
                id: 'actions',
                xtype: 'segmentedbutton',
                
                items: [
                    {
                        text: '+ Post'
                    },
                    {
                        text: '+ Page'
                    },
                    {
                        text: 'Posts'
                    },
                    {
                        text: 'Pages'
                    },
                    {
                        text: 'Comments'
                    }
                ]
            }
        ]
    }
});