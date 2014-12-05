define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/collections/subscribed',
    'alarm/views/my-page',
    'alarm/tool'
], function(_, $, deferred, Backbone, SubscribedCollection, MyPageView, tool) {
    var subscribedListTpl = _.template($('#tpl-subscribed-item').html());

    var SubscribedListView = Backbone.View.extend({
        el: $('#subscribed-list'),
        initialize: function(options) {
            var self = this;

            this.collection = new SubscribedCollection();
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
            var html = subscribedListTpl({
                    subscribedCollection: this.collection,
                    tool: tool
                }),
                height;
            this.$el.html(html);
            height = this.$el.height() + 10; // 计算subscribed-list高度，设置subscribed-line的高度，10为subscribed-list距离底部的padding
            $('.subscribed-line').css({height: height});
        }
    });

    return SubscribedListView;
});
