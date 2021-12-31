import React from 'react';
import ExportBtn from "./ExportBtn";


const FilterExportBtn = (template_type, api, label)=>(props) =>{
    const {formik} = props

    const handleTemplateClick = (e, item)=>{
        api(item.id, formik.values)
    }

    return (
        <React.Fragment>
            <ExportBtn template_type={template_type} onTemplateClick={handleTemplateClick} label={label}/>
        </React.Fragment>
    );
}

export default FilterExportBtn;