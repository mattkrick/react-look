import React from 'react'
import { render } from 'react-dom'
import { StyleSheet, LookRoot, Presets, Plugins } from '../modules'

import App from './app.jsx'

const config = Presets['react-dom']
config.styleElementId = '_look'

render(
  <LookRoot config={config}>
    <App />
  </LookRoot>,
  document.getElementById('app'))
