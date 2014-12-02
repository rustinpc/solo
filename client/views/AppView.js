var AppView = Backbone.View.extend({

  className: "centerBox",

  initialize: function(params){
    // this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.photosView = new PhotosView({collection: this.model.get('photos')});
    // this.photosView = new SongQueueView({collection: this.model.get('songQueue')});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    // this.model.on('change:currentSong', function(model){
    //   this.playerView.setSong(model.get('currentSong'));
    // }, this);
  },

  render: function(){
    return this.$el.html([
      // this.playerView.$el,
      this.photosView.$el,
      // this.playlistView.$el
    ]);
  },
});
