//将所有html页面放在views目录
//将所有需要加载的静态资源放在public目录中
//哪些资源能够访问，哪些资源不能够访问时可以控制的

var http=require('http')
var fs=require('fs')
var template=require('art-template')
var url=require('url')
var comments=[
    {
        name:'Jack',
        message:'天气不错'
    },
    {
        name:'nancy',
        message:'天气不错'
    },
]


http
  .createServer(function(req,res){
    //路径为/pinglun?name=xxx&message=xxx
    //使用url.parse方法将路径解析为一个方便操作的对象，第二个参数true表示直接将查询字符串转为一个对象(通过query属性访问)
    var parseObj=url.parse(req.url,true)  
    //单独获取不包含查询字符串的路径部分（该路径不包含？之后的内容）
    var pathname=parseObj.pathname
      if(pathname==='/'){
          fs.readFile('./views/index.html',function(err,data){
              if(err){
                  return res.end('404 Not Found')
              }
              data=template.render(data.toString(),{
                  comments:comments
              })
              res.end(data)
          })
      }else if(pathname.indexOf('/public/')===0){
          //如果客户端请求路径是以/public/开头的，就可以把请求路径当做文件路径读取
          fs.readFile('.'+pathname,function(err,data){
              if(err){
                  return res.end('404 Not Found')
              }
              res.end(data)
          })
      }else if(pathname==='/post.html'){
          fs.readFile('./views/post.html',function(err,data){
              if(err){
                  return res.end('404 Not Found')
              }
              res.end(data)
          })
      }else if(pathname==='/pinglun'){
         //这个时候无论/pinglun后问号是什么都会进入这里处理
         //parse.Obj里面就是name这些信息
         //我们已经通过url模块的parse方法将请求路径中的查询字符串解析成了一个对象，所以接下来就是获取表单提交的数据，将数据对象存储到数组中，再让用户重定向到首页
         var comment=parseObj.query
         comments.push(comment)
         //服务器重定向
         //1.状态码设置为302临时重定向
         //2.响应头中通过Location高速客户端往哪里重定向
         res.statusCode=302
         res.setHeader('Location','/')
         res.end()
        }
  })
  .listen(3000,function(){
      console.log('Running...')
  })