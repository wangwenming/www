define([
    'underscore',
    'zepto',
    'deferred',
    'backbone',
    'alarm/views/item-list'
], function(_, $, deferred, Backbone, ItemListView) {
    var ItemListPageView = Backbone.View.extend({
        el: $('#page-item-list'),
        initialize: function(options) {
            this.caterogyModel = options.caterogyModel;
            this.prevPageView = options.prevPageView;

            var itemListView = new ItemListView({
                    caterogyModel: this.caterogyModel,
                    pageView: this
                });

            itemListView.bootstrap();

            this.$el.show().find('.hd h2').text(this.caterogyModel.get('name'));
        },
        events: {
            'click .back': 'back'
        },
        back: function() {
            this.$el.hide();
            this.prevPageView.$el.show();
        }
    });

    return ItemListPageView;
});
