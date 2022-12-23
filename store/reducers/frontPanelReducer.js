
const frontPanelReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_FRONT_PANEL":
      return action.payload || false
    default:
      return state

  }
}

export default frontPanelReducer