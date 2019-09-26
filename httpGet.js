var http = require('http');
var url = require('url');
var qs = require('querystring');
function doGet(req,res){
    var obj=qs.parse(url.parse(req.url).query);
    console.log(obj);
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

exports.doGet=doGet;