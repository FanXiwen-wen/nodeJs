var mongoose=require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/test',{useMongoClient:true})

var Schema=mongoose.Schema

var userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_time:{
        type:Date,
        //不要写Date.now()因为会直接调用
        default:Date.now
    },
    last_modified_time:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:'/public/img/'
    },
    bio:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    birthday:{
        type:Date
    },
    status:{
        type:Number,
        //1 不可以评论
        //2 不登录使用
        enum:[0,1,2],
        default:0
    }
})

modules.exports=mongoose.model('User',userSchema)