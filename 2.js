// Backbone.jsのサンプルなど
(function($){
	var ListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addItem');
			this.counter = 0;
			this.render();
		},
		render: function(){
			$(this.el).append('<button id="add">リストにアイテム追加</button>');
			$(this.el).append('<ul></ul>');
		},
		addItem: function(){
			this.counter++;
			$('ul', this.el).append('<li>ついか '+ this.counter +'</li>');
		}
	});
	var listView = new ListView();
}(jQuery));
