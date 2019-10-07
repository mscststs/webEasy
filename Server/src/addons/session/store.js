/*
    Session Store
*/
export default new class{
    constructor(){
        this._store = {}
    }
    async write(sessionId,sessionData){
        this._store[sessionId] = sessionData;
    }
    async read(sessionId){
        return this._store[sessionId];
    }
} 