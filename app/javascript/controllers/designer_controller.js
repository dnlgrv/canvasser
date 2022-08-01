import { Controller } from "@hotwired/stimulus"
import Konva from "konva"

// Connects to data-controller="designer"
export default class extends Controller {
  static targets = ["container"]

  connect() {
    const stage = new Konva.Stage({
      container: this.containerTarget,
      width: 480,
      height: 320
    })

    const uiLayer = new Konva.Layer()
    stage.add(uiLayer)

    const background = new Konva.Rect({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height(),
      fill: "white",
      listening: false
    })
    uiLayer.add(background)

    this.layer = new Konva.Layer()
    stage.add(this.layer)

    this.transformer = new Konva.Transformer({
      enabledAnchors: ["middle-left", "middle-right"],
      boundBoxFunc: function (oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width)
        return newBox
      }
    })
    this.layer.add(this.transformer)

    this.transformer.on("dragmove transform", (event) => {
      this._update(this.transformer.nodes()[0])
    })

    stage.on("click tap", (event) => {
      if (event.target === stage) {
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
}
