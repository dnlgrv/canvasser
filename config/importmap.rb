# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "konva", to: "https://ga.jspm.io/npm:konva@8.3.10/lib/index.js"
pin "jsbarcode", to: "https://ga.jspm.io/npm:jsbarcode@3.11.5/bin/JsBarcode.js"
