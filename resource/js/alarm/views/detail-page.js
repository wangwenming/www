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
        $dialog: null,
        setItemModel: function(itemModel) {
            var self = this;
            self.itemModel = itemModel;
            self.detailModel = new DetailModel({
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
            this.$el.find('.hd h2').text(this.itemModel.get('name'));
            this.$el.show();
            this.$dialog = $('.dialog, .mask', this.$el);
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
            'click .back': 'back',
            'click .subscribe': 'subscribe',
            'click .cancel': 'cancel',
            'click .delete-yes': 'cancelYes',
            'click .delete-no': 'cancelNo'
        },
        back: function(event) {
            var itemListPageView = new ItemListPageView.getInstance();

            itemListPageView.bootstrap();
            itemListPageView.render();

            this.$el.hide();
        },
        subscribe: function() {
            var self = this;
            model = this.itemModel;
            $.when(model.save({isRemind: model.get('isRemind') ? 0 : 1})).done(function() {
                // 订阅成功tips淡入淡出效果
                $('.subscribeSuccess').removeClass('tipsHide').addClass('tipsShow');
                setTimeout(function(){
                    $('.subscribeSuccess').removeClass('tipsShow').addClass('tipsHide');
                }, 1000);
                // 重新渲染一次
                self.bootstrap();
            });
        },
        cancel: function() {
            this.$dialog.show();
        },
        cancelYes: function() {
            model = this.itemModel;
            model.save({isRemind: model.get('isRemind') ? 0 : 1});
            this.$dialog.hide();
            // 重新渲染一次
            this.bootstrap();
        },
        cancelNo: function() {
            this.$dialog.hide();
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
