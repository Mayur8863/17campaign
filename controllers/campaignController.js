const sequelize = require("../confiq/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const campaignGet = (req,res) =>{
    res.send("Campaign Data Get");
}
const campaignPost = async (req,res) =>{
    await models.campaign.sync().then(result =>{
        console.log("campaign Sync done" );
    });
    const campaign = async() => await models.campaign.create({
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    })
    campaign().then(result =>{
        res.status(200).json(result)
    })
    campaign().catch(err =>{
        res.status(404).json(err)
    })
}

module.exports = {
    campaignGet : campaignGet,
    campaignPost : campaignPost,
}