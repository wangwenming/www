define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/subscription',
    'alarm/views/my-page',
    'alarm/tool'
], function(_, $, deferred, Backbone, SubscriptionCollection, MyPageView, tool) {
    var subscriptionListTpl = _.template($('#tpl-subscription-item').html());

    var SubscriptionListView = Backbone.View.extend({
        el: $('#subscription-list'),
        id: null,
        $dialog: null,
        initialize: function(options) {
            var self = this;

            this.collection = new SubscriptionCollection();
            this.pageView = options.pageView;

            // 函数的this是collection
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
        render: function() {
            var html = subscriptionListTpl({
                    subscriptionCollection: this.collection,
                    tool: tool
                });
            this.$el.html(html);
            this.$dialog = $('.dialog, .mask');
        },
        events: {
            'click .subscription-action': 'cancelAlarm',
            'click .delete-yes': 'cancelYes',
            'click .delete-no': 'cancelNo'
        },
        cancelAlarm: function(event) {
            this.id = $(event.target).closest('.list-item').data('id');
            this.$dialog.show();
        },
        cancelYes: function() {
            model = this.collection.get(this.id);
            model.save({isRemind: model.get('isRemind') ? 0 : 1});
            this.$dialog.hide();
        },
        cancelNo: function() {
            this.$dialog.hide();
        }
    });

    return SubscriptionListView;
});
