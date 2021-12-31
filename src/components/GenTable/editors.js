import Handsontable from "handsontable";

const {BaseEditor} = Handsontable.editors


export class ImageEditor extends BaseEditor{
    init() {
        this.IMAGEEDITOR_PARENT = this.hot.rootDocument.createElement('div');

        this.IMAGE = this.hot.rootDocument.createElement('img');
        this.IMAGEEDITOR_PARENT.appendChild(this.IMAGE)

        Handsontable.dom.addClass(this.IMAGEEDITOR_PARENT, 'htImageEditor');
        this.IMAGEEDITOR_PARENT.style.display = 'none';
        this.hot.rootElement.appendChild(this.IMAGEEDITOR_PARENT);
    }

    pasteListener(e){
        e.stopPropagation()
        e.preventDefault()
        const cd = e.clipboardData
        const file = cd.files[0]
        if(typeof file === "undefined"){return}
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => this.setValue(reader.result)
    }

    open(e){
        document.addEventListener('paste', this.pasteListener)

        this.refreshDimensions()
        this.IMAGEEDITOR_PARENT.style.display = "block"
        this._opened = true
    }

    getValue(){
        return this.IMAGE.src
    }

    setValue(value) {
        if(!!value){
            this.IMAGE.src = value
        }
    }

    close(){
        document.removeEventListener('paste', this.pasteListener)
        this.IMAGE.removeAttribute('src')
        this._opened = false
        this.IMAGEEDITOR_PARENT.style.display = "none"
    }

    focus() {
        this.IMAGE.focus();
    }

    refreshDimensions() {
        this.TD = this.getEditedCell();

        // TD is outside of the viewport.
        if (!this.TD) {
            this.close();
            return;
        }
        const { wtOverlays } = this.hot.view.wt;
        const currentOffset = Handsontable.dom.offset(this.TD);
        const containerOffset = Handsontable.dom.offset(this.hot.rootElement);
        const scrollableContainer = wtOverlays.scrollableElement;
        const editorSection = this.checkEditorSection();
        let width = Handsontable.dom.outerWidth(this.TD) + 1;
        let height = Handsontable.dom.outerHeight(this.TD) + 1;
        let editTop = currentOffset.top - containerOffset.top - 1 - (scrollableContainer.scrollTop || 0);
        let editLeft = currentOffset.left - containerOffset.left - 1 - (scrollableContainer.scrollLeft || 0);
        let cssTransformOffset;

        switch (editorSection) {
            case 'top':
                cssTransformOffset = Handsontable.dom.getCssTransform(wtOverlays.topOverlay.clone.wtTable.holder.parentNode);
                break;
            case 'left':
                cssTransformOffset = Handsontable.dom.getCssTransform(wtOverlays.leftOverlay.clone.wtTable.holder.parentNode);
                break;
            case 'top-left-corner':
                cssTransformOffset = Handsontable.dom.getCssTransform(wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode);
                break;
            case 'bottom-left-corner':
                cssTransformOffset = Handsontable.dom.getCssTransform(wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
                break;
            case 'bottom':
                cssTransformOffset = Handsontable.dom.getCssTransform(wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode);
                break;
            default:
                break;
        }

        if (this.hot.getSelectedLast()[0] === 0) {
            editTop += 1;
        }
        if (this.hot.getSelectedLast()[1] === 0) {
            editLeft += 1;
        }

        const selectStyle = this.IMAGEEDITOR_PARENT.style;

        if (cssTransformOffset && cssTransformOffset !== -1) {
            selectStyle[cssTransformOffset[0]] = cssTransformOffset[1];
        } else {
            Handsontable.dom.resetCssTransform(this.IMAGEEDITOR_PARENT);
        }

        const cellComputedStyle = Handsontable.dom.getComputedStyle(this.TD, this.hot.rootWindow);

        if (parseInt(cellComputedStyle.borderTopWidth, 10) > 0) {
            height -= 1;
        }
        if (parseInt(cellComputedStyle.borderLeftWidth, 10) > 0) {
            width -= 1;
        }

        selectStyle.height = `${height}px`;
        selectStyle.minWidth = `${width}px`;
        selectStyle.top = `${editTop}px`;
        selectStyle.left = `${editLeft}px`;
        selectStyle.margin = '0px';
    }
}
