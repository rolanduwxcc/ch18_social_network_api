const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//all the routes will be referenced from here looking at index.js
app.use(require('./routes')); 

//mongo(ose) DB setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useFindAndModify: false,
    useNewUrlParser: false,
    useUnifiedTopology: true
});


//this string will log mongo queries to console that are being executed
mongoose.set('debug', true);


//start the server!!
app.listen(PORT, () => {
const helloString = 'What if I told you this was a dream';
console.log(`
🌍 Connected on localhost:${PORT}
${helloString}
`)
});