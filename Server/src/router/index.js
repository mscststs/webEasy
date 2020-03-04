import Router from "koa-router"

let root = new Router()

root.get("/",async (ctx)=>{
    let [rows] = await ctx.db.query("SELECT * FROM t_html")
    ctx.body = rows;
})


/**
 * 404 兜底处理
 */
root.get("*",async (ctx)=>{
    ctx.body = ctx;
    // ctx.body = {status:404};
    ctx.status = 404
})



export default root