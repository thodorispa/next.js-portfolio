import { useEffect } from "react";
import { useDispatch } from "react-redux"


const Init = ({ user, nav, view, modal, hideNav}) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    user && dispatch({ type: "SET_USER", payload: user })
  }, [user])
  useEffect(() => {
    nav && dispatch({ type: "SET_NAV", payload: nav })
  }, [nav])
  useEffect(() => {
    view && dispatch({ type: "SET_VIEW", payload: view })
  }, [view])
  useEffect(() => {
    modal && dispatch({ type: "TOGGLE_MODAL", payload: modal })
  }, [modal])
  useEffect(() => {
    hideNav && dispatch({ type: "HIDE_NAV", payload: hideNav })
  }, [hideNav])

  return (
    null
  );
}


export default Init;
