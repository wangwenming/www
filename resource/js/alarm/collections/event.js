define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/models/event'
], function(_, $, deferred, Backbone, EventModel) {
    var EventCollection = Backbone.Collection.extend({
        model: EventModel,
        url: function() {
            return 'http://z.i.so.com/remind/getTypeDatalist?typeId=' + this.caterogyModel.get('id') + '&start=0&count=10&userId=wwm8';
        },
        initialize: function(options) {
            this.caterogyModel = options.caterogyModel;
        },
        parse: function(response) {
            if (response.error != 0) {
                return [];
            }

            return response.data;
        }
    });

    return EventCollection;
});
