import {CASField, CatalogField, CatNoField, ClsCode, StorageCondition} from "./fieldTypes";
import {CheckboxField} from "../../components/base/inputFields";
import {PurityField} from "../InternalQuotation/Dialog/fieldTypes";

const fields = [
    {data:'catalog', label:'产品分类', type:'text', component:CatalogField},
    {data:'cat_no', label:'货号', type:'text', component:CatNoField},
    {data:"en_name", label:"英文名", type:'text', },
    {data:"cn_name", label:"中文名", type:'text', },
    {data:"cas", label:"Cas", type:'text', component: CASField},
    {data:"mf", label:"分子式", type:'text', width:6},
    {data:"mw", label:"分子量", type:'text', width:6},
    {data:"remark", label:"备注", type:'text', },
    {data:"storage", label:"储存温度", type:'text', width:6, component:StorageCondition},
    {data:"purity", label:"纯度", type:'text', width:3, component: PurityField},
    {data:"brand", label:"品牌", type:'text', width:3},
    {data:"mass_day", label:"有效期", type:'number', width:3},
    {data:"mass_unit", label:"有效期单位", type:'text', width:3},
    {data:'cls_code', label:'存货大类', type:'text', width:3, component:ClsCode},
    {data:'handler', label:'负责人', type:'text', width:3},
    {data:'appearance', label:'性状', type:'text', width:12},
    {data:'confirmed', label:'信息是否确认', width:6, component: CheckboxField},
]

export default fields

export const hidden_fields = [
    {data:'cn_synonym', label:'中文别名', type:'text', width:12},
    {data:'en_synonym', label:'英文别名', type:'text', width:12},
    {data:'solubility', label:'溶解度', type:'text', width:6},
    {data:'danger_desc', label:'危险品标识', type:'text', width:6},

    {data:'ghs_icon01', label:'GHS图标1', type:'text', width:4},
    {data:'ghs_icon02', label:'GHS图标2', type:'text', width:4},
    {data:'ghs_icon03', label:'GHS图标3', type:'text', width:4},

    {data:'website_catalog', label:'网站分类', type:'text', width:4},
    {data:'website_available', label:'网站显示', type:'text', width:4},
    {data:'website_packages', label:'网站规格', type:'text', width:4},

    {data:'related_article', label:'相关法规', type:'text', width:12},
    {data:'tax_name', label:'开票名称', type:'text', width:12},
    {data:'smiles', label:'SMILES', type:'text', width:12},
]
