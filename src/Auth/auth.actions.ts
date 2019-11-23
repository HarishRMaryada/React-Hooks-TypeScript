import { AUTH_SET, AUTH_UNSET } from './auth.constants'


export function setAuth (token:any) {  
  return {
    type: AUTH_SET,
    data: token,
  }
}

export function unsetAuth () {  
  return {
    type: AUTH_UNSET,
  }
}
