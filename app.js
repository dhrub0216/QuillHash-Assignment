var express = require('express');
var mongoose= require('mongoose')
var validator= require('validator')
var fs= require('fs')
var app = express();
var port=3000;
app.use(express.json())

app.post('/',function(req,res){
    res.send(req.body.name);
});

var userSchema= new mongoose.Schema({
    email: {
        type: 'String',
        required: true,
        trim: true,
        validate(email){ 
            if (!validator.isEmail(email)){
                return ("Your Email Id is not correct")
            }
        }
    },
    password: {
        type: 'String',
        required:true,
        trim :true,
        minlength:6
    }
})

const readNginx= function(){
    fs.readFile('./tmp/directory/nginx.log', function(err,data){
        if(err){
            throw err
        }
        console.log(data.toString())
    })
    }

app.post('/login',function(req,res){
const User= mongoose.model('User',userSchema)
const x= req.body
const user= new User(x)
try{
    user.save()
    readNginx()
    res.status(200).send(user)
} catch (e) {
    res.status(404)
}
})

app.listen(port,function(){
    console.log('Server running on port '+port);
});

var AWS= require('aws-sdk')
var path=require('path')
var hbs=require('hbs')


const viewsPath= path.join(__dirname, './templates/views')

app.set('views',viewsPath)

app.get('/login',(req,res)=>{
    res.render('login')
})