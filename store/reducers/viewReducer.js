
const viewReducer = (state = true, action) => {
  switch (action.type) {
    case "SET_VIEW":
      return action.payload || false
    default:
      return state
  }
}

export default viewReducer