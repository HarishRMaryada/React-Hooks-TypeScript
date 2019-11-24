export interface Signup {
  email: string;
  password: string;
}

export interface SignUpRequestAction {
  type: string;
  data: Signup;
}

export interface SignUpState{
    requesting: boolean,
    successful: boolean,
    messages: Array<any>,
    errors: Array<any>,
}

export interface SignUpReducerAction {
    type: string;
    data: any;
  }