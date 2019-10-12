const {unNormalSample} = require('../models');
const sequelize = require('sequelize');
const Op = require('sequelize').Op

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
            limit: 2,
        }).then(
            result => {
                res.json(result)
            }
        ).catch(err => {res.json(err)})
    },

    async insertEx(){
        const samples = [
            {temperature : 20.3, gas: 450},
            {temperature : 26.3, gas: 650},
            {temperature : 29.3, gas: 720},
            {temperature : 38.3, gas: 740},
        ]
        unNormalSample.bulkCreate(samples,{
            returning: true
        }).then(res =>{
            console.log(res);
        })

    }

    

    

}