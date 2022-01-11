const routerConfig = {
    '/supplier':{
        'name':'供应商列表',//模块表头名
        'key':'/supplier',//路由标签
        'keepAliveName':'SupplierNode'//keepalive节点
    },
    '/supplier_quotation':{
        'name':'供应商报价列表',//模块表头名
        'key':'/supplier_quotation',//路由标签
        'keepAliveName':'SupplierQuotationNode'//keepalive节点
    },
    '/purchase_order':{
        'name':'采购订单列表',//模块表头名
        'key':'/purchase_order',//路由标签
        'keepAliveName':'PurchaseOrderNode'//keepalive节点
    },
    '/inter_quotation':{
        'name':'询价列表',//模块表头名
        'key':'/inter_quotation',//路由标签
        'keepAliveName':'InterQuotationNode'//keepalive节点
    },
    '/customer_inquiry':{
        'name':'客户询价列表',//模块表头名
        'key':'/customer_inquiry',//路由标签
        'keepAliveName':'CustomerInquiryNode'//keepalive节点
    },
    '/customer_quotation_history':{
        'name':'客户历史询价列表',//模块表头名
        'key':'/customer_quotation_history',//路由标签
        'keepAliveName':'CustomerQuotationHistoryNode'//keepalive节点
    },
    '/product':{
        'name':'产品列表',//模块表头名
        'key':'/product',//路由标签
        'keepAliveName':'ProductNode'//keepalive节点
    },
    '/product_catalog':{
        'name':'产品分类列表',//模块表头名
        'key':'/product_catalog',//路由标签
        'keepAliveName':'ProductCatalogNode'//keepalive节点
    },
}

export default routerConfig;