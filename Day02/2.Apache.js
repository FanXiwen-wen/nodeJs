var http=require('http')
var fs=require('fs')

var server=http.createServer()

server.on('request',function(req,res){
    var url=req.url
    var wwwDir='E:/Node.js/resource'
    var filePath='/范晰雯-湖南美食介绍.html'
    if(url!=='/'){
        filePath=url
    }
    fs.readFile(wwwDir+filePath,function(error,data){
        if(error){
            return res.end('404 Not Found')
        }else{
            res.end(data)
        }
    })
})


server.listen(3000,function(){
    console.log('Running')
})