const {unNormalSample} = require('../models');
const {normalSample} = require('../models');
const sequelize = require('sequelize');
const Op = require('sequelize').Op

function verifyUnNormal(gas,temperature){
    if(gas > 770 || temperature > 45.0 ){
        return true
    }else
        return false
}



module.exports = {

    async getAll(req,res){
        await unNormalSample.findAll({includ : ['temparature','gas','createdAt']}).then(result => {
            return res.json(result);
        }).catch((err) => {
            res.json(err)
        });
    },

    async getLastRegister(req,res){
        await unNormalSample.findAll({
            order: sequelize.literal('id DESC'),
            raw: true,
            limit: 1,
        }).then(
            result => {
                res.json(result)
            }
        ).catch(err => {res.json(err)})
    },

    async insertUnNormal(req,res){

        console.log(req.body)
        if(verifyUnNormal(req.body.gas,req.body.temperature)){
            await unNormalSample.create(
                req.body
            ).then(result =>{
                res.send(result)
            })
        }else{
            await normalSample.create(
                req.body
            ).then(result =>{
                res.send(result)
            })
        }

        
    }

    

    

}