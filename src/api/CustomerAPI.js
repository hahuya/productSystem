import make_request from "./utils";


export default class CustomerAPI{
    static async get_list({filters}){
        return make_request('/api/customer/', filters)
    }
    static async get_customer_simple({keyword}){
        if(!keyword||keyword.length<2){
            return []
        }
        return make_request('/api/customer/simple', {keyword, limit: 20})
    }
    static get_customer_contacts_simple = (customer_name)=>({keyword})=>{
        if(!customer_name){return}
        return make_request(
            '/api/customer/contact/simple',
            {
                customer_name: customer_name,
                keyword: keyword
            }
        )
    }
}