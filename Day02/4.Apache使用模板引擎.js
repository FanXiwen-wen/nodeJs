const { hasUncaughtExceptionCaptureCallback } = require('process')

var http=require('http')
var fs=require('fs')
var template=require('art-template')
const { endianness } = require('os')

var server=http.createServer()

server.on('request',function(req,res){
    var url=req.url
    fs.readFile('./template2.html',function(error,data){
        if(error){
            return res.end('404 Not Found')
        }
        fs.readdir('E:/Node.js/resource',function(error,files){
            if(error){
                return res.end('404 Not Found')
            }
            //主需要使用模板引擎解析替换data中的模板字符串
            //数据就是files
            //然后去template.html中编写模板语法
            data=template.render(data.toString(),{
                files:files
            })


          res.end(data)
        })
    })
})

server.listen(3000,function(){
    console.log('Running...')
})