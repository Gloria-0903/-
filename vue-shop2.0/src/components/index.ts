import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin = {
  install (app:any) {
    app.component('XtxImageView', ImageView)
    app.component('XtxNewSku', Sku)
  }
}