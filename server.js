const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('toUpper', (inputText) => {
    return inputText.toUpperCase();
});
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    const now = new Date().toDateString();
    const logMessage = `${now}: ${req.method} ${req.url}`;
    console.log(logMessage);
    fs.appendFile('server.log', logMessage + '\n', (error) => {
        if (error) {
            console.log('error in log file');
        }
    });
    next();
});

app.get('/', (request, response) => {
    response.render('index.hbs', {
        pageTitle: 'Index title',
        redirectUrl: '/home',
        redirectName: 'Home'
    });
});

app.get('/home', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!',
        redirectUrl: '/',
        redirectName: 'Index'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
