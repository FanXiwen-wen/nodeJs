var fs=require('fs')

function pReadFile(filePath){
    return new Promise(function(resolve,reject){
        fs.readFile(filePath,'utf8',function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

pReadFile('../Day01/hello.txt')
  .then(function(data){
      return pReadFile('../Day01/hello2.txt')
  })