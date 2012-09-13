Ext.define('Wp.view.Info', {
    extend: 'Ext.Container',
    xtype: 'info',
    id: 'Info',
    
    requires: [
        
    ],
    
    config: {
        layout: 'fit',
        styleHtmlContent: true,
        scrollable: 'vertical',
        title: 'Info',
        html: '<p><strong>Sencha Touch 2 WordPress connector</strong></p>' +
              '<p>Version: 1.0</p>' +
              '<p>Author: Constantine Smirnov, <a href="http://mindsaur.com/m">http://mindsaur.com</a></p>' +
              '<p>License: GNU GPL v3.0</p>' +
              '<p>GitHub: <a href="https://github.com/kostysh/Sencha-Touch-2-WordPress-connector">Sencha-Touch-2-WordPress-connector</a></p>'
    }
});