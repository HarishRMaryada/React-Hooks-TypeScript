import { AUTH_SET, AUTH_UNSET } from './auth.constants'
import {AuthState} from "./auth.types"
import {ActionType} from "../Store"

const initialSate:AuthState = {  
  id: "",
  token: "",
}

const reducer = function clientReducer (state:AuthState = initialSate, action:ActionType) {  
  switch (action.type) {
    case AUTH_SET:
      return {
        id: action.data.userId,
        token: action.data,
      }

    case AUTH_UNSET:
      return {
        id: null,
        token: null,
      }

    default:
      return state
  }
}

export default reducer 