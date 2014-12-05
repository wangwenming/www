define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/models/detail',
    'alarm/views/poster',
    'alarm/views/alarm-list',
], function(_, $, deferred, Backbone, DetailModel, PosterView, AlarmListView) {
    var DetailPageView = Backbone.View.extend({
        el: $('#page-detail'),
        initialize: function(options) {
            this.prevPageView = options.prevPageView;
            this.itemModel = options.itemModel;

            this.detailModel = new DetailModel({
                itemModel: options.itemModel
            });

            // 显示框架
            this.render();
            // 异步显示详细内容
            this.bootstrap();
        },
        bootstrap: function() {
            var self = this;
            $.when(this.detailModel.fetch()).done(function() {
                self.renderContent();
            });
        },
        render: function() {
            this.$el.show();
        },
        renderContent: function() {
            // 渲染详情部分
            this.posterView = new PosterView({
                model: this.detailModel
            });

            // 渲染历史提醒列表
            this.alarmListView = new AlarmListView({
                collection: this.detailModel.alarmCollection
            });
        },
        events: {
            'click .back': 'back'
        },
        back: function(event) {
            this.$el.hide();
            this.prevPageView.$el.show();
        }
    });

    return DetailPageView;
});
