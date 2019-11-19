const {unNormalSample} = require('../models');
const {normalSample} = require('../models');
const sequelize = require('sequelize');
const Op = require('sequelize').Op


function verifyUnNormal(reqBodyObject){
    if(reqBodyObject.gas >= 1000 || reqBodyObject.temperature >= 45.0 ){
        return true
    }else
        return false
}

const getOneUnnormal = new Promise((res,rej)=>{
    unNormalSample.findAll({
        order: sequelize.literal('id DESC'),
        raw: true,
        limit: 1,
    }).then(
        result => {
            //console.log("fiz a requisicao")
            //console.log(result[0])
            res(result[0])
        }
    ).catch(err => {
        //console.log("Parei aki")
        rej(err)
    })
})


const getOneNormal = new Promise((resolve, reject)=>{
    normalSample.findAll({
        order: sequelize.literal('id DESC'),
        raw: true,
        limit: 1,
    }).then(
        result => {
            //console.log("fiz a requisicao")
            console.log(result[0])
            resolve(result[0])
        }
    ).catch(err => {
        //console.log("Parei aki")
        reject(err)
    })
})



let variableReturnRT = {
    normal : true
}



module.exports = {

    async getAll(req,res){
        await unNormalSample.findAll({include : ['temparature','gas','createdAt']}).then(result => {
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
                console.log(result[0])
                res.json(result[0])
            }
        ).catch(err => {
            res.json(err)})
    },

    //inseri dados na tabela unNormal e emit um evento através do socket io
    
    async insertUnNormal(req,res){
        console.log(req.body)
        if(verifyUnNormal(req.body)){
            variableReturnRT.normal = false;
            io.emit('unNormalNotify',req.body);
            await unNormalSample.create(
                req.body
            ).then(result =>{
                res.send(result);
            }).catch(err=>{ 
                res.json(err)
            })
        }else{
            variableReturnRT.normal = true;
            await normalSample.create(
                req.body
            ).then(result =>{
                res.send(result)
            }).catch(err=>{
                res.json(err)
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

    //esta rota busca o ultimo dado da tabela normal
    async getLastNormals(req,res){
       if(variableReturnRT.normal === true){
            getOneNormal.then(result=>{
                res.json(result)
            })
       }else{
           getOneUnnormal.then(result=>{
               res.json(result)
           })
        }
    },
    


//teste
}
