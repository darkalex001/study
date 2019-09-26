const net = require('net');
var hostname = process.argv[2];
var port = process.argv[3];
const client = net.createConnection({host:hostname,port:port}, () => {
  // 'connect' 监听器
  console.log('已连接到服务器');
  client.write('你好世界!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  //client.end();
});
client.on('end', () => {
  console.log('已从服务器断开');
});

