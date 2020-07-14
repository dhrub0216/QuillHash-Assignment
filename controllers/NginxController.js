var nginxlogService= require('../services/nginxlogs.service')

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