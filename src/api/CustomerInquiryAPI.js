import make_request, {make_base_request} from "./utils";
import store from "../redux/store";
import {popErrorMsg} from "../redux/errorMsg/errMsgSlice";
import download from "downloadjs";
import {endLoading, startLoading} from "../redux/globalLoading/globalLoadingSlice";
const contentDisposition = require('content-disposition')


const essential_fields = [
    'api_name',
    'brand',
    'cat_no',
    'cas',
    'cn_name',
    'en_name',
    'img',
]

function prepare_data({children, ...parent}){
    return {
        ...parent,
        children: children.filter(
            child=> {
                if(!!child.id){return true}
                return essential_fields.filter(field=>{
                    const item = child[field]
                    if(typeof item === 'object'){
                        return false
                    }else{
                        return !!item
                    }
                }).length > 0
            }
        ),
    }
}


export default class CustomerInquiryAPI {
    static async get_list({filters}){
        return make_request('/api/customer_inquiry', filters)
    }
    static async get_data({parent_id}){
        return make_request(`/api/customer_inquiry/${parent_id}`, null, {'method': 'GET'})
    }
    static async get_inquiry_types(){
        return make_request(`/api/customer_inquiry/inquiry_types`, null, {'method': 'GET'})
    }
    static async add_inquiry(inquiry_form){
        const data = prepare_data(inquiry_form)
        return make_request(`/api/customer_inquiry/add`, data)
    }
    static async edit_inquiry(inquiry_form){
        const data = prepare_data(inquiry_form)
        const id = data.id
        return make_request(`/api/customer_inquiry/${id}`, data)
    }
    static async delete_inquiry(id){
        return make_request(`/api/customer_inquiry/${id}`, null, {method: 'DELETE'})
    }
    static async submit_inquiry({id}){
        return make_request(`/api/customer_inquiry/${id}/submit`)
    }
    static async upload_inquiry({file}){
        const form = new FormData()
        form.append('file', file)
        return make_request(`/api/customer_inquiry/upload_inquiry`, null, {
            body: form,
            headers: {
                'Accept': 'application/json',
            },
        })
    }

    static async export_quotation({inquiry_id, template_id}){
        store.dispatch(startLoading())
        try{
            const r = await make_base_request(
                `/api/customer_inquiry/${inquiry_id}/export_quotation/${template_id}`, null,
                {method: 'GET'})
            const filename = contentDisposition.parse(r.headers.get("content-disposition"))?.parameters?.filename
            download(await r.blob(), filename||'报价单.xlsx')
        }catch (e) {
            store.dispatch(popErrorMsg(e.toString()))
        }finally {
            store.dispatch(endLoading())
        }
    }
}
