import Ember from 'ember';

export default Ember.Controller.extend({
    weather: Ember.inject.service(),
    weatherForTheDay: null,
    modelObserver: Ember.observer('model', function () {
        let date = this.get('model.date');
        if(date) {
            let unixDate = Math.round((new Date(date)).getTime()/1000);
            this.get('weather').getWeather(unixDate).then(data => {
                this.set('weatherForTheDay', {
                    temperature: Math.round((data.currently.temperature - 32)*5/9),
                    summary: data.currently.summary
                });
            });
        }
    })
});
