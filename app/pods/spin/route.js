import Ember from 'ember';

export default Ember.Route.extend({
  // categories: TODO,

  createItem(name, proportion = 1, backgroundUrl = null) {
    return Ember.Object.create({
      backgroundUrl,
      name,
      proportion,
    });
  },

  model() {
    return Ember.A([
      this.createItem('Mobile'),
      this.createItem('Video'),
      this.createItem('Mystery category'),
      this.createItem('Hook Mechanisms'),
      this.createItem('Data we could gather'),
    ]);
  },

});
