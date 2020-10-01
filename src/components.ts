import { App } from 'vue'

import DefaultLayout from '@/layout/DefaultLayout.vue'
import ExPageHeader from '@/components/ExPageHeader.vue'
import ExAlert from '@/components/ExAlert.vue'
import ExButton from '@/components/ExButton.vue'
import ExSmallButton from '@/components/ExSmallButton.vue'
import ExLoadingModal from '@/components/ExLoadingModal.vue'

export const loadComponents = (app: App) => {
  app.component('DefaultLayout', DefaultLayout)
  app.component('ExPageHeader', ExPageHeader)
  app.component('ExAlert', ExAlert)
  app.component('ExButton', ExButton)
  app.component('ExSmallButton', ExSmallButton)
  app.component('ExLoadingModal', ExLoadingModal)
}
