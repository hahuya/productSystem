import CustomerInquiryAPI from "../../../api/CustomerInquiryAPI";
import SimpleAPI from "../../../api/SimpleAPI";

let inquiry_types = []
export function get_inquiry_types(query, callback){
    if(inquiry_types.length === 0){
        CustomerInquiryAPI.get_inquiry_types()
            .then(data=>{
                if(!data){return}
                inquiry_types = data
                callback(data)
            })
    }else{
        callback(inquiry_types)
    }
}

export function get_api_name(query, callback){
    if(query?.length===0){return}
    SimpleAPI.get_api_name(query)
        .then(data=>{
            if(!data){return}
            callback(data)
        })
}

export function get_sales_name(query, callback){
    if(query?.length===0){return}
    SimpleAPI.get_sales_name({keyword: query})
        .then(data=>{
            if(!data){return}
            callback(data)
        })
}