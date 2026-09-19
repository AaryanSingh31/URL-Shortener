//This file is used to handle the static routes of the application. For example, if we want to render a page when the user visits a specific URL, we can define that route here.

const express = require('express')
const router = express.Router();
const URL = require('../models/url');
//This route will render the Home.ejs file when the user visits the root URL of the application. The Home.ejs file is located in the views folder.
router.get('/', async (req, res) => {
    const allUrls = await URL.find({}); //this will fetch all the urls from the database and store it in the variable allUrls
    res.render('Home', {urls : allUrls}); //we are passing the urls to the Home.ejs file to render it
});

module.exports = router;