var fs=require('fs')
//第一个参数是要写入的文件路径
//第二个参数是要写入的内容
//第三个参数是回调函数:参数就是error,成功error是null,失败error时错误对象
fs.writeFile('./hello.txt','hello world',function(error){
  console.log('文件写入成功')
})