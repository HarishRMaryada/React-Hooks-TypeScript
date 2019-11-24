import {SignUpState} from "../Component/Signup/redux/signup.types"
export interface ActionType{
    type:string,
    data:any
}

export interface AppState{
    signup:SignUpState
}