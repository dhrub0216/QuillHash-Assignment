
const fs= require('fs')
const re= require('re')
const rl= require('readline')
//  exports.Fetchlogs= function(body ,callback){
//         fs.readFile('./tmp/directory/nginx.log', function(err,data){
//             if(err){
//                callback(err)
//             }
//             callback(null,data.toString())
//         })  
//  }

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




var master=[];
var variety=[];
exports.Fetchlogs= function(body,callback){
var lineReader = rl.createInterface({
   input: fs.createReadStream('./tmp/directory/nginx.log'),
   output: master
 });
 
 lineReader.on('line', function (line) {
   variety.push(line);
   matched_ip1= line.match(/([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/g)
   variety.push(matched_ip1)
   matched_date= line.match(/(0?[1-9]|[12][0-9]|3[01])[\/\-]([a-zA-Z]*)[\/\-]\d{4}/g)
   variety.push(matched_date)
   matched_year= line.match(/\b2\d{3}/)
   variety.push(matched_year)
   matched_month= line.match(/\b[A-Z][a-z]*/)
   variety.push(matched_month)
   matched_day= line.match(/\b[0-9][/\/-]|\b[1-2][0-9]|\b3[01]/)
   variety.push(matched_day)
   master.push(variety)
})

callback(null, master)
} 

exports.Filterlogsbymonth= function(body,callback){
   callback(null,master[4].sort())
}