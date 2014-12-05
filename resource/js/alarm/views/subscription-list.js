define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/subscription',
    'alarm/views/my-page'
], function(_, $, deferred, Backbone, SubscriptionCollection, MyPageView) {
    var subscriptionListTpl = _.template($('#tpl-subscription-item').html());

    var SubscriptionListView = Backbone.View.extend({
        el: $('#subscription-list'),
        initialize: function(options) {
            var self = this;

            this.collection = new SubscriptionCollection();
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
        render: function() {
            var html = subscriptionListTpl({
                    subscriptionCollection: this.collection
                });
            this.$el.html(html);
        }
    });

    return SubscriptionListView;
});
