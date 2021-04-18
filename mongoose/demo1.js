var mongoose=require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/test',{useMongoClient:true})

mongoose.Promise=global.Promise

//创建一个模型，就是在设定数据库
var Cat=mongoose.model('Cat',{name:String})

//实例化一个Cat
var Kitty=new Cat({name:'Zildjian'})

//持久化保存Kitty实例
Kitty.save(function(err){
    if(err){
        console.log(err)
    }else{
        console.log('meow')
    }
})