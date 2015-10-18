import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wheel-of-innovation', 'Integration | Component | wheel of innovation', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{wheel-of-innovation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#wheel-of-innovation}}
      template block text
    {{/wheel-of-innovation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
