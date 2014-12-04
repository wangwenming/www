define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/event',
    'alarm/views/detail-page'
], function(_, $, deferred, Backbone, EventCollection, DetailPageView) {
    var PosterView = Backbone.View.extend({
        el: $('#page-detail .poster'),
        initialize: function() {
            this.render();
        },
        render: function() {
            var model = this.model;
            $('img', this.$el).attr('src', model.get('coverImg'));
            $('h3', this.$el).text(model.get('name'));
            $('p', this.$el).text(model.get('title'));
        }
    });

    return PosterView;
});
