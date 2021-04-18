var express=require('express')

var app=express()

//在Express中，对中间件有几种分类

//不关心请求路径和请求方法的中间件
//也就是说任何请求都会进入这个中间件
//中间件本身是一个方法，接收三个参数
//     request请求  response响应  next调用下一个中间件
//如果进入一个中间件，没有调用next则会停留在这个中间件
//如果进入一个中间件调用了next就会向后找到匹配的第一个中间件进入
//如果没有匹配的中间件，就会输出Cannot GET/或者Cannot POST/
app.use(function(req,res,next){
    console.log('请求进来了1')
    next()//只有调用这个ext才会进入下一个中间件，否则不会自动进入
})

app.use(function(req,res,next){
    console.log('请求进来了2')
    //没有next不会往下一个中间件的
    //next也是要匹配下一个的，不一定就会进入紧挨着的下一个
})




//关心请求路径的中间件，以/xxx开头的中间件
app.use('/a',function(req,res,next){
    //以/a开头的路径，会进入这个中间件
    console.log(req.url)//得到的是/a后面的路径内容
})


//严格匹配请求方法和请求路径的中间件，比如app.get 和app.post
app.get('/',function(req,res,next){
    //是必须严格==='/',而不是以它开头
})


app.listen(3000,function(){
    console.log('Running')
})