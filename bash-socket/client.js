const net = require('net');
var scanf = require('scanf');
console.log("请输入姓名");
userName = scanf("%S");

const client = net.createConnection({port: 8000}, () => {
    console.log('connect to server 8000');

    process.stdin.on('data', (value) => {
        //const value = process.stdin.read();
        if (value !== null) {
            client.write(value);
        }
    });
});

client.on('data', (data) => {
    console.log(data.toString());
});


client.on('end', () => {
    console.log('disconnection from server');
    process.exit();
});

