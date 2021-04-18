//Node中提供了一个http模块

//1.加载http模块
var http=require('http')
//2.使用http.createServer()方法创建一个Web服务器
//    返回一个Server实例
var server=http.createServer()
//3.服务器要干嘛:提供服务、发请求、接收请求、处理请求、发送响应
//     注册request请求事件，当客户端请求发送过来，就会自动触发服务器的request请求事件，然后执行回调处理
//     需要接受两个参数
//       Request请求对象：获取客户端的请求信息
//       Response响应对象：给客户端发送响应信息
server.on('request',function(request,response){
    console.log('收到客户端的请求,请求路径是'+request.url)
    //发送响应
    var url=request.url //获取到的是端口号之后的路径
    if(url==='/'){
        response.setHeader('Content-Type','text/plain;charset=utf-8')
        response.end('首页')
    }else if(url==='/login'){
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.end('<p>hello html<a href="">点我</a></p>')
    }else{
        response.end('404 Not Found')
    }
})
//绑定端口号，启动服务器
server.listen(3000,function(){
    console.log('服务器启动成功了，可以通过http://127.0.0.1:3000访问')
})