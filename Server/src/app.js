import koa from "koa"
import cors from "koa2-cors"
import root from "./router"
import addons from "./addons/index.js"

const app = new koa();

if(process.env.NODE_ENV=="development"){
    /* CORS */
    app.use(cors({
        origin:function(ctx){
            // allow "*" 弱爆了，定点allow又太麻烦，干脆做成自动allow
            return ctx.request.header.origin;
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 600,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept',"x-csrf-valid"],
    }));
}

app.use(addons); // 初始化逻辑

app.use(root.routes()).use(root.allowedMethods()) // 路由



export default app.callback();