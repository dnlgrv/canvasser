import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["layout", "layoutX", "layoutY"]

  connect() {
    this.hide()
  }

  show(event) {
    this.layoutTarget.style.display = ""
    this.update(event)
  }

  hide() {
    this.layoutTarget.style.display = "none"
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
  }
}
