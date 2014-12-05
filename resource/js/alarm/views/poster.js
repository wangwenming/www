define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/tool',
    'alarm/collections/event',
    'alarm/views/detail-page'
], function(_, $, deferred, Backbone, tool, EventCollection, DetailPageView) {
    var tpl = _.template($('#tpl-poster').html());

    var PosterView = Backbone.View.extend({
        el: $('#page-detail .poster'),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(tpl({
                data: this.model.attributes,
                tool: tool
            }));
        }
    });

    return PosterView;
});
