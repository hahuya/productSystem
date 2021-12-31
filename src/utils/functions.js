

export function price2cost(price){
    const cost = (-(1531.43+258*1.7143-price)+((1531.43+258*1.7143-price)**2-4*1.7143*(-258*price))**0.5)/(2*1.7143)
    return cost.toFixed(0)
}

export function cost2price(cost){
    const price = (1072/(cost+258)+1.2)*cost/0.7
    return price.toFixed(0)
}