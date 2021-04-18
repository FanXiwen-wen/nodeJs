const { error } = require('console')
var fs=require('fs')

//ES6中新增了一个API Promise
//Promise是一个构造函数

//创建Promise容器,容器里面通常放一个异步任务
//当Promise容器一旦创建，就立即执行里面的任务
//但容器里面的任务还是异步的，容器本身并不是异步的
var p1=new Promise(function(resolve,reject){
    fs.readFile('../Day01/hello.txt','utf8',function(err,data){
        if(err){
            //承诺容器中的任务失败了
            //把容器的pending状态变为rejected
            //相当于调用then方法的第二个参数
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})

var p2=new Promise(function(resolve,reject){
    fs.readFile('../Day01/hello2.txt','utf8',function(err,data){
        if(err){
            //承诺容器中的任务失败了
            //把容器的pending状态变为rejected
            //相当于调用then方法的第二个参数
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})

//当承诺完成之后，就做指定的操作
//then方法接收的就是容器中的resolve函数
p1
 .then(function(data){
   console.log(data)
   //当前函数中return 的结果就是后面的then中的function接收到
   //没有return 后面收到的就是undefined
   //真正有用的就是我们return一个Promise对象
   //当return 一个Promise对象的时候，后续then中的方法第一个参数就会作为p2的resolve,第二个参数为p2的reject
   return p2
},function(err){
    console.log('读取文件失败',err)
})
 .then(function(data){//p2的resolve函数
  console.log(data)
 },function(err){
     console.log(err)
 })