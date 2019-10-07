const net = require('net');
var clients = {};

const server = net.createServer((socket) => {

    var keys = Object.keys(clients);
    socket.__guid = keys.length + 1;
    clients[socket.__guid] = (socket);

    // console.log('client '+socket.__guid+' in !');
    console.log('client '+socket.__guid+' in !');

    socket.write('wellcome join Server !' + socket.__guid);

    socket.on('end', () => {
        console.log('client disconnect', socket.__guid);
    });

    socket.on('data', (data) => {
        for (let i in clients) {
            clients[i].write('from client '+socket.__guid+' : ' + data.toString());
        }
    });


});

server.on('error', (err) => {
    throw err
});

server.listen(8000, () => {
    console.log('server port 8000');
});