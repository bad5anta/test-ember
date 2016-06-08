import DS from 'ember-data';
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations, {
    title: DS.attr(),
    description: DS.attr('string', {defaultValue: ''}),
    date: DS.attr(),
    image: DS.attr(),

    category: DS.belongsTo('category'),

    shortDescription: Ember.computed('description', function () {
        let description = this.get('description');
        let firstPeriodPosition = description.indexOf('.');
        if (firstPeriodPosition < 100 || firstPeriodPosition > 200) {
            firstPeriodPosition = 197;
        }
        return description.substr(0, firstPeriodPosition) + '...';
    }),
    
    validationErrors: [],
    validations: {
        title: {
            presence: true
        },
        description: {
            presence: true
        },
        date: {
            format: {with: /^\d{4}\-(0\d|1(1|2))\-((0|1|2)\d|3(0|1))$/, message: 'date in format yyyy-mm-dd'}
        },
        image: {
            presence: true
        },
        'category.id' : {
            presence: true
        }
    }
});
