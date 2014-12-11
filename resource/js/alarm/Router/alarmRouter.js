define([
    'backbone'
], function(Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes : {
            '' : 'main',
            'page' : 'renderPage',
            'category' : 'renderCategory',
            'item' : 'renderItem',
            'detail' : 'renderDetail'
        },
        main : function() {
            console.log('应用入口方法');
        },
        renderPage : function() {
            console.log('renderPage');
        },
        renderCategory : function() {
            console.log('renderCategory');
        },
        renderItem : function() {
            console.log('renderItem');
        },
        renderDetail : function() {
            console.log('renderDetail');
        }
    });

    var router = new AppRouter();
    Backbone.history.start();
});