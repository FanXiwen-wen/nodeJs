//require方法的两个作用：
//    加载文件模块并执行里面的代码
//    拿到被加载文件模块导出的接口对象
//每个文件模块中都提供了一个对象：exports，默认是一个空对象
//   把所有需要被外部访问的成员挂载到这个exports对象中
var ret=require('./hello.js')
console.log(ret.foo)