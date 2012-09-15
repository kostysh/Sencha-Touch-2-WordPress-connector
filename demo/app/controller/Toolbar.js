Ext.define('Wp.controller.Toolbar', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            tools: '#actions'
        },
        
        control: {
            tools: {
                toggle: 'onToolBarToggle'
            }
        }
    },
    
    onToolBarToggle: function(container, button, pressed) {
        console.log("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
    }
});