import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    title: DS.attr(),
    color: DS.attr(),
    titleStyles: Ember.computed('color', function () {
        return Ember.String.htmlSafe('color:' + this.get('color'));
    })
});
