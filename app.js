var http = require('http');
http.createServer(function (req,res){

    if(req.method == "GET"){
        doGet(req,res);
    }else if(req.method == "POST"){
        doPost(req,res);
    }else{
        res.end();
    }
}).listen(1337,'127.0.0.1');

function doGet(req,res){
    console.log(req.url);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html>');
    res.write('<head>');
    res.write('<title>');
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<form method="post">');
    res.write('username:<input name="username">');
    res.write('password:<input name="password" type="password"><input type="submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    res.end();

}
function doPost(req,res){
    res.write("success");
    res.end();
}
console.log('Server running at http://127.0.0.1:1337');

