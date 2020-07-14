var authService = require('../services/AuthService');
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