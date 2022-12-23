const collabPanelReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_COLLAB_PANEL":
      return action.payload || false
    default:
      return state

  }
}

export default collabPanelReducer