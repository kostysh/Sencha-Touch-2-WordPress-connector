Ext.define('Wp.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        routes: {
            'page/:id': 'showPageById'
        },
        
        refs: {
            mainView: 'main',
            infoBtn: 'main #infobtn',
            mimiBtn: 'main #mimibtn'
        },
        
        control: {
            mainView: {
                activeitemchange: 'onActiveItemChange'
            },
            
            infoBtn: {
                tap: 'onInfoBtnTap'
            },
            
            mimiBtn: {
                tap: 'onMimiBtnTap'
            }
        }
    },
        
    init: function() {
        var me = this;
        me.history = me.getApplication().getHistory();
    },
    
    addToHistory: function(type, id) {
        this.history.add(Ext.create('Ext.app.Action', {
            url: type + '/' + id
        }), true);
    },
    
    onActiveItemChange: function(nv, item) {
        this.addToHistory('page', item.getId());        
    },
    
    showPageById: function(id) {
        var mainView = this.getMainView();
        
        if (id === 'Main') {
            mainView.pop();
        } else {
            var cmp = Ext.getCmp(id);

            if (!cmp) {
                cmp = Ext.create('Wp.view.' + id);
            }
            
            if (cmp) {
                mainView.push(cmp);
            } else {
                mainView.pop();
            }      
        }
    },
    
    onInfoBtnTap: function() {
        this.getMainView().push({
            xtype: 'info'
        });
    },
    
    onMimiBtnTap: function() {
        Ext.jsonRPC.getCategories({
            blog_id: 1,
            username: 'sencha',
            password: 'qwerty'
        }, this.onGetCategoriesLoad);
    },
    
    onGetCategoriesLoad: function(result) {
        console.log('Categories', result);
        
        Ext.device.Notification.show({
            title: 'Success!',
            message: 'We got categories, details in console'
        });
    }
});