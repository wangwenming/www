define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/event',
    'alarm/views/detail-page'
], function(_, $, deferred, Backbone, EventCollection, DetailPageView) {
    var eventListTpl = _.template($('#tpl-event-item').html());

    var EventListView = Backbone.View.extend({
        el: $('#event-list'),
        initialize: function(options) {
            var self = this;

            this.collection = new EventCollection({
                caterogyModel: options.caterogyModel
            });
            this.pageView = options.pageView;

            // 函数的this是collection
            // this.collection.on('change:isRemind', this.render);
            this.collection.on('change:isRemind', function() {
                self.render();
            });
        },
        bootstrap: function() {
            var self = this;

            $.when(this.collection.fetch()).done(function() {
                self.render();
            });
        },
        render: function() { console.log('rrr', this, this.collection);
            var html = eventListTpl({
                    eventCollection: this.collection
                });
            this.$el.html(html);
        },
        events: {
            'click .event-item': 'navigateToDetail',
            'click .event-action': 'toggleSubscription'
        },
        toggleSubscription: function(event) {
            var id = $(event.target).closest('.list-item').data('id'),
                model = this.collection.get(id);

            model.save({isRemind: model.get('isRemind') ? 0 : 1});
        },
        navigateToDetail: function(event) {
            var id = $(event.target).closest('.list-item').data('id'),
                eventModel = this.collection.get(id),
                detailPageView = new DetailPageView({
                    eventModel: eventModel,
                    prevPageView: this.pageView
                });

            this.pageView.$el.hide();
        }
    });

    return EventListView;
});
