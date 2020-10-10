const net = require('net')

const chatServer = net.createServer()
const clientList = []
chatServer.on('connection', client => {
  client.write('Hello \n')
  clientList.push(client)
  client.on('data', data => {
    console.log('receive:', data.toString())
    clientList.forEach(c => {
      c.write(data)
    })
  })
})

chatServer.listen(8080, ()=> {
  console.log('listerning on 8080');
  
})