const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=840d64fbe2c1aa60ea2834471ab92f50&query="
    +latitude+","+longitude
    request({url, json:true},(error, {body}={}) => {
        if(error)
            callback("Unable To Connect To Forecast Server",undefined)
        else if(body.error)
            callback("Unable To Find Location",undefined)
        else{
            const data = body;
            const forecastStr = "It is "
            +data.current.temperature+ "°C. Overcast : " +data.current.weather_descriptions[0]
        
            callback(undefined,forecastStr)
        }
    })
}

module.exports = forecast