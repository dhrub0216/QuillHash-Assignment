
const fs= require('fs')
const re= require('re')
const rl= require('readline')
var master=[];
var variety=[];
var array_1=[];
var ip_range=[];

function fetching_logs(){
   var lineReader = rl.createInterface({
      input: fs.createReadStream('./tmp/directory/nginx.log')
    });
   
    lineReader.on('line', function (line) {
    
      variety.push(line);
      var matched_ip1= line.match(/([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]).([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s/g)
      variety.push(String(matched_ip1))
      var matched_date= line.match(/(0?[1-9]|[12][0-9]|3[01])[\/\-]([a-zA-Z]*)[\/\-]\d{4}/g)
      variety.push(String(matched_date))
      var matched_year= line.match(/\b2\d{3}/)
      variety.push(String(matched_year))
     var matched_month= line.match(/\b[A-Z][a-z]*/)
      variety.push(String(matched_month))
     var matched_day= line.match(/\b[0-9][/\/-]|\b[1-2][0-9]|\b3[01]/)
      variety.push(String(matched_day))
      master.push(variety)
      variety=[]
   })
   return master
}
function isWithinIPrange(ip, lowerBound, upperBound) {


  var ips = [ip.split('.'), lowerBound.split('.'), upperBound.split('.')];

  for(var i = 0; i < ips.length; i++) {

    for(var j = 0; j < ips[i].length; j++) {
      ips[i][j] = parseInt(ips[i][j]);
    }

    ips[i] = 
      (ips[i][0] << 24) + 
      (ips[i][1] << 16) + 
      (ips[i][2] << 8) + 
      (ips[i][3]);
  }

  if(ips[0] >= ips[1] && ips[0] <= ips[2]) return true;

  return false;
}


 exports.Filterlogsbyip= function(body,callback){
   lowerBound= '160.0.0.0'
   upperBound= '190.0.0.0'
   fetching_logs.forEach(function(item){
      var isInRange = isWithinIPrange(item[1], lowerBound, upperBound);
      if(isInRange){ 
         ip_range.push(item)
      }
});
callback(null, ip_range)
}

//FETCHING LOGS
exports.Fetchlogs= function(body,callback){
callback(null, fetching_logs())
} 

//FILTERING BY MONTH
exports.Filterlogsbymonth= function(body,callback){
   
   fetching_logs().sort(function(a,b){ 
      return a[4].charCodeAt(0)-b[4].charCodeAt(0)
    })
   callback(null, master[0])
}

//FILTERING BY YEAR
exports.Filterlogsbyyear= function(body, callback){
   fetching_logs().sort(function(a,b){ 
      return a[3]-b[3]
    })
   callback(null, master[0])
}