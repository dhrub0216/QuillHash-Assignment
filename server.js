const http= require('http')
const app= require('./app')
const port= process.env.SERVERPORT || 4000;
const server= http.createServer(app);

const onListening= ()=>{
    console.log("Server is listening on " + port)
}

server.on('listening',onListening)
server.listen(port)


