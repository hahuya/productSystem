import Handsontable from "handsontable";
import {cost2price, price2cost} from "../../utils/functions";

const {NumericEditor} = Handsontable.editors


export class PriceEditor extends NumericEditor{
    finishEditing(restoreOriginalValue, ctrlDown, callback){
        super.finishEditing(restoreOriginalValue, ctrlDown, callback)
        const value = parseFloat(this.getValue())
        if (isNaN(value)){
            // const cost = parseFloat(this.instance.getSourceDataAtRow(this.row)?.cost)
            // const price = cost2price(cost)
            // this.instance.setSourceDataAtCell(this.row, 'price', price)
            return
        }
        if(!this.instance.getSourceDataAtRow(this.row)?.cost){
            const cost = price2cost(value)
            this.instance.setSourceDataAtCell(this.row, 'cost', cost)
        }
    }
}


export class CostEditor extends NumericEditor{
    finishEditing(restoreOriginalValue, ctrlDown, callback){
        super.finishEditing(restoreOriginalValue, ctrlDown, callback)
        const value = parseFloat(this.getValue())
        if (isNaN(value)){
            // const price = parseFloat(this.instance.getSourceDataAtRow(this.row)?.price)
            // const cost = price2cost(price)
            // this.instance.setSourceDataAtCell(this.row, 'cost', cost)
            return
        }
        if(!this.instance.getSourceDataAtRow(this.row)?.price) {
            const price = cost2price(value)
            this.instance.setSourceDataAtCell(this.row, 'price', price)
        }
    }
}
