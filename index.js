const http=require('http')
const {handleReqRes} =require('./helpers/handleReqRes')
const environment= require('./helpers/environments')
const data=require('./lib/data')
const app={}

// app.config={
//     port:3000,
// }

// data.read('test','newFile',(err,data)=>{
//     console.log(err,data)
// })
// data.create('test','newFile',{name:'Dhaka',population:2222},(err)=>{
//     console.log(err)
// })
// data.update('test','newFile',{name:'Rajshahi',population:1111},(err)=>{
//     console.log(err)
// })
data.delete('test','newFile',(err)=>{
    console.log(err)
})

app.createServer=()=>{
    const server= http.createServer(app.handleReqRes)
    server.listen(environment.port,()=>{
        console.log(process.env.Node_ENV)
        console.log(`listening to port ${environment.port}`)
    })
}

app.handleReqRes=handleReqRes

    // console.log(headerObject)
   


app.createServer()