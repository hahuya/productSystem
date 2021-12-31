import React from 'react';
import UploadPanel from "../../../../components/UploadTask/UploadPanel";
import CustomerInquiryAPI from "../../../../api/CustomerInquiryAPI";

InquiryImportBtn.propTypes = {

};

function InquiryImportBtn(){
    return (
        <UploadPanel
            title={"上传询价"}
            label={"导入"}
            api={CustomerInquiryAPI.upload_inquiry}
            task_name={'enq_product_page.worker.tasks.upload_customer_inquiry'}
        />
    );
}

export default InquiryImportBtn;