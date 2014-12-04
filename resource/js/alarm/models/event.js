define([
    'backbone'
], function(Backbone) {
    var EventModel = Backbone.Model.extend({
        //urlRoot: 'http://z.i.so.com/remind',
        urlAdd: 'http://z.i.so.com/remind/addRemind',
        urlRemove: 'http://z.i.so.com/remind/removeRemind',
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
                var url = model.get('isRemind') ? this.urlAdd : this.urlRemove;
                    $.ajax({
                        url: url + '?' + $.param({id: model.get('id'), userId: 'wwm'}),
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

    return EventModel;
});
