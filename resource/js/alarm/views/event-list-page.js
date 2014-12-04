define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/event-list'
], function(_, $, deferred, Backbone, EventListView) {
    var EventListPageView = Backbone.View.extend({
        el: $('#page-event-list'),
        initialize: function(options) {
            this.caterogyModel = options.caterogyModel;
            this.prevPageView = options.prevPageView;

            var eventListView = new EventListView({
                    caterogyModel: this.caterogyModel,
                    pageView: this
                });

            eventListView.bootstrap();

            this.$el.show().find('.hd h2').text(this.caterogyModel.get('name'));
        },
        events: {
            'click .back': 'back'
        },
        back: function() {
            this.$el.hide();
            this.prevPageView.$el.show();
        }
    });

    return EventListPageView;
});
