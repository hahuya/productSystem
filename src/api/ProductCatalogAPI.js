import make_request from "./utils";


export default class ProductCatalogAPI{
    static get_list({filters}){
        return make_request('/api/product_catalog', filters)
    }

    static get({id}){
        return make_request(`/api/product_catalog/${id}`, {}, {method: 'GET'})
    }

    static add(data){
        return make_request(`/api/product_catalog/add`, data)
    }

    static edit({id, ...data}){
        return make_request(`/api/product_catalog/${id}/edit`, data)
    }
}