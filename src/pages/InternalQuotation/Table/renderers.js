import Handsontable from "handsontable";

function mergeUsernames(hotInstance, td, row, column, prop, value, cellProperties) {
    // Optionally include `BaseRenderer` which is responsible for adding/removing CSS classes to/from the table cells.

    Handsontable.renderers.TextRenderer.apply(this, arguments);
    // ...your custom logic of the renderer
}