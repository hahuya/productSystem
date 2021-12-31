import make_request from "./utils";


export default class SimpleAPI{
    static async get_api_name(keyword){
        return make_request('/api/simple/get_api_name', {keyword:keyword});
    }
    static async get_sales_name({keyword}){
        if(!keyword || keyword.length < 2){return []}
        return make_request('/api/simple/get_sales_name', {keyword});
    }
}