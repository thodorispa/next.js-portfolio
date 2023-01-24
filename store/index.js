
import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/userReducer.js'
import panelReducer from './reducers/panelReducer.js'
import projectReducer from './reducers/projectReducer.js'
import navReducer from './reducers/navReducer.js'
import frontPanelReducer from './reducers/frontPanelReducer'
import collabPanelReducer from './reducers/collabPanelReducer'
import viewReducer from './reducers/viewReducer'
import hideNavReducer from './reducers/hideNavReducer'
import modalReducer from './reducers/modalReducer'



export const store = configureStore({
  reducer: {
    user: authReducer,
    panel: panelReducer,
    frontPanel: frontPanelReducer,
    nav: navReducer,
    hideNav: hideNavReducer,
    view: viewReducer,
    modal: modalReducer,
    project: projectReducer,
    collabPanel: collabPanelReducer,
  }
})
