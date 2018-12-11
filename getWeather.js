// getWeather.js
const request = require('request');
const key = '8fea95e858bcd0952514c7f6dedd884d';

module.exports.getWeather = (search_term) => {
    return new Promise ((resolve, reject) => {
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(search_term)}&APPID=${key}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to API.');
            }   
            else if(body.cod == 400) {
                reject('request error');
            }
            else {
                let {weather, name} = body
                console.log(typeof weather, name)
                resolve({
                    weather_description: weather[0].main,
                    location: name
                });
            }
        })
    })
}