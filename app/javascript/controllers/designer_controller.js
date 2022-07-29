import { Controller } from "@hotwired/stimulus"
import { fabric } from "fabric"

export default class extends Controller {
  static targets = ["canvas", "output"]

  connect() {
    this.canvas = new fabric.Canvas(this.canvasTarget, {
      backgroundColor: "white"
    })

    this.canvas.on("object:moving", (event) => {
      this.dispatch("objectUpdated", { detail: { event } })
    })

    this.canvas.on("object:modified", (event) => {
      this.dispatch("objectUpdated", { detail: { event } })
    })

    this.canvas.on("selection:created", (event) => {
      this.dispatch("objectSelected", { detail: { event } })
    })

    this.canvas.on("selection:updated", (event) => {
      this.dispatch("objectSelected", { detail: { event } })
    })

    this.canvas.on("selection:cleared", () => {
      this.dispatch("selectionCleared", {})
    })

    this.canvas.setDimensions({
      height: "100%",
      width: "100%",
    }, { cssOnly: true })
  }

  addTextBlock() {
    const text = new fabric.Textbox("Double-click to edit me...", {
      fontSize: 14,
      left: 20,
      top: 20,
      width: 120
    })

    this.canvas.add(text)
  }

  addShapeBlock() {
    const shape = new fabric.Rect({
      fill: "green",
      height: 30,
      left: 20,
      top: 20,
      width: 30,
    })

    this.canvas.add(shape)
  }

  generateOutput() {
    this.outputTarget.innerText = JSON.stringify(this.canvas, undefined, 2)
  }

  removeObject() {
    const selectedObject = this.canvas.getActiveObject()
    this.canvas.remove(selectedObject)
  }

  changeShapeType(event) {
    const selectedObject = this.canvas.getActiveObject()
    const newShapeType = event.target.value

    if (newShapeType == "circle") {
      const shape = new fabric.Circle({
        fill: selectedObject.fill,
        left: selectedObject.left,
        radius: selectedObject.width / 2,
        top: selectedObject.top
      })

      this.canvas.remove(selectedObject)

      this.canvas.add(shape)
      this.canvas.setActiveObject(shape)
    } else if (newShapeType == "rect") {
      const shape = new fabric.Rect({
        fill: selectedObject.fill,
        height: selectedObject.height,
        left: selectedObject.left,
        width: selectedObject.width,
        top: selectedObject.top
      })

      this.canvas.remove(selectedObject)

      this.canvas.add(shape)
      this.canvas.setActiveObject(shape)
    }
  }

  changeBackgroundColor(event) {
    this.canvas.getActiveObject().set("fill", event.target.value)
    this.canvas.renderAll()
  }
}
