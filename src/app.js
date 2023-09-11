const express = require('express');
const path = require('path');
const hbs = require('hbs');
const MaingeoCodeByLocation = require('./utils/geoCodeByLocation')
const MaingetWeatherDataByLatLon = require('./utils/getWeatherDataByLatLon');


const port = process.env.PORT || 3000;
const app = express();

//paths
const publicPathDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//specify default path which will be use in hbs file
//it can be also use to render html files for this particular folder
app.use(express.static(publicPathDirectory));


//set up for view and partials
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);


//routing
app.get('/', (req, res) => {
    res.render('index', {
        Title: 'Weather'
    });
});

app.get('/index', (req, res) => {
    res.render('index', {
        Title: 'Weather'
    });
});

app.get('/About', (req, res) => {
    res.render('About', {
        Title: 'About'
    });
});

app.get('/Help', (req, res) => {
    res.render('Help', {
        Title: 'Help'
    });
});

app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please Provide Address' });
    }
    async function Main() {
        const LocationData = await MaingeoCodeByLocation(req.query.address);    
        //if location is incorrect
        if (LocationData.error) {
            return res.send({ error: LocationData.error });
        }
        const WeatherData = await MaingetWeatherDataByLatLon(LocationData.latitude, LocationData.longtitude);
        if (WeatherData.error) {
            return res.send({ error: WeatherData.error });
        }
        WeatherData.place = LocationData['place'];
        return res.send({
            forecast: `${WeatherData.weather_descriptions} and temprature ${WeatherData.temperature} and it's feels like ${WeatherData.feelslike}`,
            location: WeatherData.place,
            address: req.query.address
        });
    }
    Main();
});

app.get('/Help/*', (req, res) => {
    res.render('404-Page-Not-Found', {
        Message: 'No help Found'
    });
});
app.get('/*', (req, res) => {
    res.render('404-Page-Not-Found', {
        Message: 'Page Not Found'
    });
});



app.listen(port, () => {
    console.log("Server Start at:3000 Port");
});