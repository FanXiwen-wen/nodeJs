function add(x,y){
    return x+y
}
//这种方法导出的是exports这个对象，当访问add方法时，必须对象.add
//exports.add=add


//如果一个模块需要直接导出某个成员，而不是向exports中取挂载
module.exports=add

