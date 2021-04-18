var net=require('net')
var clientList=[]

var server=net.createServer(function(socket){
    clientList.push(socket)
    //一旦有网络连接连上，就要绑定这个函数
    //回调函数的参数socket，不存在请求响应，而是实时响应、请求，连接是实时的
    //如果连接成功，就诶客户端发送
    socket.write('success\r\n')
    //如果客户端给服务器发什么，服务器就把这个消息再发回去
    socket.on('data',function(){
        console.log(data.toString())
        //服务器每接收一个数据，就把它广播到所有客户端上
        broadcast(data)
    })
    socket.on('end',function(){
        socket.write('end!')
    })
})
//广波函数
function broadcast(data){
    for(var i=0;i<clientList.length;i++){
        clientList[i].write(data)
    }
}

server.listen(1337,'127.0.0.1')