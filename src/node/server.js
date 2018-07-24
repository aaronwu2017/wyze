var app = require('express')();
var http = require('http');
const pool = require('./pool');
const fs = require('fs');
var httpServer = http.createServer(app);
var PORT = 8081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// Welcome
app.get('/cart', function(req, res) {
    var kind = req.query.kind;
    if(kind == 'select'){
        pool.query("SELECT * FROM cart",function(err,result){
            if (err) throw err;
            res.json(result);
        })
    }else if(kind == 'update'){
        var cid = req.query.cid;
        var count = req.query.count;
        pool.query("UPDATE cart SET count=? WHERE cid=?",[count,cid],function(err,result){
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result)).affectedRows;
            if(rows > 0){
                res.send({code:200,msg:"success"});
            }else{
                res.send({code:400,msg:"fail"});
            }
        })
    }else if(kind == 'insert'){
        var proid = req.query.proid;
        var pname = req.query.pname;
        var pavatar = req.query.pavatar;
        var price = req.query.price;
        var count = req.query.count;
        pool.query("INSERT INTO cart VALUES (null,?,?,?,?,?)",[proid,pname,pavatar,price,count],function(err,result){
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result)).affectedRows;
            console.log(rows);
            if(rows > 0){
                res.send({code:200,msg:"success"});
            }else{
                res.send({code:400,msg:"fail"});
            }
        })
    }else if(kind == 'delete'){
        var cid = req.query.cid;
        pool.query("DELETE FROM cart WHERE cid=?",[cid],function(err,result){
            if (err) throw err;
            res.json(result);
        })
    }
});
app.get('/product', function(req, res) {
    var kname = req.query.kind;
    pool.query("SELECT kid FROM kind WHERE kname=?",[kname],function(err,result){
        if (err) throw err;
        console.log(JSON.parse(JSON.stringify(result)));
        var kid = JSON.parse(JSON.stringify(result))[0].kid;
        pool.query("SELECT * FROM products WHERE kindid=?",[kid],function(err,result){
            if (err) throw err;
            res.json(result);
        })
    })
});
app.get('/img/:src',function(req,res){
    //设置请求的返回头type,content的type类型列表见上面
    res.setHeader("Content-Type", "image/jpeg");
    //格式必须为 binary 否则会出错
    console.log(req.params);
    var url = '../assets/img/'+req.params.src;
    var content =  fs.readFileSync(url,"binary");   
    res.writeHead(200, "Ok");
    res.write(content,"binary"); //格式必须为 binary，否则会出错
    res.end();
})