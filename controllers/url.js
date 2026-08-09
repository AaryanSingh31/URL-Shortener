const ids = require('short-id');
const URL = require('../models/url');
async function handleGenNewShortUrl(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            err : "URL is required"
        })}
    const shortId = ids.generate();
    await URL.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory : []
    });

    return res.json({
        id : shortId
    })
}

//Handle redirecting

async function handleRedirectUrl(req, res){
    const entry = await URL.findOneAndUpdate(
        {shortId : req.params.shortId}, 
        {
            $push : {
                visitHistory : {timestamps : Date.now()}
            }
        }
    );

    if(!entry){
    return res.status(404).json({
        message : "No URL found for this short id"
        })
    }

    return res.redirect(entry.redirectUrl);
    
}

module.exports = {
    handleGenNewShortUrl,
    handleRedirectUrl
};