import Ember from 'ember';

const { $, computed, on, run } = Ember;

export default Ember.Component.extend({
  categories: null,
  classNameBindings: ['currentCategoryClass'],
  currentCategory: null,
  isSpinning: false,
  lengthOfSpin: 7000,

  drumroll: new Audio('assets/drumroll.mp3'),
  fanfare: new Audio('assets/fanfare.mp3'),

  _enterCallback: null,
  _previousName: null,

  hasResult: computed('currentCategory', 'isSpinning', function() {
    return this.get('currentCategory') && !this.get('isSpinning');
  }),

  currentCategoryClass: computed('currentCategory.name', function() {
    const currentCategoryName = Ember.String.dasherize(this.get('currentCategory.name') || '');

    return `category__${currentCategoryName}`;
  }),

  actions: {
    spin() {
      const _this = this;
      const lengthOfSpin = this.get('lengthOfSpin');
      const drumrollStartTime = lengthOfSpin - 4300;

      let delay = 50;

      function changeCategory() {
        delay += (delay * 0.1);

        run.later(_this, function() {
          const { isDestroying, isSpinning } = _this.getProperties(
            [ 'isDestroying', 'isSpinning' ]
          );

          if (isSpinning && !isDestroying) {
            _this.changeCategory();
            changeCategory();
          }
        }, delay);
      }

      _this.set('isSpinning', true);
      changeCategory.call(this);

      run.later(_this, function() {
        _this.get('drumroll').play();
      }, drumrollStartTime);

      run.later(_this, function() {
        if (!_this.get('isDestroying')) {
          _this.set('isSpinning', false);
          _this.get('fanfare').play();
          // _this.renderConfetti();
        }
      }, lengthOfSpin);
    }
  },

  changeCategory() {
    const click = new Audio('assets/click.mp3');
    const categories = this.get('categories');
    const categoriesLength = categories.get('length');
    const previousName = this.get('_previousName');

    function getRandomCategory() {
      const randomIndex = Math.random() * categoriesLength;
      const wholeNumber = Math.floor(randomIndex);
      const randomCategory = categories.objectAt(wholeNumber);
      const randomCategoryName = randomCategory.get('name');

      if (randomCategoryName === previousName) {
        return getRandomCategory();
      } else {
        return randomCategory;
      }
    }

    const category = getRandomCategory();

    click.play();

    this.setProperties({
      _previousName: category.get('name'),
      currentCategory: category,
    });
  },

  onEnter(event) {
    if (event.which === 13 && !this.get('isSpinning')) {
      this.send('spin');
    }
  },

  setupListeners: on('didInsertElement', function() {
    const callback = run.bind(this, this.onEnter);

    $('body').on('keypress', callback);

    this.set('_enterCallback', callback);
  }),

  teardownListeners: on('willDestroyElement', function() {
    $('body').off('keypress', this.get('_enterCallback'));
  }),

});
