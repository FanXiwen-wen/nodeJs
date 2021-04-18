var http=require('http')
var url=require('url')
var cookie=require('./moddilewares/cookie')
var query=require('./moddilewares/query')

var server=http.createServer(function(req,res){
    //解析请求地址中的get参数
    //这就是一个中间件
    //模块化让职责更清晰
    //中间件说白了就是一个方法
    query(req,res)

    //解析请求地址中的post参数
    req.body={
        foo:'bar'
    }

    //解析Cookie
    req.cookies={
        isLogin:true
    }

    //配置session
    req.session={

    }

    //配置模板引擎
    res.render=function(){

    }

    //上面的过程都是为了在后面做具体业务操作的时候更加方便

})

server.listen(3000,function(){
    console.log('Running')
})