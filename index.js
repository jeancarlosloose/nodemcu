const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const serverHttp = require('http').Server(app);
const router = express.Router();
io = require('socket.io')(serverHttp);


app.use(express.static(__dirname+'/web'));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({urlencoded: false}))

app.use(require('./src/routes/route'))

router.get('/txt',function(req,res){
    res.sendFile(path.join(__dirname+'/web/index.html'));
  });
app.use(express.static(__dirname + '/web'));

app.use('/',router);


serverHttp.listen(80,()=>{
    console.log('server on, and disponible on port 80')
})




