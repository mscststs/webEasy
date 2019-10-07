import crypto from "crypto"
import store from "./store"

export default new class{
    constructor(){
        this.store = store
    }
    async load(ctx){
        let sessionId = ctx.cookies.get("sessionId")
        // 判断Cookies 中是否存在 SessionId
        if(!sessionId || !await this.store.read(sessionId)){
            // 初始化session
            sessionId = this.initSessionId();
            ctx.cookies.set(
                'sessionId', 
                sessionId,
                {
                  maxAge: 60 * 60 * 1000, // cookie有效时长
                  httpOnly: true,  // 是否只用于http请求中获取
                  overwrite: true  // 是否允许重写
                }
            )
            await this.store.write(sessionId,{});
        }

        ctx._sessionId = sessionId;
        return await this.store.read(sessionId); 
    }
    async save(ctx){
        await this.store.write(ctx._sessionId,ctx.session);
    }
    initSessionId(){
        let hash = crypto.createHash('sha1') // sha1
        hash.update(`${new Date().valueOf()}+${Math.random}`) // timeStamp + random
        return hash.digest('hex') // sha1 hex
    }
}