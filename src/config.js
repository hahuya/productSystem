let url_prefix
if(process.env.NODE_ENV==='development'){
    url_prefix = 'http://192.168.5.246:8500'
}else{
    url_prefix = ''
}

const config = {
    url_prefix: url_prefix,
    DATE_FORMAT: 'yyyy-mm-dd',

    storage_conditions: [
        '2℃ ~ 8℃',
        'Room Temp.',
        '-20±5℃',
        '-80±5°C',
    ],

    delivery_options: [
        '现货',
        '3天',
        '1-2周',
        '2-3周',
        '3-4周',
        '4-6周',
        '7-8周',
        '8-10周',
        '10-12周',
        '10-14周',
    ],

    purity_options: [
        '>90%',
        '>95%',
    ],

    currency_options: [
        "RMB",
        "USD",
    ],

    // Unused
    mass_unit: [
        '年',
        '月',
        '日',
    ],

    quotation_status: [
        '跟进中-客户调研',
        '跟进中-客户确认需求中',
        '跟进中-客户询比价中',
        '系统完结',
        '已成单',
        '已完结-不报价',
        '已完结-不需要',
        '已完结-已成单',
        '已完结-已丢单',
        '已完结-已关闭',
    ],

    extra_tests: [
        {test: '简易合成路线', qty: 0, cost: 0},
        {test: '图谱解析', qty: 0, cost: 3000},
        {test: '含量数据(TGA)', qty: 5, cost: 200},
        {test: '含量数据(炽灼残渣)', qty: 1000, cost: 500},
        {test: '13CNMR', qty: 10, cost: 100},
        {test: '1H-1H-COSY', qty: 10, cost: 500},
        {test: '1H-1H- NOESY', qty: 10, cost: 500},
        {test: 'HSQC', qty: 10, cost: 500},
        {test: 'HMQC', qty: 10, cost: 500},
        {test: 'HMBC', qty: 10, cost: 500},
        {test: 'qNMR', qty: 5, cost: 500},
        {test: 'IR', qty: 5, cost: 60},
        {test: 'Karl Fischer', qty: 250, cost: 500},
        {test: 'UV', qty: 5, cost: 80},
        {test: '旋光度', qty: 50, cost: 40},
        {test: '1HNMR', qty: 2, cost: 70},
        {test: 'GCMS', qty: 2, cost: 72},
        {test: 'HPLC指定方法', qty: 2, cost: 300},
        {test: 'LCMS', qty: 2, cost: 100},
    ],

    status_options: [
        '已报价',
        '已退单',
        '未处理',
        '已处理',
        '已处理未报价',
    ]
};
export default config;