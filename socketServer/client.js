const net = require('net');
var hostname = process.argv[2];
var port = process.argv[3];
const client = net.createConnection({host:hostname,port:port}, () => {
  // 'connect' 监听器
  console.log('已连接到服务器');
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    let chunk;
    // 使用循环确保我们读取所有的可用数据。
    while ((chunk = process.stdin.read()) !== null) {
      client.write(`数据: ${chunk}`);
    }
  });
  
});
client.on('data', (data) => {
  console.log(data.toString());
  //client.end();
});
client.on('end', () => {
  console.log('已从服务器断开');
});

