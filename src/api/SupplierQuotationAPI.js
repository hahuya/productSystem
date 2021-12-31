import make_request from "./utils";

export default class SupplierQuotationAPI{
    static async get_list({filters}){
        return make_request('/api/supplier_quotation', filters)
    }

    static async bulk_upsert(items){
        return make_request('/api/supplier_quotation/bulk_upsert', items)
    }

    static async revoke(id){
        return make_request(`/api/supplier_quotation/${id}/revoke`)
    }
}