// server.js
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const images = require('./getImages')
const weathers = require('./getWeather')
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('list', (items, options) => {
    var out = "<ul>";
  
    for(var i=0, l=items.length; i<l; i++) {
      out = out + "<li>" + options.fn(items[i]) + "</li>";
    }
  
    return out + "</ul>";
  });
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render('index.hbs',{
        "title":"ACIT2520 Final Exam Main"

    });
})

app.get('/gallery', (req, res)=>{
    res.render('gallery.hbs',{
        "title":"Gallery"

    });
})

app.get('/Weather', (req, res)=>{
    res.render('weather.hbs',{
        "title":"Weather"
    });
})



app.post('/gallery', async (req, res)=>{
    try {
        console.log(req.body)
        let search_term = req.body.search_term
        items = await images.getImages(search_term)
        console.log(items)
        res.render('gallery.hbs',{
            "title":"Gallery",
            items:items  
        });
    }
    catch(err) {
        console.log(err)
        res.redirect('/404')
    }
    
})

app.post('/weather', async (req, res)=>{
    try {
        console.log(req.body)
        let search_term = req.body.search_term
        weather = await weathers.getWeather(search_term)
        console.log(weather.main)
        res.render('weather.hbs',{
            "title":"Weather",
            weather_description:weather.weather_description,
            location:weather.location
        });
    }
    catch(err) {
        console.log(err)
        res.redirect('/404')
    }
})


app.get('/404', (req, res)=>{
    res.render('404.hbs')
})


app.listen(port, ()=>{
    console.log(`Server Listening On Port ${port}`)
})