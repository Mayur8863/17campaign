const sequelize = require("../confiq/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const customerGet = (req,res) =>{
    res.send("customer Data Get");
}
const customerPost = async (req,res) =>{
    // res.send('customer Data Post');

    await models.customer.sync().then(result =>{
        console.log("customer Sync done" );
    });

    const findCustomer = async () => await models.customer.findOne({where : {phone_no : req.body.phone_no}});
        findCustomer().then(result =>{
            const tehsil = async() =>{
                if(req.body.tehsil!='')
                            {
                                await models.tehsil.sync().then(result =>{
                                    console.log("tehsil Sync done" );
                                });
                                const tehsil = async ()=> await models.tehsil.create({
                                    tehsil_name : `${req.body.tehsil}`,
                                    tehsil_id : 1000
                                })
                                tehsil().then(result =>{
                                    console.log(`Success : ${result}`);
                                    })
                                    .catch(err =>{
                                        console.log(`tehsil creation error : ${err}`);
                                    })
                            }
            }
            const district = async () =>{
                if(req.body.district!='')
                            {
                                await models.district.sync().then(result =>{
                                    console.log("district Sync done" );
                                });
                                const district = async ()=> await models.district.create({
                                    district_name : `${req.body.district}`,
                                    district_id : 10023
                                })
                                district().then(result =>{
                                    console.log(`Success : ${result}`);
                                    })
                                    .catch(err =>{
                                        console.log(`District creation error : ${err}`);
                                    })
                            }
            }
            const state = async () =>{
                            if(req.body.state!='')
                            {
                                await models.state.sync().then(result =>{
                                    console.log("state Sync done" );
                                });
                                const state = async ()=> await models.state.create({
                                state_name : `${req.body.state}`,
                                state_id : 1001
                                })
                                state().then(result =>{
                                    console.log(`Success : ${result}`);
                                    })
                                    .catch(err =>{
                                        console.log(`state creation error : ${err}`);
                                    })
                            }
            }

            if(!result)
                {
                    let idcustomer;
                    // Customer Creation
                    const customer = async ()=> await models.customer.create({
                        name : `${req.body.first_name}  ${req.body.last_name}`,
                        first_name: `${req.body.first_name}`,
                        last_name: `${req.body.last_name}`,
                        phone_no: `${req.body.phone_no}`,
                        district: `${req.body.district}`,
                        tehsil : `${req.body.tehsil}`,
                        state: `${req.body.state}`,
                        })
                        
                        customer().then(result =>{
                            idcustomer = result.idcustomer;
                        res.json(result);
                        })
                        .catch(err =>{
                            res.send(`customer creation error : ${err}`);
                        })

                        // State , Tehsil , District Update
                        state();
                        district();
                        tehsil();

                            // Customer Campaign Table
                            const findCampaign = async () => await models.campaign.findOne({where : {name : req.body.campaign}});
                            findCampaign().then(async (result) =>{
                                if(result)
                                    {
                                        await models.customer_campaign.sync().then(result =>{
                                            console.log("customer Sync done" );
                                        });
                                        const customer_campaign= async ()=> await models.customer_campaign.create({
                                            idcustomer : idcustomer,
                                            idcampaign : result.idcampaign
                                        })
                                            
                                        customer_campaign().then(result =>{
                                            console.log(`customer_campaign Creation Success : ${result}`);
                                        })
                                        .catch(err =>{
                                            console.log(`customer_campaign creation error : ${err}`);
                                        })
                                    }
                            })
                            .catch(err =>{
                                res.send(`Error in finding Campaign ${err}`)
                            })
                }
            else{
                // console.log("ee");
                const customer = async ()=> await models.customer.update(
                    {
                        name : `${req.body.first_name}  ${req.body.last_name}`,
                        first_name: `${req.body.first_name}`,
                        last_name: `${req.body.last_name}`,
                        district: `${req.body.district}`,
                        tehsil : `${req.body.tehsil}`,
                        state: `${req.body.state}`,
                    },
                    {where : {idcustomer : result.idcustomer}}
                    )
                    
                    customer().then(result =>{
                    res.send(`Customer Updation Success : ${result}`);
                    })
                    .catch(err =>{
                        res.send(`Customer Updation Error : ${err}`);
                    })

                    // State , Tehsil , District Update
                    if(!result.tehsil) tehsil();
                    if(!result.state) state();
                    if(!result.district) district();
            }
            })
            .catch(err =>{
                res.send(`Error in finding Customer ${err}`)
            })
}

module.exports = {
    customerGet : customerGet,
    customerPost : customerPost,
}
