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
            let type = "";
            if (data.current.is_day ==="yes") type="day"; else type="night"
            const forecastStr = "It is currently "
            +data.current.temperature+ "°C in "+
            data.location.name+".\nIt's "+type
            + " and the forecast is : " +data.current.weather_descriptions[0]
        
            callback(undefined,forecastStr)
        }
    })
}

module.exports = forecast