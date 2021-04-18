const { hasUncaughtExceptionCaptureCallback } = require('process')

var http=require('http')
var fs=require('fs')
const { endianness } = require('os')

var server=http.createServer()

server.on('request',function(req,res){
    var url=req.url
    fs.readFile('./template.html',function(error,data){
        if(error){
            return res.end('404 Not Found')
        }
        //1.得到目录列表中的文件名和目录名
        //   fs.readdir
        //2.如何将得到的文件名和目录名替换到template.html中
        //  2.1在template.html中需要替换的位置留一个特殊符号
        //  2.2根据files生成需要的html内容
        fs.readdir('E:/Node.js/resource',function(error,files){
            if(error){
                return res.end('404 Not Found')
            }
            var content=``
            files.forEach(function(item){
                content+=`
                <tr>
                <td data-value='apple/'><a class="icon dir" href="/public/${item}">${item}</a></td>
                <td class="detailsColumn" data-value="0"></td>
                <td class="detailsColumn" data-value="1509589967">2021/2/21</td>
                </tr>
                `
            })
            data=data.toString()
            data=data.replace('@@',content)
            //发送替换后的数据
            res.end(data)
        })
    })
})

server.listen(3000,function(){
    console.log('Running...')
})