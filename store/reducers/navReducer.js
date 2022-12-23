
const navReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_NAV":
      return action.payload || false
    default:
      return state
  }
}

export default navReducer