import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['modal fade'],
    eventName: '',
    modalTitle: '',

    _initialize: Ember.on('init', function () {
        this.get('eventBus').subscribe(this.get('eventName'), this, 'triggerModal');
        this.get('eventBus').subscribe(this.get('eventName') + 'Off', this, 'triggerModalOff');
    }),

    triggerModal: function () {
        this.$().modal('show');
        this.$().on('hide.bs.modal', () => {
            this.get('eventBus').publish(this.get('eventName') + 'Off');
        });
    },

    triggerModalOff: function () {
        this.$().unbind();
        this.$().modal('hide');
    },

    _teardown: Ember.on('willDestroyElement', function () {
        this.get('eventBus').unsubscribe(this.get('eventName'));
        this.get('eventBus').unsubscribe(this.get('eventName') + 'Off');
        this.triggerModalOff();
    })
});