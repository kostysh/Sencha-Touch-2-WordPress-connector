Ext.define('Ext.ux.client.wp.Wp', {
    extend: 'Ext.ux.data.Jsonrpc',
    
    requires: [
        'Ext.data.StoreManager',
        'Ext.Logger',
        'Ext.ux.client.wp.store.Login',
        'Ext.ux.client.wp.model.GetCategories',
        'Ext.ux.client.wp.model.GetPosts'
    ],
    
    config: {
        blogId: 1,
        username: '',
        password: '',
        loginStore: 'Ext.ux.client.wp.store.Login'
    },
    
    storeListeners: {
        load: 'onStoreLoad',
        addrecords: 'onStoreLoad'
    },
    
    /**
     * Constructor
     * @private
     */
    constructor: function(config) {
        var me = this;
        
        var rpcCfg = {
            protocol: 'XML-RPC',
            timeout: 10000,
            scope: me,
            
            api: [
                {
                    name: 'wp.getOptions',
                    alias: 'getOptions',
                    defaultsMap: {
                        blog_id: 'getBlogId',
                        username: 'getUsername',
                        password: 'getPassword'
                    }
                },
                {
                    name: 'wp.getCategories',
                    alias: 'getCategories',
                    model: 'Ext.ux.client.wp.model.GetCategories',
                    defaultsMap: {
                        blog_id: 'getBlogId',
                        username: 'getUsername',
                        password: 'getPassword'
                    }
                },
                {
                    name: 'wp.getPosts',
                    alias: 'getPosts',
                    model: 'Ext.ux.client.wp.model.GetPosts',
                    defaultsMap: {
                        blog_id: 'getBlogId',
                        username: 'getUsername',
                        password: 'getPassword'
                    }
                }
            ],
            
            error: function(err) {
                // <debug>
                console.log('Wp client exception', err);
                // </debug>
            }
        };
        
        me.callParent([Ext.apply(config, rpcCfg)]);
    },
    
    getLoginId: function() {
        var loginStore = this.getLoginStore();
        return loginStore.first();
    },
    
    setLoginId: function(idObj, callbacks) {
        var me = this;
        
        if (Ext.isObject(idObj) && 
            Ext.isDefined(idObj.username) && 
            Ext.isDefined(idObj.password)) {
            
            var loginStore = this.getLoginStore();
            loginStore.removeAll();
            loginStore.add(idObj);
            loginStore.sync();
            
            Ext.defer(me.authenticateUser, 10, me, [callbacks]);
        }
    },
    
    authenticateUser: function(callbacks) {
        var me = this;
        
        if (!Ext.isDefined(callbacks) || !Ext.isObject(callbacks)) {
            callbacks = {
                success: Ext.emptyFn,
                failure: Ext.emptyFn
            };
        } else {
            callbacks.success = Ext.isFunction(callbacks.success) ? callbacks.success : Ext.emptyFn;
            callbacks.failure = Ext.isFunction(callbacks.failure) ? callbacks.failure : Ext.emptyFn;
        }
        
        Ext.Viewport.setMasked({
            xtype: 'loadmask'
        });

        me.getOptions({
            success: function(result) {
                me.fireEvent('authenticationsuccess', result);
                callbacks.success.call(me, result);
                Ext.Viewport.setMasked(false);
            },
            failure: function(err) {
                me.setUsername('');
                me.setPassword('');
                me.fireEvent('authenticationfailure', err);
                callbacks.failure.call(me, err);
                Ext.Viewport.setMasked(false);
            }
        });
    },
    
    onStoreLoad:function() {
        var me = this;
        var loginId = me.getLoginId();
        
        if (Ext.isObject(loginId)) {
            me.setUsername(loginId.get('username'));
            me.setPassword(loginId.get('password'));
            
            Ext.defer(me.authenticateUser, 10, me);
        } 
    },
    
    applyLoginStore: function(store) {
        if (store) {
            store = Ext.create(store);
            
            if (store && Ext.isObject(store) && store.isStore) {
                return store;
            } else {
                var errMsg = 'Store "' + store + '" not found';
                this.fireEvent('exception', {
                    title: 'Configuration error',
                    message: errMsg,
                    time: new Date()
                });
                // <debug>
                Ext.Logger.warn(errMsg);
                // </debug>
            }
            
        } else {
            var errMsg = 'Store for login data not defined';
            this.fireEvent('exception', {
                title: 'Configuration error',
                message: errMsg,
                time: new Date()
            });
            // <debug>
            Ext.Logger.warn(errMsg);
            // </debug>
        }
    },
    
    updateLoginStore: function(newStore, oldStore) {
        var me = this;
        
        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            if (oldStore.autoDestroy) {
                oldStore.un(me.storeListeners);
                Ext.data.StoreManager.unregister(oldStore);
                oldStore.destroy();
            }
        }
        
        if (newStore && Ext.isObject(newStore) && newStore.isStore) {
            var listeners = Ext.apply({
                scope: me
            }, me.storeListeners);
            newStore.on(listeners);
            if (newStore.isLoaded()) {
                me.onStoreLoad();
            }
        }
    }
});