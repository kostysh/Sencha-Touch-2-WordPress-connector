Ext.define('Wp.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.Picker'
    ],
    
    config: {
        views: [
            'Wp.view.Login',
            'Wp.view.CategoryPicker'
        ],        
        
        routes: {
            'page/:id': 'showPageById'
        },
        
        refs: {
            mainView: '#home',
            loginForm: '#loginform',
            settingsBtn: '#setbtn',
            infoBtn: '#home #infobtn',
            menuBtn: '#home #menubtn',
            picker: '#categpicker'
        },
        
        control: {
            mainView: {
                activeitemchange: 'onActiveItemChange',
                show: 'onMainViewShow'
            },
            
            settingsBtn: {
                tap: 'onLoginBtnTap'
            },
            
            infoBtn: {
                tap: 'onInfoBtnTap'
            },
            
            menuBtn: {
                tap: 'onMenuBtnTap'
            },
            
            picker: {
                change: 'onCategoryPick'
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
    
    onMainViewShow: function(mainView) {
        var loginId = Ext.Wp.getLoginId();
        
        if (!Ext.isObject(loginId)) {
            this.onLoginBtnTap();
        }
    },
    
    onLoginBtnTap: function() {
        var me = this;
        var loginForm = me.getLoginForm() || Ext.create('Wp.view.Login');
        Ext.Viewport.add(loginForm);
        loginForm.show();
    },
    
    onInfoBtnTap: function() {
        this.getMainView().push({
            xtype: 'info'
        });
    },
    
    onMenuBtnTap: function() {
        var me = this;
        
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        
        Ext.Wp.getCategories({
            scope: me,
            success: me.onCaregoriesLoadSuccess,
            failure: me.onCaregoriesLoadFailure
        });
    },
    
    onCaregoriesLoadSuccess: function(result) {
        var me = this;
        Ext.Viewport.setMasked(false);
        
        var dataFields = [];
        for (var i in result) {                
            if (Ext.isDefined(result[i]['categoryName'])) {

                dataFields.push({
                    text: result[i]['categoryName'], 
                    value: result[i]['rssUrl']
                });
            }
        }
        
        var picker = me.getPicker() || Ext.create('Wp.view.CategoryPicker');
        
        picker.setSlots([
            {
                name : 'url',
                title: 'Categories',
                data: dataFields
            }
        ]);
        
        Ext.Viewport.add(picker);
        picker.show();
    },
    
    onCategoryPick: function(picker, result) {
        console.log('PICKPICK', result['url']);
        
        Ext.Wp.getPosts({
            scope: this,
            success: function(result) {
                console.log('Success', result);
            },
            failure: function(err) {
                console.log('Failure', err);
            }
        });
        
    },
    
    onCaregoriesLoadFailure: function(err) {
        Ext.Viewport.setMasked(false);
        
        Ext.device.Notification.show({
            title: 'Failure',
            message: 'Unable to load categories'
        });
    }
});