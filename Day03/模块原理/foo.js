//在Node中每个模块内部都有自己的module对象
//module对象中有一个成员叫：exports，默认为空
//默认在代码最后一句有：return module.exports
//谁来require我，就得到module.exports
//所以如果需要对外导出成员，只需要把成员挂载到module.exports

//{foo:bar}
exports.foo='bar'

//{foo:bar a:123}
module.exports.a=123

//exports!===module.exports
//最终return 的是module.exports
//所以无论在exports中的成员是什么都没用
exports={
    a:456
}

//{foo:haha a:123}
module.exports.foo='haha'

//没关系
exports.c=456

//重新建立了引用关系
exports=module.exports
//这里是生效的{foo:haha,a:789}
exports.a=789