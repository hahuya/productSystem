import PropTypes from 'prop-types';


function afterOfferPriceChanged(hot, change){
    const [row, , , offerPrice] = change
    const rowData = hot.getSourceDataAtRow(row)
    const price = parseFloat(rowData?.quotation?.price)
    if(!!price && offerPrice){
        const discount = offerPrice / price
        const quantity = rowData?.quantity
        hot.setSourceDataAtCell(row, 'quotation.discount', discount.toFixed(4))
        hot.setSourceDataAtCell(row, 'quotation.offer_price_sum', (offerPrice * quantity).toFixed(2))
    }
}

function afterDiscountChanged(hot, change){
    const [row, , , discount] = change
    const rowData = hot.getSourceDataAtRow(row)
    const price = parseFloat(rowData?.quotation?.price)
    if(!!price && discount){
        const quantity = rowData?.quantity
        const offerPrice = discount * price
        hot.setSourceDataAtCell(row, 'quotation.offer_price', offerPrice.toFixed(2))
        hot.setSourceDataAtCell(row, 'quotation.offer_price_sum', (offerPrice * quantity).toFixed(2))
    }
}

function afterQuantityChanged(hot, change){
    const [row, , , quantity] = change
    const rowData = hot.getSourceDataAtRow(row)
    const offer_price = parseFloat(rowData?.quotation?.offer_price)
    hot.setSourceDataAtCell(row, 'quotation.quantity', quantity)
    hot.setSourceDataAtCell(row, 'quotation.offer_price_sum', (offer_price * quantity).toFixed(0))
}

function afterOfferPriceSumChanged(hot, change){
    const [row, , , offerPriceSum] = change
    const rowData = hot.getSourceDataAtRow(row)
    const quantity = parseFloat(rowData?.quantity)
    const price = parseFloat(rowData?.quotation?.price)
    const offerPrice = offerPriceSum / quantity
    hot.setSourceDataAtCell(row, 'quotation.offer_price', offerPrice.toFixed(2))
    hot.setSourceDataAtCell(row, 'quotation.discount', (offerPrice / price).toFixed(4))
}

function afterImageChanged(hot, change){
    const [row, , , img] = change
    if(!img){
        hot.setSourceDataAtCell(row, 'moltext', null)
    }
}


const field_action = {
    'img': afterImageChanged,
    'quantity': afterQuantityChanged,
    'quotation.offer_price': afterOfferPriceChanged,
    'quotation.offer_price_sum': afterOfferPriceSumChanged,
    'quotation.discount': afterDiscountChanged,
    }


afterChangesHandler.propTypes = {
    changes: PropTypes.array,
    hot: PropTypes.object
};


export function afterChangesHandler(hotRef, changes){
    const hot = hotRef.current?.hotInstance
    if(!hot){return}
    changes.forEach(change => {
        if(!field_action.hasOwnProperty(change[1])){return}
        field_action[change[1]](hot, change)
    })
}
