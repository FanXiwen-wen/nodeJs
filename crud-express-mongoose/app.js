var express=require('express')
var path=require('path')
var session=require('express-session')
var bodyParser=require('body-parser')
var router=require('./router')

var app=express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//在Express这个框架中，默认不支持Session Cookie
//我们可以使用express-session中间件来使用
//配置好后，可以通过req.session来访问和设置了
//添加session数据：req.session.foo='bar'
//访问session数据：req.session.foo
//默认session是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把session持久化存储
app.use(session({
    secret:'itcast',//自定义的加密字符串,在原有加密基础上和这个拼起来去加密
                    //放置客户端恶意伪造，目的是增强安全性
    resave:false,
    saveUninitialized:true//如论是否使用session,我都直接默认给你一个session
}))


app.use(router)

//配置一个处理404的中间件
app.use(function(req,res){
    //前面的中间件都没有匹配，一直进入到这里就说明发生了页面找不到的错误
    res.render('404.html')
})

//配置一个全局错误处理的中间件
//比如说在中间件里面如果next(err)则直接进入这个中间件，然后进行错误处理
app.use(function(err,req,res,next){
    return res.status(500).send(err.message)
})

app.listen(3000,function(){
    console.log('Running')
})