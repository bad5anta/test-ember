import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
    serviceURL: config.weatherAPIURL,
    getWeather(date = null) {
        if(date === null){
            date = Math.round((new Date()).getTime()/1000) + 26*24*3600;
        }
        const serviceURL = this.get('serviceURL');
        return Ember.$.ajax({
            url: serviceURL + date,
            dataType: 'jsonp',
            success (result) {
                let summary = result.currently.summary;
                let temperature = result.currently.temperature;
                return {summary, temperature};
            }
        });
    }

});
