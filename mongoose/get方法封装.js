function get(url){
    return new Promise(function(resolve,reject){
        var oReq=new XMLHttpRequest()
        oReq.onload=function(){
            resolve(oReq.responseText)
        }
        oReq.onerror=function(err){
            reject(err)
        }
        oReq.open("get",url,true)
        oReq.send()
    })
}

get('dsd')
 .then(function(data){
     console.log(data)
 })