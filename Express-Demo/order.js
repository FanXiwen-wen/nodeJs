var express=require('express')
var bodyParser=require('body-parser')

var app=express()

app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/order',function(req,res){
    res.render('order.html')
})

app.post('/order',function(req,res){
    var body=req.body
    var sum=0
    for (const dish in body) {
            sum += parseInt(body[dish]) ;
    }
    console.log(sum)
})

app.listen(3000,function(){
    console.log('Running')
})