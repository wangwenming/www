define([
    'exports',
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/models/detail',
    'alarm/views/poster',
    'alarm/views/alarm-list',
    'alarm/views/item-list-page'
], function(exports, _, $, deferred, Backbone, DetailModel, PosterView, AlarmListView, ItemListPageView) {
    var DetailPageView = Backbone.View.extend({
        el: $('#page-detail'),
        setItemModel: function(itemModel) {
            this.itemModel = itemModel;
            this.detailModel = new DetailModel({
                itemModel: itemModel
            });
        },
        bootstrap: function() {
            var self = this,
                deferred = $.Deferred();

            $.when(this.detailModel.fetch()).done(function() {
                deferred.resolve();
                self.renderContent();
            });

            return deferred;
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
            var itemListPageView = new ItemListPageView.getInstance();

            itemListPageView.bootstrap();
            itemListPageView.render();

            this.$el.hide();
        }
    });

    var instance;
    exports.getInstance = function() {
        if (!instance) {
            instance = new DetailPageView();
        }

        return instance;
    };
});
