import {readConfig} from "../../config"


export default async function getConfig(){
    let config = await readConfig();
    return config
}