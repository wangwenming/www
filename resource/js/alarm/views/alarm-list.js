define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/tool',
    'alarm/collections/alarm'
], function(_, $, deferred, Backbone, tool, AlarmCollection) {
    var alarmListTpl = _.template($('#tpl-alarm-item').html());

    var AlarmListView = Backbone.View.extend({
        el: $('#alarm-list'),
        initialize: function(options) {
            this.render();
        },
        render: function() {
            var html = alarmListTpl({
                    alarmCollection: this.collection,
                    tool: tool
                });
            this.$el.html(html);
        },
        events: {
            'click .alarm-item': 'viewAction'
        },
        viewAction: function(event) {
        }
    });

    return AlarmListView;
});
