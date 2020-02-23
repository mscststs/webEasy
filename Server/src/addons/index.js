import session from "./session/session"
import getDB from "./database"
import getConfig from "./config"

export default async function(ctx,next){

    // 读取session
    ctx.config = await getConfig()
    ctx.session = await session.load(ctx)
    ctx.db = await getDB(ctx);

    
    await next(); // 中间件处理

    await session.save(ctx)
}