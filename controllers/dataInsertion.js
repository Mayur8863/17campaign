
const sequelize = require("./confiq/db");
var initModels = require("./models/init-models");
var models = initModels(sequelize);
const parse = require('csv-parser');
const fs = require('fs');
const csvData= [];

module.exports = () =>{
    fs.createReadStream('./SampleShort.csv')
    .pipe(
        parse({})
    )
    .on('data',(dataRow)=>{
        csvData.push(dataRow);
    })
    .on('end',async ()=>{
        console.log("SucessFully Inserted Data");
        await models.customer.sync().then(result =>{
            console.log("customer Sync done" );
        });
        await models.state.sync().then(result =>{
            console.log("state Sync done" );
        });
        await models.district.sync().then(result =>{
            console.log("district Sync done" );
        });
        await models.tehsil.sync().then(result =>{
            console.log("tehsil Sync done" );
        });
        csvData.forEach(dataRow =>{
                const findCustomer = async () => await models.customer.findOne({where : {phone_no : dataRow.Mobile}});
                findCustomer().then(result =>{
                    if(!result)
                    {
                        const customer = async ()=> await models.customer.create({
                            name : `${dataRow.FirstName}  ${dataRow.LastName}`,
                            first_name: `${dataRow.FirstName}`,
                            last_name: `${dataRow.LastName}`,
                            phone_no: `${dataRow.Mobile}`,
                            district: `${dataRow.District}`,
                            tehsil : `${dataRow.Tahshil}`,
                            state: `${dataRow.State}`,
                            })
                            
                            customer().then(result =>{
                            console.log(`Success : ${result}`);
                            })
                            .catch(err =>{
                                console.log(`customer creation error : ${err}`);
                            })

                            if(dataRow.Tahshil!='')
                            {
                                const tehsil = async ()=> await models.tehsil.create({
                                    tehsil_name : `${dataRow.Tahshil}`,
                                    tehsil_id : `${dataRow.Tahshil_id}`
                                })
                                tehsil().then(result =>{
                                    console.log(`Success : ${result}`);
                                    })
                                    .catch(err =>{
                                        console.log(`tehsil creation error : ${err}`);
                                    })
                            }
                            if(dataRow.State!='')
                            {
                                const state = async ()=> await models.tehsil.create({
                                state_name : `${dataRow.State}`,
                                state_id : `${dataRow.State_id}`
                                })
                                state().then(result =>{
                                    console.log(`Success : ${result}`);
                                    })
                                    .catch(err =>{
                                        console.log(`state creation error : ${err}`);
                                    })
                            }
                            if(dataRow.District!='')
                            {
                                const district = async ()=> await models.district.create({
                                    district_name : `${dataRow.District}`,
                                    district_id : `${dataRow.District_id}`
                                })
                                district().then(result =>{
                                    console.log(`Success : ${result}`);
                                    })
                                    .catch(err =>{
                                        console.log(`District creation error : ${err}`);
                                    })
                            }
                    }
                })
                .catch(err =>{
                    console.log(err);
                })
        })
    })
}

