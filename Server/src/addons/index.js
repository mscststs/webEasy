import session from "./session/session"

export default async function(ctx,next){

    // 读取session
    ctx.session = await session.load(ctx)

    await next(); // 中间件处理

    
    await session.save(ctx)
}