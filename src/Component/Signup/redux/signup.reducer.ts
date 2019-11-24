import { SIGNUP_REQUESTING } from "./signup.constants";
import { SignUpState, SignUpReducerAction } from "./signup.types";

const initialState: SignUpState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
};

const reducer = (
    state: SignUpState = initialState,
    action: SignUpReducerAction
) => {
    switch (action.type) {
        case SIGNUP_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: "Signing up...", time: new Date() }],
                errors: []
            };

        default:
            return state;
    }
};

export default reducer;
