import { Controller } from "@hotwired/stimulus"
import Konva from "konva"

export default class extends Controller {
  static targets = ["container", "output"]

  connect() {
    this.stage = new Konva.Stage({
      container: this.containerTarget,
      width: 480,
      height: 320
    })

    const uiLayer = new Konva.Layer()
    this.stage.add(uiLayer)

    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: "white",
      listening: false
    })
    uiLayer.add(background)

    this.layer = new Konva.Layer()
    this.stage.add(this.layer)

    this._addTransformer()

    this.stage.on("click tap", (event) => {
      if (event.target === this.stage) {
        this._unselect()
        return
      }

      this._select(event.target)
    })
  }

  addTextBlock() {
    const text = new Konva.Text({
      text: "Click to edit me...",
      x: 20,
      y: 20,
      width: 200,
      height: 40
    })

    text.on("transform", () => {
      text.setAttrs({
        width: text.width() * text.scaleX(),
        scaleX: 1,
      });
    })

    this.layer.add(text)
    this._select(text)
  }

  _select(node) {
    this.dispatch("objectSelected", { detail: { target: node } })
    node.setDraggable(true)
    this.transformer.nodes([node])

    this._update(node)
  }

  _unselect() {
    this.dispatch("objectUnselected")

    if (this.transformer.nodes().length == 1) {
      this.transformer.nodes()[0].setDraggable(false)
    }

    this.transformer.nodes([])
  }

  _update(node) {
    this.dispatch("objectUpdated", { detail: { target: node } })
  }

  updateText(event) {
    const textNode = this.transformer.nodes()[0]
    textNode.setAttrs({ text: event.target.value })
    this._update(textNode)
  }

  load() {
    const json = window.prompt("Paste your serlaized output.")

    this.layer.destroy()
    this.layer = Konva.Node.create(json)
    this.layer.find(".transformer")[0].destroy()
    this._addTransformer()
    this.stage.add(this.layer)
  }

  generateOutput() {
    this.outputTarget.innerText = JSON.stringify(this.layer.toObject(), undefined, 2)
  }

  _addTransformer() {
    this.transformer = new Konva.Transformer({
      enabledAnchors: ["middle-left", "middle-right"],
      boundBoxFunc: function (oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width)
        return newBox
      }
    })
    this.transformer.addName("transformer")
    this.layer.add(this.transformer)

    this.transformer.on("dragmove transform", (event) => {
      this._update(this.transformer.nodes()[0])
    })
  }
}
