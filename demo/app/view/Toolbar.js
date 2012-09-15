Ext.define('Wp.view.Toolbar', {
    extend: 'Ext.dataview.List',
    xtype: 'wptoolbar',
    id: 'tools',
    
    config: {
        hidden: true,
        disableSelection: true,
        
        itemTpl: '{title}',
        
        data: [
            {
                title: '+ Post', 
                action: 'addpost'
            },

            {
                title: '+ Page', 
                action: 'addpage'
            },

            {
                title: 'Posts', 
                action: 'getposts'
            },

            {
                title: 'Pages', 
                action: 'getpages'
            },

            {
                title: 'Comments', 
                action: 'getcomments'
            }
        ]
    }
});