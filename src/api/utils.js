import config from 'react-global-configuration';
import {popErrorMsg} from "../redux/errorMsg/errMsgSlice";
import store from '../redux/store';

const URL_PREFIX = config.get('url_prefix', '')


export async function make_base_request(url, data, params) {
    let request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: !!data?JSON.stringify(data):undefined,
        ...params
    }
    if(request.method==='GET'){
        delete request.body
    }
    try{
        const r = await fetch(`${URL_PREFIX}${url}`, request)
        if(!r.ok){
            await Promise.reject(new Error(JSON.stringify(await r.json())))
        }
        return r
    }catch(e){
        store.dispatch(popErrorMsg(e.toString()))
        await Promise.reject(e)
    }
}


export default async function make_request(url, data, params={}){
    return make_base_request(url, data, params).then(r=>r.json()).catch(e=>{
        store.dispatch(popErrorMsg(e.toString()))
        return Promise.reject(e)
    })
}