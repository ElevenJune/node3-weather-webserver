const request = require('postman-request');


const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    +encodeURIComponent(adress)
    +".json?access_token=pk.eyJ1IjoiZWxldmVuanVuZSIsImEiOiJja2gweTE2cDkwOWI3MnBzaWZrY2h4dDVnIn0.b3kfP_mcSHrDbucesdDT_g"

    request({url, json:true},(error, {body}={}) => {
        if(error)
            callback("Unable To Connect To Geocode Server",undefined)
        else if(!body.features || body.features.length === 0)
            callback("Unable To Find Location",undefined)
        else{
            const data = body.features[0]
            const longitude = data.center[0]
            const latitude = data.center[1]
            const location = data.place_name
            callback(undefined,{longitude,latitude,location})
        }
    })
}

module.exports = geocode