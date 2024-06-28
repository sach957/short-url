const shortid = require("shortid")
const Url = require("../models/url")

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg:"url is requied"})
    
    const result = await Url.findOneAndUpdate({redirectedURL:body.url});
    if (result) return res.redirect("/");

    const shortId = shortid();
    
    await Url.create({
        shortId: shortId,
        redirectedURL: body.url,
        visitHistory:[],
        createdBy: req.user._id,
    });
    return res.render("home",{
        id: shortId,
    })
}

async function handleAnalytics(req,res){
    const shortId = req.params.ShortId;
    const result = await Url.findOneAndUpdate({shortId});
    return res.json({totalClickd: result.visitHistory.lenth, 
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleAnalytics,
};