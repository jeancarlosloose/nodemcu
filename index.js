const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const app = express();

app.use(express.static(__dirname+'/web'));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({urlencoded: true}))

app.use(require('./src/routes/route'))

router.get('/txt',function(req,res){
    res.sendFile(path.join(__dirname+'/web/teste.txt'));
  });
app.use(express.static(__dirname + '/web'));

app.use('/',router);


app.listen(7070,()=>{
    console.log('server on, and disponible on port 7070')
})


