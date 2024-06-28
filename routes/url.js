const express = require('express');
const {handleGenerateNewShortUrl, handleAnalytics} = require('../controller/url');
const Url = require('../models/url');

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);


router.get('/:shortId',async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        {
            shortId,
        },
        {
        $push:{
            visitHistory: {
                timestamp: Date.now(),
            }}
        });
        
        res.redirect(entry.redirectedURL);
});


router.get('/analytics/:shortId', handleAnalytics)

module.exports = router;