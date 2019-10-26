const {unNormalSample} = require('../models');
const {normalSample} = require('../models');
const sequelize = require('sequelize');
const Op = require('sequelize').Op


function verifyUnNormal(reqBodyObject){
    if(reqBodyObject.gas >= 770 || reqBodyObject.temperature >= 45.0 ){
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
        //console.log("comecei a requisicao");
        await unNormalSample.findAll({
            order: sequelize.literal('id DESC'),
            raw: true,
            limit: 1,
        }).then(
            result => {
                //console.log("fiz a requisicao")
                console.log(result[0])
                res.json(result[0])
            }
        ).catch(err => {
            //console.log("Parei aki")
            res.json(err)})
    },

    //inseri dados na tabela unNormal e emit um evento através do socket io
    async insertUnNormal(req,res){
        console.log(req.body)
        if(verifyUnNormal(req.body)){
            io.emit('unNormalNotify',req.body);
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
        
    },

    async getVariousUnNormals(req,res){
        await unNormalSample.findAll({
            order: sequelize.literal('id DESC'),
            raw: true,
            limit: 20,
        }).then(result => {
            res.json(result)
        }).catch(err =>{
            res.send(err)
        })
    },

    async getLastNormals(req,res){
        await normalSample.findAll({
            order: sequelize.literal('id DESC'),
            raw: true,
            limit: 1,
        }).then(result => {
            res.json(result)
        }).catch(err =>{
            res.send(err)
        })
    }

    

}