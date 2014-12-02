var PhotosView = Backbone.View.extend({

  // tagName: "table",

  className: "photos-list",

  initialize: function() {
    this.render();
  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();

    this.$el.append(
      this.collection.map(function(photo){
        return new PhotoView({model: photo}).render();
      })
    );
  }

});