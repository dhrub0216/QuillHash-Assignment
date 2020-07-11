
const readNginx= function(){
    fs.readFile('./tmp/directory/nginx.log', function(err,data){
        if(err){
            throw err
        }
        console.log(data.toString())
    })
    }

module.exports= {
    readNginx:readNginx
}