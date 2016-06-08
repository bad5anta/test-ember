import Ember from 'ember';

export default Ember.Controller.extend({
    eventBus: Ember.inject.service(),
    events: null,
    searchQuery: '',
    weather: Ember.inject.service(),
    weatherForToday: null,
    eventsFiltered: Ember.computed('events', 'activeCategories.[]', function () {
        let events = this.get('events');
        let activeCategories = this.get('activeCategories');
        return events.filter(e => {
            return (e.get('isNew') === false) && (activeCategories.indexOf(e.get('category.id')) !== -1);
        });
    }),
    activeCategories: Ember.A([]),
    categoriesObserver: Ember.observer('categories', function () {
        let categories = this.get('categories');
        let activeCategories = this.get('activeCategories');

        if (categories) {
            categories.forEach(c => {
                activeCategories.addObject(c.get('id'));
            });
        }
    }),
    init () {
        this._super(...arguments);
        let eventBus = this.get('eventBus');
        eventBus.subscribe('eventFormOff', this, 'newEventRollback');
        this.get('weather').getWeather().then(data => {
            this.set('weatherForToday', {
                temperature: Math.round((data.currently.temperature - 32)*5/9),
                summary: data.currently.summary
            });
        });
    },
    newEventRollback () {
        let newEvent = this.get('store').createRecord('event');
        this.set('newEvent', newEvent);
    },
    actions: {
        toggleEvent (eventName) {
            this.get('eventBus').publish(eventName);
        },
        addEvent () {
            let newEvent = this.get('newEvent');
            newEvent.validate().then(() => {
                newEvent.save().then(data => {
                    let events = this.get('events').toArray();
                    events.addObject(data);
                    this.set('events', events);

                    this.get('eventBus').publish('eventFormOff');
                });
            }).catch(e => {
                newEvent.set('validationErrors', e);
            });
        },
        toggleCategory (id) {
            let activeCategories = this.get('activeCategories');
            if (activeCategories.indexOf(id) + 1) {
                activeCategories.removeObject(id);
            } else {
                activeCategories.addObject(id);
            }
        },
        searchKeyUp (e) {
            const searchQuery = this.get('searchQuery');
            if (e.which === 13) {
                this.transitionToRoute('search', {queryParams: {q: searchQuery}});
            }
        },
        setCategory (id) {
            let newEvent = this.get('newEvent');
            let category = this.get('store').peekRecord('category', id);
            newEvent.set('category', category);
        }
    }
});
