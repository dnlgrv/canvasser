import { Controller } from "@hotwired/stimulus"

const isShape = (object) => {
  return object.type == "rect" || object.type == "circle"
}

export default class extends Controller {
  static targets = ["actions", "layout", "layoutX", "layoutY", "shape", "shapeType", "backgroundColor"]

  connect() {
    this.hide()
  }

  show(event) {
    this.actionsTarget.style.display = ""
    this.layoutTarget.style.display = ""

    this.update(event)
  }

  hide() {
    this.actionsTarget.style.display = "none"
    this.layoutTarget.style.display = "none"
    this.shapeTarget.style.display = "none"
  }

  update(event) {
    if (event.detail.event.selected && event.detail.event.selected.length == 1) {
      const selectedObject = event.detail.event.selected[0]
      this._updateValues(selectedObject)
    } else if (event.detail.event.target) {
      const selectedObject = event.detail.event.target
      this._updateValues(selectedObject)
    }
  }

  _updateValues(object) {
    this.layoutXTarget.value = object.left
    this.layoutYTarget.value = object.top

    if (isShape(object)) {
      this.shapeTarget.style.display = ""
      this._updateShapeValues(object)
    } else {
      this.shapeTarget.style.display = "none"
    }
  }

  _updateShapeValues(object) {
    this.backgroundColorTarget.value = object.fill
    this.shapeTypeTarget.value = object.type
  }
}
