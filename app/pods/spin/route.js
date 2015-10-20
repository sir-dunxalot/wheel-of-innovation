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
      this.createItem('Mobile content and questions'),
      this.createItem('Features for video'),
      this.createItem('Mystery category'),
      this.createItem('Hook Mechanisms'),
      this.createItem('Data we could gather'),
      this.createItem('Find an unknown integration'),
      this.createItem('Things to do in emails'),
    ]);
  },

});
