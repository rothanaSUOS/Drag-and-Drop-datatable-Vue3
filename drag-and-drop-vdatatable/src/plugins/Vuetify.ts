import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const LightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: '#0168AD',
    secondary: '#24AFF8',
    error: '#E1232E',
    info: '#0A84FF',
    success: '#4CAF50',
    warning: '#f29407',
    lightGrey: '#F5F5F5',
    lightError: '#FF5252'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'LightTheme',
    themes: {
      LightTheme,
    }
  }
})
