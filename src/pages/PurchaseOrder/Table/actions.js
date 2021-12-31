import React from 'react';
import UploadPanel from "../../../components/UploadTask/UploadPanel";
import PurchaseOrderAPI from "../../../api/PurchaseOrderAPI";


POInfoImportBtn.propTypes = {

};

export function POInfoImportBtn(){
    return (
        <UploadPanel
            title={"上传供应商订单信息"}
            label={"导入"}
            api={PurchaseOrderAPI.upload_po_info}
            task_name={'enq_product_page.worker.tasks.upload_customer_inquiry'}
        />
    );
}
