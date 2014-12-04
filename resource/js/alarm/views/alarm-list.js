define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/alarm'
], function(_, $, deferred, Backbone, AlarmCollection) {
    var alarmListTpl = _.template($('#tpl-alarm-item').html());

    var AlarmListView = Backbone.View.extend({
        el: $('#alarm-list'),
        initialize: function(options) {
            this.render();
        },
        render: function() {
            console.log(this.collection);
            var html = alarmListTpl({
                    alarmCollection: this.collection
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
