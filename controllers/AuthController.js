var authService = require('../services/AuthService');
var nginxlogService= require('../services/nginxlogs.service')
//const re= require('re')
var connector= null
exports.register = function(req, res){
    let register = authService.Register(req.body, function(err, result){
    if(err){
        res.send(err);
    }
    res.send(result);
  })
}

exports.login = function(req, res){
    let login = authService.Login(req.body, function(err, result){
        if(err){
            
            res.send(err)
        }
        connector= result
        res.send(result);
    })
 }

 exports.validate= function(req,res){
     let login= authService.Validate(req.body.token, function(err, result){
         if (err){
             res.send(err)
         }
         res.send(result)
     })
 }

 exports.fetchlogs= function(req,res){
     let fetch= nginxlogService.Fetchlogs(req.body, function(err, result ){
        if (err){
            res.send(err)
        }
        res.send(result)
     })
 }

 exports.filterlogsbyIP= function(req,res){
     let fetch= nginxlogService.Filterlogsbyip(req.body, function(err, result ){
        if (err){
            res.send(err)
        }
        res.send(result)   
  })
 }
 
 exports.filterlogsbydate= function(req,res){
    let fetch= nginxlogService.Filterlogsbydate(req.body, function(err, result ){
       if (err){
           res.send(err)
       }
       res.send(result)
        })
}