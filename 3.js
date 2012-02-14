// Backbone.jsのサンプルなど
(function($){
	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'こん',
			part2: 'にちは'
		}
	});

	var List = Backbone.Collection.extend({
		model: Item
	});

	var ListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addItem');

			this.collection = new List();
			this.collection.bind('add', this.appendItem);

			this.counter = 0;
			this.render();
		},
		render: function(){
			console.log('render()');
//			var self = this;
			$(this.el).append('<button id="add">リストにアイテム追加</button>');
			$(this.el).append('<ul></ul>');
//			_(this.collection.models).each(function(item){
//				console.log('render() -> each() '+ item.get('part2'));
//				self.appendItem(item);
//			}, this);
		},
		addItem: function(){
			console.log('event addItem() '+ this.counter);
			this.counter++;
			var item = new Item();
			item.set({
				part2: item.get('part2') + this.counter
			});
			this.collection.add(item);
		},
		appendItem: function(item){
			console.log('collection appendItem() '+ item.get('part2'));
			$('ul', this.el).append('<li>'+item.get('part1')+' '+item.get('part2')+'</li>');
		}
	});
	var listView = new ListView();
}(jQuery));
