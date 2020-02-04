const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
            if (err) {
                console.log('Unable to append to server.log');
            }
        })
        //req.method = kon method ta use hocche
        //req.url = kon page tar jonno click korlam

    next(); //next ta na likhle amader app run korto na

})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'We will get back to you soon'

//     });
// })

app.use(express.static(__dirname + '/public')); //eta use korsi help er jonno.

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //way 1: res.send('<h1>Hello Express</h1>');
    //way 2: res.send({
    //     name: 'Anisha',
    //     likes: [
    //         'Food', 'Study'
    //     ]
    // })
    //way 3:
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    //res.send('About page');
    //etar bodole nicher ta
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
    //template engine use kore amra just template tar
    //nam likhle oi page ta dekha jacche :')
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});