import make_request from "./utils";


export default class ProductAPI {
    static get_product({cat_no}){
        return make_request(`/api/product/${cat_no}`, null, {method: 'GET'})
    }

    static get_products({filters}){
        return make_request('/api/product', filters)
    }

    static async get_product_packages({cat_no}){
        return make_request(`/api/package/${cat_no}`, null, {method: 'GET'})
    }

    static sync_product({cat_no}){
        return make_request(`/api/product/${cat_no}/sync`, null, {method: 'GET'})
    }

    static upsert_product_packages({cat_no, packages}){
        return make_request(`/api/package/${cat_no}/upsert`, {packages: packages}, {})
    }

    static upload_products({file, override_exists}){
        const form = new FormData()
        form.append('file', file)
        form.append('override_exists', override_exists)
        return make_request('/api/product/upload', null, {
            body: form,
            headers: {
                'Accept': 'application/json',
            },
            }
        )
    }

    static edit_product(values){
        return make_request('/api/product/edit', values, {})
    }

    static add_product(values){
        return make_request('/api/product/add', values, {})
    }

    static get_task_logs(){
        return make_request('/api/product/task_log', null, {})
    }

    static async get_simple_catalogs({keyword}){
        if(!keyword||keyword.length<2){return []}
        return make_request('/api/product_catalog/simple', {keyword})
    }

    static async get_products_simple({keyword}){
        if(!keyword||keyword.length<2){return []}
        return make_request('/api/product/simple', {keyword})
    }

    static async get_valid_cat_no({cls_id}){
        if(!cls_id){return ''}
        return make_request(`/api/product_catalog/${cls_id}/valid_cat_no`)
    }

    static async fuzzy_search_product({cat_no, cas, brand, inquiry_type, mol_text}){
        if(!cas && !cat_no){return []}
        return make_request(`/api/product/fuzzy_search`, {cat_no, cas, brand, inquiry_type, mol_text})
    }

    static async get_struct_img({moltext}){
        return make_request(`/api/product/struct2img`, {moltext})
    }

    static async get_supplier_quotation({cat_no, filters}){
        if(!cat_no){return []}
        let filter = filters
        if(!filters){
            filter = {keyword: '', searches: [], per_page: 100, page: 0}
        }
        return make_request(`/api/product/${cat_no}/supplier_quotations`, filter)
    }
}