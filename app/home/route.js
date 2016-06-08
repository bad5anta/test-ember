import Ember from 'ember';

export default Ember.Route.extend({
    model () {
        let store = this.get('store');
        return Ember.RSVP.hash({
            events: store.findAll('event'),
            categories: store.findAll('category'),
            newEvent: store.createRecord('event')
        });
    },
    setupController (controller, model) {
        controller.setProperties(model);
    }
});
