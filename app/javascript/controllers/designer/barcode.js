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

fabric.Barcode = Barcode
fabric.Barcode.fromObject = function (object, callback) {
  return fabric.Object._fromObject("Barcode", object, callback)
}

export default Barcode
