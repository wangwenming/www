define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/subscription',
    'alarm/views/my-page',
    'alarm/tool'
], function(exports, _, $, deferred, Backbone, SubscriptionCollection, MyPageView, tool) {
    var subscriptionListTpl = _.template($('#tpl-subscription-item').html());

    var SubscriptionListView = Backbone.View.extend({
        el: $('#subscription-list'),
        id: null,
        $dialog: null,
        $loading: $('.loading'),
        initialize: function(options) {
            var self = this;

            this.collection = new SubscriptionCollection();
            // 函数的this是collection
            this.collection.on('remove', function() {
                self.render();
            });
        },
        setPageView: function(pageView) {
            this.pageView = pageView;
        },
        bootstrap: function() {
            var self = this,
                deferred = $.Deferred();

            $.when(this.collection.fetch()).done(function() {
                deferred.resolve(!!self.collection.length);
                self.render();
            });

            return deferred;
        },
        render: function() {
            var html = subscriptionListTpl({
                    subscriptionCollection: this.collection,
                    tool: tool
                });
            this.$el.html(html);
            this.$dialog = $('.dialog, .mask', this.$el);
            this.$loading.hide();
        },
        events: {
            'click .subscription-item': 'subscriptionItem',
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
            model.destroy();
            this.$dialog.hide();
        },
        cancelNo: function() {
            this.$dialog.hide();
        },
        // 点击item项到详情页
        subscriptionItem: function() {
            // Backbone事件无法阻止冒泡
            if ($(event.target).is('.subscription-action')) {
                return;
            }
            var url = $(event.target).closest('li').data('url');
            location.href = url;
        }
    });

    var instance;
    exports.getInstance = function() {
        if (!instance) {
            instance = new SubscriptionListView();
        }

        return instance;
    };
});
