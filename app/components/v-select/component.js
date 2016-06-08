import Ember from 'ember';

export default Ember.Component.extend({
    value: null,
    actions: {
        changeActionTrigger(e) {
            this.sendAction('changeAction',e);
        }
    }
});