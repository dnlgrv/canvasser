import { fabric } from "fabric"
import JsBarcode from "jsbarcode"

const Barcode = fabric.util.createClass(fabric.Rect, {
  type: "barcode",

  initialize: function (options) {
    this.callSuper("initialize", options)

    this.set({
      fill: "transparent"
    })
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx)

    JsBarcode(ctx.canvas, "Hello")
  }
})

export default Barcode
