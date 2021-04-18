
var http=require('http')
var fs=require('fs')

var server=http.createServer()
server.on('request',function(request,response){
   var url=request.url;
   //读取文件，将html页面响应给客户端
   fs.readFile('./resource/范晰雯-湖南美食介绍.html',function(error,data){
       if(error){
           response.setHeader('Content-Type','text/plain;charset=utf-8')
           response.end('文件加载失败，请稍后再试')
       }else{
           //data默认是二进制数据，可以通过toString转为字符串
           //response.end支持二进制和字符串
           response.setHeader('Content-Type','text/html;charset=utf-8')
           response.end(data)
       }

   })
})

server.listen(3000,function(){
    console.log('服务器启动成功了，可以通过http://127.0.0.1:3000访问')
})