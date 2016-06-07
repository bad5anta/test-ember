import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    title: DS.attr(),
    description: DS.attr(),
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
    titleStyles: Ember.computed('category.color', function () {
        return 'color:' + this.get('category.color');
    }),
    slug: Ember.computed('title', function() {
        return this.get('title').dasherize();
    })
});
