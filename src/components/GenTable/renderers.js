import Handsontable from "handsontable";
const moment = require("moment");


export function ImageRenderer(instance, td, row, col, prop, value, cellProperties){
    const stringifiedValue = Handsontable.helper.stringify(value);
    const rowHeight = instance._getRowHeightFromSettings(1) || 140
    let img;

    if (!!stringifiedValue) {
        let div = document.createElement('div')
        img = document.createElement('IMG');
        img.src = value;
        img.alt = 'N/A';
        img.style.maxHeight = `${rowHeight}px`;
        img.style.maxWidth = `100%`;

        Handsontable.dom.addEvent(img, 'mousedown', function (e){
            e.preventDefault(); // prevent selection quirk
        });
        Handsontable.dom.empty(td);
        div.appendChild(img);
        td.appendChild(div);
    } else {
        // render as text
        Handsontable.renderers.TextRenderer.apply(this, arguments);
    }
}

export const SimpDateTimeRenderer = (instance, td, row, col, prop, value)=>{
    const d = moment(value).format(Handsontable.dateFormat)
    td.appendChild(d)
}

export const EllipsisTextRenderer = (instance, td, row, col, prop, value, cellProperties)=>{
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties])
    td.classList.add("htEllipsisText")
    td.setAttribute('title', value)
}