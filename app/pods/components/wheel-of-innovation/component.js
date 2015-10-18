import Ember from 'ember';

const { computed, on, run } = Ember;

export default Ember.Component.extend({
  categories: null,
  currentCategory: null,
  isSpinning: false,
  lengthofSpin: 5000,

  _previousName: null,

  currentCategory: computed({

    get() {
      const categories = this.get('categories');
      const randomIndex = Math.random() * categories.get('length');
      const wholeNumber = Math.floor(randomIndex);
      const randomCategory = categories.objectAt(wholeNumber);

      if (randomCategory.get('name') === this.get('previousName')) {
        return this.get('currentCategory');
      } else {
        return randomCategory;
      }
    },

    set() {
      return this.get('currentCategory');
    },

  }).volatile(),

  actions: {
    spin() {
      const _this = this;
      const lengthofSpin = this.get('lengthofSpin');

      let delay = 30;

      function changeCategory() {
        delay += (delay * 0.1);

        run.later(_this, function() {
          const { isDestroying, isSpinning } = _this.getProperties(
            [ 'isDestroying', 'isSpinning' ]
          );

          if (isSpinning && !isDestroying) {
            _this.set('currentCategory');
            changeCategory();
          }
        }, delay);
      }

      _this.set('isSpinning', true);
      changeCategory.call(this);

      run.later(_this, function() {
        if (!_this.get('isDestroying')) {
          _this.set('isSpinning', false);
        }
      }, lengthofSpin);
    }
  },

});
