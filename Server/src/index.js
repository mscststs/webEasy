import fs from "fs"
import http from "http"
import https from "https"
import app from "./app"
import {readConfig} from "./config"

let servers = [];
let currentApp = app;

async function init(){
    // 初始化配置文件，开启服务器
    const config = await readConfig();
    // 检查 http server
    if(config.http && config.http.enable){
        try{
            let httpServer = http.createServer(app);
            httpServer.listen(config.http.port || 80);
            servers.push(httpServer);
            console.log(`|- HTTP Server Started`)
        }catch(e){
            console.error(`|- HTTP Server Init Failed`,e.message);
        }
    }
    // 检查 https server
    if(config.https && config.https.enable){
        try{
            let httpsServer = https.createServer({
                key: fs.readFileSync(config.https.key),
                cert: fs.readFileSync(config.https.crt)
            },app)
            httpsServer.listen(config.httpsServer.port || 443);
            server.push(httpsServer)
            console.log(`|- HTTPS Server Started`)
        }catch(e){
            console.error(`|- HTTPS Server Init Failed`,e.message);
        }
    }
}

init(); //服务器初始化

if (module.hot) {
    module.hot.accept('./app', () => {
        servers.forEach(server=>{
            server.removeListener('request', currentApp)
            server.on('request', app)
        })
        currentApp = app
    })
}