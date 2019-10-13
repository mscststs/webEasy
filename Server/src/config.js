import fs from "fs"
function readFile(...params){
    return new Promise((resolve,reject)=>{
        fs.readFile(...params,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

export async function readConfig(filePath = "./conf.json"){
    try{
        let conf = await readFile(filePath)
        conf = conf.toString();
        conf = JSON.parse(conf);
        return conf;
    }catch(e){
        console.error(`Read Config Failed ${filePath}`,e.message)
    }
}