const {normalSample} = require('../models');
const {unNormalSample} = require('../models');


module.exports = {

    async getAll(req,res){
        await normalSample.findAll({include : ['temparature','gas','createdAt']}).then(result => {
            return res.json(result);
        }).catch((err) => {
            res.json(err)
        });
    },

    async post(req,res){
        let efes = {
            temperature,
            gas,
        };

        await unNormalSample.create({
            temperature,
            gas
        }).then(result => {
            console.log(result);
        }).catch(err =>{
            console.log(err);
        });
    },

    

}