define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/config',
    'alarm/models/event'
], function(_, $, deferred, Backbone, config, EventModel) {
    var EventCollection = Backbone.Collection.extend({
        model: EventModel,
        url: function() {
            return config.url('/remind/getTypeDatalist', {
                typeId: this.caterogyModel.get('id'),
                start: 0,
                count: 10
            });
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
