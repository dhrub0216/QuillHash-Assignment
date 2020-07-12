var authService = require('../Services/AuthService');
exports.register = function(req, res){
    let register = authService.Register(req.body, function(err, result){
    if(err)
        res.send(err);
    res.send(result);
  })
}

exports.login = function(req, res){
    let login = authService.Login(req.body, function(err, result){
        if(err){
            
            res.send(err)
        }
           
        res.send(result);
    })
 }

