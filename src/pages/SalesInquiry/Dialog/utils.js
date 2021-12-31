export function get_inquiry_type(brand, cat_no){
    if(brand !== 'cato'){return ''}
    if(cat_no?.startsWith('C4X') || cat_no?.startsWith('C3D')){
        return '药物类产品'
    }else{
        return '非药物类产品'
    }
}