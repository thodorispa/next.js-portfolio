const projectReducer = (state =
  {
    id: -1,
    title: '',
    subTitle: '',
    description: '',
    images: [],
    active: true
  }, action) => {

  switch (action.type) {
    case "SET_PROJECT":
      return action.payload || false
    default:
      return state

  }
}

export default projectReducer