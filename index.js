const express = require('express')

const { connectToMongoDB } = require('./connection');
const urlRoute = require('./routes/url')
const app = express();
const PORT = 4001;
const URL = require('./models/url');
const path = require('path'); //built in module for handling file paths
const staticRoute = require('./routes/staticRouter'); //this is the route for handling static files like css, js, images etc. We will use this route to serve the static files from the public folder.
app.use(express.json());

app.use('/',staticRoute); //this will serve the static files from the public folder
app.use(express.urlencoded({extended : false})); //this will parse the urlencoded data from the request body
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //setting the views folder path
connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("MongoDb connected"));

app.use('/url', urlRoute);
// app.get('/test', async(req, res) => {
//     const allUrls = await URL.find({}); //this will fetch all the urls from the database and store it in the variable allUrls
//     console.log(allUrls);
//     res.render('Home', {urls : allUrls}); //we are passing the urls to the Home.ejs file to render it
// })

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));