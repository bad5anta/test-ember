import Ember from 'ember';

export default Ember.Controller.extend({
    events: null,
    groupedEvents: Ember.computed('events', function () {
        let events = this.get('events');
        let obj = {};
        let result = [];
        events.forEach(e => {
            let date = e.get('date');
            let month = date.split('-')[1];
            if(typeof obj[month] === 'undefined') {
                obj[month] = [];
            }
            obj[month].push(e);
        });
        for (let z in obj) {
            result.push({
                month: z,
                events: Ember.get(obj, z)
            });
        }
        return result;
    })
});
