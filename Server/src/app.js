import koa from "koa"
import cors from "koa2-cors"

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

app.use(async ctx => {
    ctx.body = 'Hello World1';
});



export default app.callback();