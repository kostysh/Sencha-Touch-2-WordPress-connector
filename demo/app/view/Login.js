Ext.define('Wp.view.Login', {
    extend: 'Ext.form.Panel',
    id: 'loginform',
    
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Password'
    ],
    
    config: {
        centered: true,
        styleHtmlContent: true,
        modal: true,
        hideOnMaskTap: true,
        width: '70%',
        height: '60%',

        layout: 'vbox',

        items: [
            {
                xtype: 'fieldset',
                title: 'Enter your Id',

                items: [
                    {
                        xtype: 'textfield',
                        label: 'User',
                        name: 'username'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password',
                        name: 'password'
                    }
                ]
            },
            {
                id: 'savebtn',
                xtype: 'button',
                text: 'Save Id'
            }
        ]
    }
});