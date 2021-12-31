import make_request from "./utils";


export default class SalesActivityAPI {
    static get_list_by_customer = (customer_id) => async ({filters})=>{
        if(!customer_id){
            return
        }
        return make_request(`/api/sales_activity/customer/${customer_id}`, filters)
    }
}