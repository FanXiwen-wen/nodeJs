//1.使用require方法加载fs核心模块
var fs=require('fs')

//2.读取文件
//     第一个参数是要读取的文件路径
//     第二个参数是一个回调函数
//         error
//             如果文件读取失败，error就是错误对象
//             如果文件读取成功，error就是null
//         data
//             如果文件读取失败，data就是null
//             如果文件读取成功，data就是读取的数据
fs.readFile('./hello.txt',function(error,data){
    if(error){
        console.log('读取文件失败')
    }else{
        console.log(data.toString())
    }
})