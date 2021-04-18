var express=require('express')
var User=require('./models/user')

var router=express.Router()

router.get('/',function(req,res){
    res.render('index.html',{
        user:req.session.user
        //然后再页面中就可以读取user
        //{{user.nickname}}
    })
})

router.get('/login',function(req,res){
    console.log(req.session.user)
    res.render('login.html')
})

router.post('/login',function(req,res,next){
//1.获取表单数据
//2.验证用户名 密码是否正确
//3.发送响应
var body=req.body
User.findOne({
    email:body.email,
    password:body.password
},function(err,user){
    if(err){
        next(err)
    }
    if(!user){
        //没有这个用户
        next(err)
    }
    //如果有，说明登录成功,记录登录状态
    //异步请求，重定向无效
    req.session.user=user
    res.status(200).json({
        err_code:0,
        message:'ok'
    })
})
})

router.get('/register',function(req,res){
    res.render('register.html')
})

router.post('/register',function(req,res,next){
    //1.拿到表单数据:req.body
    //2.操作数据库：判断用户是否存在
    //3.发送响应
    var body=req.body
    //查询邮箱是否已经存在
    User.findOne({
        $or:[
            {
                email:body.email
            },
            {
                nickname:body.nickname
            }
        ]
    },function(err,data){
        if(err){
            next(err)
        }
        if(data){
            //邮箱或者昵称已经存在
            //页面是异步处理，使用json
            return res.status(200).json({
                err_code:1,
                message:'邮箱或昵称已存在'
            })
        }
        //如果不存在

        //保存到数据库，post请求表单body中就包括了email nickname password
        new User(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'服务端错误'
                })
            }
            //注册成功
            res.status(200).json({
                //提供了json方法
                //该方法接受一个对象作为参数，自动将对象转成字符串再发给浏览器
                err_code:0,
                message:'ok'
            })
            //使用session记录用户状态
            req.session.user=user
        })
    })
})

router.get('/logout',function(req,res){
    //清除登录状态
    //重定向到登录页面:a链接是同步请求
    req.session.user=null
    res.redirect('/login')
})

app.use(function(err,req,res,next){
    return res.status(500).json({
        err_code:500,
        message:err.message
    })
})


module.exports=router