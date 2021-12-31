import make_request from "./utils";


export default class StorageAPI{
    static async get_simple_storage(cat_no){
        if(!cat_no) return []
        return make_request(`/api/storage/simple/${encodeURIComponent(cat_no)}`)
    }
}