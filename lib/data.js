const fs= require('fs')
const path= require('path')

const lib={}

lib.basedir= path.join(__dirname,'/../.data/')

lib.create=function(dir,file,data,callback) {
    fs.open(`${lib.basedir+dir}/${file}.json`,'wx',(err,fileDescription)=>{
        if(!err && fileDescription){
            const stringData= JSON.stringify(data)

            fs.writeFile(fileDescription,stringData,(err2)=>{
                if(!err2){
                    fs.close(fileDescription,(err3)=>{
                        if(!err3){
                            callback(false)
                        }
                        else{
                            callback('error closing')
                        }
                    })
                }
                else{
                    callback('error new file')
                }
            })
        }
        else{
            callback('already exists')
        }
    })
}

lib.read=(dir,file,callback)=>{
    fs.readFile(`${lib.basedir+dir}/${file}.json`,'utf8',(err,data)=>{
        callback(err,data)
    })
}

lib.update=(dir,file,data,callback)=>{
    fs.open(`${lib.basedir+dir}/${file}.json`,'r+',(err,fileDescription)=>{
        if(!err && fileDescription){
            const stringData= JSON.stringify(data)
            fs.ftruncate(fileDescription,(err1)=>{
                if(!err1){
                    fs.writeFile(fileDescription,stringData,(err2)=>{
                        if(!err2){
                            fs.close(fileDescription,(err3)=>{
                                if(!err3){
                                    callback(false)
                                }
                                else{
                                    callback('close error')
                                }
                            })
                        }
                        else{
                            callback('error writing')
                        }
                    })
                }
                else{
                    callback('error ftruncate')
                }
            })
        }
        else{
            callback('error file')
        }
    })
}

lib.delete=(dir,file,callback)=>{
    fs.unlink(`${lib.basedir+dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false)
        }
        else{
            callback('error delete')
        }
    })
}

module.exports=lib