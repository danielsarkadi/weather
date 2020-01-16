
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Daniel Sarkadi'
    });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Daniel Sarkadi'
    })
});

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'This is the help message',
        title: 'Help',
        name: 'Daniel Sarkadi'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address
            });
        })
    })
    
    
});


app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{ 
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Daniel Sarkadi'});
})

app.get('*',(req,res) => {
    res.render('404',{ 
    title: '404',
    errorMessage: 'Page not found',
    name: 'Daniel Sarkadi'});
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});