import make_request, {make_base_request} from "./utils";
import download from "downloadjs";
const contentDisposition = require('content-disposition')


export default class InternalQuotationAPI{
    static async get_list({filters}){
        return make_request('/api/inter_quotation', filters)
    }

    static async get_data({id}){
        if(!id){return []}
        return make_request('/api/inter_quotation/'+id, {}, {'method': 'GET'})
    }

    static async edit_data(data){
        if(!data.id){return {}}
        return make_request(`/api/inter_quotation/${data.id}/edit`, data, {})
    }

    static async submit(data){
        if(!data.id){return {}}
        return make_request(`/api/inter_quotation/${data.id}/submit`, data, {})
    }

    static async save_n_submit(data){
        if(!data.id){return {}}
        return make_request(`/api/inter_quotation/${data.id}/save_n_submit`, data)
    }

    static async get_related_supplier_quotations({id, cat_no}){
        if(!id){return []}
        return make_request(`/api/inter_quotation/${id}/supplier_quotations/`, {cat_no: cat_no})
    }

    static async upsert_related_supplier_quotations({id, data, cat_no}){
        if(!id){return []}
        return make_request(
            `/api/inter_quotation/${id}/supplier_quotations/upsert`, {supp_quotations: data, cat_no:cat_no})
    }

    static async revoke_related_supplier_quotation({inq_id, supp_quo_id, cat_no}){
        if(!inq_id || !supp_quo_id){return []}
        return make_request(
            `/api/inter_quotation/${inq_id}/supplier_quotations/${supp_quo_id}/revoke`, {cat_no: cat_no})
    }

    static async alter(data){
        if(!data.id){return {}}
        return make_request(`/api/inter_quotation/${data.id}/alter`, data)
    }

    static reject(data){
        return make_request(`/api/inter_quotation/${data.id}/reject`, data)
    }

    static async export_list(template_id, filter){
        if(!filter.keyword && filter.searches.length <= 1){
            // TODO
            throw new Error("Too less filters")
        }
        const r = await make_base_request(`/api/inter_quotation/export_list/${template_id}`, filter)
        const filename = contentDisposition.parse(r.headers.get("content-disposition"))?.parameters?.filename
        download(await r.blob(), filename||'询价列表.xlsx')
    }
}