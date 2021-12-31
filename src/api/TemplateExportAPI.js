import make_request from "./utils";


export default class TemplateExportAPI{
    static async get_list(template_type){
        return make_request(`/api/template_export/templates/${template_type}`)
    }
}