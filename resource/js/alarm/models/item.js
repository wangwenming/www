define([
    'backbone',
    'alarm/config'
], function(Backbone, config) {
    var ItemModel = Backbone.Model.extend({
        urlPathAdd: '/remind/addRemind',
        urlPathRemove: '/remind/rmMyRemind',
        defaults: {
            id: 0,
            name: '',
            title: '更新时提醒',
            icon: ''
        },
        sync: function(method, model, options) {
            // CRUD
            switch (method) {
                case 'update':
                    var urlPath = model.get('isRemind') ? this.urlPathAdd : this.urlPathRemove,
                        url = config.url(urlPath, {
                            id: model.get('id')
                        });
                    $.ajax({
                        url: url,
                        success: options.success,
                        error: options.error
                    });
                    break;
                case 'delete':
                    break;
                default:
                    break;
            }
        }
    });

    return ItemModel;
});
