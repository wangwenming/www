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
            var url;
            switch (method) {
                case 'update':
                    var urlPath = model.get('isRemind') ? this.urlPathAdd : this.urlPathRemove;
                        url = config.url(urlPath, {
                            id: model.get('id')
                        });

                    $.ajax({
                        url: url,
                        success: options.success,
                        error: options.error
                    });

                    // 清除我的订阅和详情页的缓存
                    localStorage.removeItem('collections/subscription');
                    localStorage.removeItem('model/detail_' + model.get('id'));
                    break;
                case 'delete':
                    model.collection.remove(model);
                    url = config.url(this.urlPathRemove, {
                            id: model.get('id')
                        });

                    $.ajax({
                        url: url,
                        success: options.success,
                        error: options.error
                    });

                    // 清除我的订阅、列表页和详情页的缓存
                    localStorage.removeItem('collections/subscription');
                    localStorage.removeItem('collections/item_' + model.get('typeId'));
                    localStorage.removeItem('model/detail_' + model.get('id'));
                    break;
                default:
                    break;
            }
        }
    });

    return ItemModel;
});