import make_request from "./utils";


export default class TaskLogAPI{
    static async get_list({filters}){
        return make_request(`/api/task`, filters)
    }
}