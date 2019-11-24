import { SIGNUP_REQUESTING } from "./signup.constants";
import { Signup,SignUpRequestAction } from "./signup.types";

export const signupRequest:(data:Signup)=>SignUpRequestAction = (data: Signup) => {
  return {
    type: SIGNUP_REQUESTING,
    data: data
  };
};

