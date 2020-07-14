
const fs= require('fs')
const re= require('re')
 exports.Fetchlogs= function(body ,callback){
        fs.readFile('./tmp/directory/nginx.log', function(err,data){
            if(err){
               callback(err)
            }
            callback(null,data.toString())
        })  
 }

 exports.Filterlogsbyip= function(body,callback){
   fs.readFile('./tmp/directory/nginx.log', function(err,data){
      if(err){
         callback(err)
      }
      var x= data.toString().match(/([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/g)
      callback(null,x)
  })
}
   

exports.Filterlogsbydate= function(body,callback){
   fs.readFile('./tmp/directory/nginx.log', function(err,data){
      if(err){
         callback(err)
      }
   var dateHash = {
      Jan : 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
     };
     callback(null,data.toString().match(/(0?[1-9]|[12][0-9]|3[01])[\/\-]([a-zA-Z]*)[\/\-]\d{4}:([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/g ))
})
}