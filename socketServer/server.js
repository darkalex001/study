var net = require('net');

var server = net.createServer(function (socket) {
    socket.write('success! \r\n');
    //socket.pipe(socket);
    socket.on('data',function(data){
	console.log(data.toString());
        socket.write(data);
    });
    socket.on('end',function(){
        socket.write("end!");
    });
});

server.listen(1337,'127.0.0.1');
