import make_request from "./utils";


export default class ChemicalAPI{
    static async get_moltext_by_cas(cas){
        return make_request(
            `/api/chemical/get_moltext_by_cas/${encodeURIComponent(cas)}`, null,
            {method: 'GET'},
        )
    }
}