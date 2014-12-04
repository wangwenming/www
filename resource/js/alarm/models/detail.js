define([
    'backbone',
    'alarm/collections/alarm'
], function(Backbone, AlarmCollection) {
    var DetailModel = Backbone.Model.extend({
        url: function() {
            return 'http://z.i.so.com/remind/getDetail?id=' + this.eventModel.get('id')
        },
        initialize: function(options) {
            this.eventModel = options.eventModel;
            this.alarmCollection = new AlarmCollection();
        },
        parse: function(response) {
            if (response.error != 0) {
                return [];
            }

            this.alarmCollection.set(response.data.uplist);
            response.data.uplist = null;

            return response.data;
        }
    });

    return DetailModel;
});
