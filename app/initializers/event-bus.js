export function initialize(application) {
    application.inject('component', 'eventBus', 'service:event-bus');
}

export default {
    name: 'event-bus',
    initialize
};