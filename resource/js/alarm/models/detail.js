define([
    'backbone',
    'alarm/config',
    'alarm/collections/alarm'
], function(Backbone, config, AlarmCollection) {
    var DetailModel = Backbone.Model.extend({
        cacheTTL: 1800,
        url: function() {
            return config.url('/remind/getDetail', {
                id: this.itemModel.get('id')
            });
        },
        initialize: function(options) {
            this.itemModel = options.itemModel;
            this.alarmCollection = new AlarmCollection();
           /* this.cacheKey = 'model/detail_' + this.itemModel.get('id');*/
        },
        parse: function(response) {
            if (response.error !== 0) {
                return [];
            }

            this.alarmCollection.set(response.data.uplist);
            response.data.uplist = null;

            return response.data;
        }
    });

    return DetailModel;
});
