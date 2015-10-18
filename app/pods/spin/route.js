import Ember from 'ember';

export default Ember.Route.extend({

  createItem(name, proportion = 1, backgroundUrl = null) {
    return Ember.Object.create({
      backgroundUrl,
      name,
      proportion,
    });
  },

  model() {
    return Ember.A([
      this.createItem('Mobile', 2),
      this.createItem('Video'),
      this.createItem('Mystery category', 2),
    ]);
  },

});
