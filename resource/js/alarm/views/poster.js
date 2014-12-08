define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/tool',
    'alarm/views/detail-page'
], function(_, $, deferred, Backbone, tool, DetailPageView) {
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
