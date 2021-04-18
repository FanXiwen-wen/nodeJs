/*
router.js路由模块
职责：
  处理路由
  根据不同的请求方法和请求路径设置具体的响应
*/

var fs=require('fs')
var student=require('./student')
//Express提供了一种很好的方式专门用来封装路由
var express=require('express')
//1.创建一个路由容器
var router=express.Router()
//2.把路由都挂载到router路由容器中
router.get('/students',function(req,res){
    //自动转成utf8编码的数据，也就是字符串

    student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('index.html',{
            //从文件中读取到utf8编码的字符串，要手动转换成对象
            students:JSON.parse(data).students
        })
    })
})

router.get('/students/new',function(req,res){
    res.render('new.html')
})

//处理添加学生
router.post('/students',function(req,res){
    //获取表单数据
    //处理：将数据保存到db.json文件中
    //发送响应
    student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/xxx',function(req,res){

})

//渲染编辑学生页面
router.get('/students/edit',function(req,res){
    //1.在客户端的列表页面中处理链接问题（需要有id参数）
    //2.获取要编辑的学生的id
    //3.渲染编辑页面
    student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html',{
            student:student
        })
    })
})

//处理编辑学生
router.post('/students/edit',function(req,res){
    //获取表单数据
    //更新
    //发送响应
    student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete',function(req,res){
    //获取要删除的id
    //根据id执行删除操作
    //根据操作结果发送响应数据
    student.deleteById(id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//3.把router导出
module.exports=router
