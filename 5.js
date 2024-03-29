// Backbone.jsのサンプルなど
(function($){
	Backbone.sync = function(method, model, success, error){
		success();
	};

	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'こん',
			part2: 'にちは'
		}
	});

	var List = Backbone.Collection.extend({
		model: Item
	});

	var ItemView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click span.swap': 'swap',
			'click span.delete': 'remove'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'swap', 'remove');

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			console.log('ItemView::render() '+ this.model.get('part2'));
			$(this.el).html(
				'<span>'+ this.model.get('part1') +' '+ this.model.get('part2') +'</span> '+
				'<span class="swap" style="color:blue; cursor:pointer;">[swap]</span> '+
				'<span class="delete" style="color:red; cursor:pointer;">[delete]</span> '
			);
			return this;
		},
		unrender: function(){
			$(this.el).remove();
		},
		swap: function(){
			var swapped = {
				part1: this.model.get('part2'),
				part2: this.model.get('part1')
			};
			this.model.set(swapped);
		},
		remove: function(){
			this.model.destroy();
		}
	});

	var ListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem',
			'click button#show': 'showItems'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addItem', 'appendItem');

			this.collection = new List();
			this.collection.bind('add', this.appendItem);

			this.counter = 0;
			this.render();
		},
		render: function(){
			console.log('ListView::render()');
			var self = this;
			$(this.el).append('<button id="add">リストにアイテム追加</button>');
			$(this.el).append('<button id="show">コレクション確認</button>');
			$(this.el).append('<ul></ul>');
			_(this.collection.models).each(function(item){
				console.log('ListView::render() -> each() '+ item.get('part2'));
				self.appendItem(item);
			}, this);
		},
		addItem: function(){
			console.log('ListView::addItem() '+ this.counter);
			this.counter++;
			var item = new Item();
			item.set({
				part2: item.get('part2') + this.counter
			});
			this.collection.add(item);
		},
		showItems: function(){
			console.log(JSON.stringify(this.collection));
		},
		appendItem: function(item){
			console.log('ListView::appendItem() '+ item.get('part2'));
			var itemView = new ItemView({
				model: item
			});
			$('ul', this.el).append(itemView.render().el);
		}
	});
	var listView = new ListView();
}(jQuery));
