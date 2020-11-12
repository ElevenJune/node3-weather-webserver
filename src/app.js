const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths and express configs
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Set handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const name = "Guillaume";

app.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.location
    if (!address)
        return res.send("Please specify a location")

    //Get geocode from localisation
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error)
            return res.send({ error })

        //Get forecast from geocode
        forecast(latitude, longitude, (error, forecastDataStr) => {
            if (error)
                return res.send({ error })
            res.send({
                location,
                forecast: forecastDataStr,
                searchedLocation: address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send("You must provide a search")
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error",
        name,
        helpText: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        name,
        helpText: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server running")
})