
var mongoose=require('mongoose')
var Schema=mongoose.Schema
//连接test数据库
//指定连接的数据库不需要存在，只要插入第一条数据就会自动创建
mongoose.connect('mongodb://localhost/test')

//设计集合结构
var userSchema=new Schema({
    username:{
        type:String,
        required:true//不能为空
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    }
})

//将文档结构发布为模型
//第一个参数，传入一个大写名词单数字符串用来表示你爹数据库名称
//    mongoose会自动将大写名词的字符串生成小写负数的集合名称
//    例如这里的User最终会变为users集合名称
//返回值：模型构造函数
var User=mongoose.model('User',userSchema)


//当我们有了模型构造函数之后，就可以使用这个构造函数就可以对users集合中的数据进行操作了
//保存数据
var admin=new User({
    username:'admin',
    password:'123456',
    email:'admin@admin.com'
})

admin.save(function(err,ret){
    if(err){
        console.log('err')
    }else{
        console.log('保存成功')
        console.log(ret)
    }
})


//用户注册
//  1.判断用户是否存在
//     如果已经存在，就结束注册
//     如果不存在，就注册保留一条信息

User.findOne({
    username:'admin'
})
.then(function(user){
    if(user){
       //如果用户已经存在
       console.log('用户已经存在')
    }else{
      //如果用户不存在
      return new User({
          username:'aaa',
          password:'123',
          email:'asd'
      }).save()
    }
})