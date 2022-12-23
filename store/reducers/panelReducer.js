const panelReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_PANEL":
      return action.payload || false
    default:
      return state
  }
}

export default panelReducer