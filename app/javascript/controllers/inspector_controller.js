import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["inputs", "layoutX", "layoutY", "text"]

  connect() {
    this.hide()
  }

  hide() {
    this.inputsTarget.style.display = "none"
  }

  show() {
    this.inputsTarget.style.display = "block"
  }

  update(event) {
    const { attrs } = event.detail.target

    this.layoutXTarget.value = attrs.x
    this.layoutYTarget.value = attrs.y

    this.textTarget.value = attrs.text
  }
}
