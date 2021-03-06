import Ember from 'ember';
import EventBusInitializer from 'lits-test/initializers/event-bus';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | event bus', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EventBusInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
