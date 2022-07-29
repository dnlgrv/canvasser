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

  generateOutput() {
    this.outputTarget.innerText = JSON.stringify(this.canvas, undefined, 2)
  }
}
