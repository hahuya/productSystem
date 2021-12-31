import Handsontable from "handsontable";
import {white, blue, green, red, yellow, purple} from '../styles'


export function CatNoFieldRenderer(instance, td, row, col, prop, value, cellProperties){
    const rowData = instance.getSourceDataAtRow(row)
    if(rowData?.__candidate?.length>1){
        Handsontable.dom.addClass(td, 'htMultiCandidate');
    }else{
        Handsontable.dom.removeClass(td, 'htMultiCandidate')
    }
    Handsontable.renderers.TextRenderer.apply(this, arguments)
}

export function PackageFieldRenderer(instance, td, row, col, prop, value, cellProperties){
    const rowData = instance.getSourceDataAtRow(row)
    const product_candidate = rowData?.__candidate
    const cat_no = rowData.cat_no
    if(!cat_no || !product_candidate){
        Handsontable.renderers.TextRenderer.apply(this, arguments)
        return
    }
    const product = product_candidate.find(item => item.cat_no===cat_no)
    if(product?.packages?.length>1){
        Handsontable.dom.addClass(td, 'htMultiCandidate');
    }else{
        Handsontable.dom.removeClass(td, 'htMultiCandidate')
    }
    Handsontable.renderers.TextRenderer.apply(this, arguments)
}


export function IDColorRenderer(instance, td, row, col, prop, value, cellProperties){
    Handsontable.renderers.TextRenderer.apply(this, arguments)
    //TODO tr should do more
    const tr = td.parentNode
    if(!tr){return}
    const rowData = instance.getSourceDataAtRow(row)
    let color = white
    if(rowData.direct_offer){
        color = green
    }else if(!!rowData?.inter_quo?.status==='已报价' && rowData?.package !==rowData.inter_quo?.package){
        color = purple
    }else if(rowData?.inter_quo?.status==='已报价'){
        color = blue
    }else if (rowData?.inter_quo?.status==='已退单'){
        color = red
    }else if(!rowData.direct_offer && !!rowData?.id && !rowData?.inter_quo){
        color = yellow
    }
    tr.style.background = color
}