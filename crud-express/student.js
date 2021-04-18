/*
student.js
数据操作文件模块
职责：操作文件中的数据，只处理数据，不关心业务
*/
var fs=require('fs')
var dbPath='./db.json'

//获取所有学生列表
//回调函数：获取异步操作的结果
//callback中的第一个参数是err,第二个参数是结果
exports.find=function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
        var ret=students.find(function(item){
            return item.id===parseInt(id)
        })
        callback(null,ret)
    })

}

//添加保存学生
exports.save=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        //处理id唯一问题
        student.id=students[students.length-1].id+1
        //将用户传递的对象保存到数组中
        students.push(student)
        //把对象数据转换成字符串
        var fileData=JSON.stringify({
            students:students
        })
        //把字符串添加到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

//更新学生
exports.updateById=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students

        //将id转换为int类型
        student.id=parseInt(student.id)

        //根据id查找要修改的对象
        //查找方法：find:需要接受一个函数作为参数，当某个遍历项符合item.id===student.id时，就会终止遍历，同时返回遍历项
        var stu=students.find(function(item){
            return item.id===parseInt(student.id)
        })
        //将用户修改的值直接覆盖原来的值，遍历拷贝对象
        for(var key in student){
            stu[key]=student[key]
        }

        //把对象数据转换成字符串
        var fileData=JSON.stringify({
            students:students
        })
        //把字符串添加到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

//删除学生
exports.deleteById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students

        //findIndex专门用来根据条件查找元素的下标
        var deleteId=students.findIndex(function(item){
            return item.id===parseInt(id)
        })

        //将学生根据下标从数据中删除对应的学生对象
        students.splice(deleteId,1)

         //把对象数据转换成字符串
         var fileData=JSON.stringify({
            students:students
        })
        //把字符串添加到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}