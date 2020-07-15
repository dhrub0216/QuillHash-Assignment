const nginxlogService= require('../services/nginxlogs.service')

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

exports.filterlogsbymonth= function(req,res){
   let fetch= nginxlogService.Filterlogsbymonth(req.body, function(err, result ){
      if (err){
          res.send(err)
      }
      res.send(result)
       })
}

exports.filterlogsbyyear= function(req,res){
    let fetch= nginxlogService.Filterlogsbyyear(req.body, function(err, result ){
       if (err){
           res.send(err)
       }
       res.send(result)
        })
 }