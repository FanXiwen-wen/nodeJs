var net=require('net')
var hostname=process.argv[2]
var port=process.argv[3]
//让客户端能够连接到不同的服务器上，而不是连接一个固定的服务器
var client=net.connect({host:hostname,port:port},function(){
    console.log('connected to server!')
    //设置编码
    process.stdin.setEncoding('utf8')
    //绑定事件判断是否有输入
    process.stdin.on('readable',function(){
        //读取用户输入的数据
        var chunk=process.stdin.read()
        if(chunk!==null){
            client.write('data:'+chunk)
        }
    })
})

client.on('data',function(data){
    console.log(data.toString())
})
//连接断开
client.on('end',function(){
    console.log('disconnected from server')
})