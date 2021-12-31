import make_request from "./utils";


export default class PurchaseOrderAPI{
    static async get_list({filters}){
        return make_request('/api/purchase_order/', filters)
    }

    static async upload_po_info({file}){
        const form = new FormData()
        form.append('file', file)
        return make_request(`/api/purchase_order/upload_info`, null, {
            body: form,
            headers: {
                'Accept': 'application/json',
            },
        })
    }
}