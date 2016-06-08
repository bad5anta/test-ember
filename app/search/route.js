import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        q: {
            refreshModel: true
        }
    },
    model (params) {
        let q =  params.q;
        return Ember.RSVP.hash({
            events: this.get('store').query('event', {q}),
            q
        });
    },
    setupController(controller, model) {
        controller.setProperties(model);
    }
});
