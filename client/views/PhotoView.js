var PhotoView = Backbone.View.extend({
  // tagName: 'tr',
  // className: 'photo',
  template: _.template('<img src="<%= url %>" class="photo">'),

  events: {
    'click': function() {
      // console.log('voting');
      this.model.vote();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }


});