var PhotoModel = Backbone.Model.extend({
  vote: function(){
    // Triggering an event here will also trigger the event on the collection
    console.log(this.rank);
    this.trigger('vote', this);
  },
  rank: 0  
});