/*
HTTP协议
--请求 request

服务器
--接收客户端的消息
--广播消息

客户端
--发送消息
--接收服务器发送过来的消息

客户端的发送是基于                          HTTP协议
消息的发送和请求都是基于ws(web socket)       协议

node_modules文件夹是项目依赖模块文件夹
*/


var http = require("http");
var fs = require("fs");//引入文件系统模块
var ws = require("socket.io");//引入socket.io模块

var server = http.createServer(function (req, res) {
    var html = fs.readFileSync("./client.html"); //调用fs模块中的同步读文件方法
    console.log('服务器已连接，端口号3000');
    res.end(html);
}).listen(3000);

var io = ws(server);//http服务与ws服务相关联，并且返回io服务实例

io.on("connection",function(socket){
    //(socket)是对所有的消息进行处理的，比如登录，断开连接
    //因为不知道什么时候发送，所以是监听的事件io.on
    //这个回调函数是发生在用户连接io服务器的时候
    console.log("有新用户进入房间");
    //接收客户端的消息，socket可以看做是一个客户端
    socket.on("message",function(obj){
        //这个回调函数就是专门对消息进行处理
        console.log(obj);//打印从客户端发过来的消息
        io.emit("message",obj);//主动发送message，发送给所有已经连接的客户端，obj代表所有已经进入连接的对象
    });
});//监听emit事件，