const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

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
        homeUrl: '/home',
        homeName: 'Home',
        redirectUrl: '/projects',
        redirectName: 'Projects'
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

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page',
        ProjectsMessage: 'Projects details goes here!',
        homeUrl: '/',
        homeName: 'Index'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
