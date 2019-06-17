/**
 * SocketIO
 * 1) Events: connection and disconnect
 * 2) You can create your own events(emit)
 * 3) emit(): as emit a message to all connected clients
 * 4) broadcast.emit(): when you want to emit a message except yourself
 * 5) The four points work on server and client
 */
const c = console.log,
 http = require('http').createServer(server),
 fs = require('fs'),
 //socketIO server requires a server htpp
 io = require('socket.io')(http)

 let connections=0

 //interesting
 function server(req, res){
  fs.readFile('index.html', (err, data)=>{
   if (err) {
    res.writeHead(500, {'Content-Type':'text/html'})
    return res.end('<h1>Server nternal error</h1>')
   }else{
    res.writeHead(200, {'Content-Type':'text/html'})
    return res.end(data, 'utf8')
   }
  })
 }

 http.listen(3000, c('Server on port 3000'))
 
 //serverIO On 
 io.on('connection', socket=>{
  //Events: socket is an object io
  socket.emit('hello', {message:'Hello world with SocketIO'})
  //Show data from client
  socket.on('FromClient', data=>c(data))
  connections++
  c(`Active connections: ${connections}`)
  //Show active connectioms
  socket.emit('connected users', {connections})
  socket.broadcast.emit('connected users', {connections})
  //Disconnect
  socket.on('disconnect', ()=>{
   connections--
   socket.broadcast.emit('connected users', {connections})
   c(`Active connections: ${connections}`)
  })
 })