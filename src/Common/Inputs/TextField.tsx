import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

type PropsInput = {
    input:string,
    meta:{
        touched:boolean,
        invalid:boolean,
        error:any
    }
}
type Props = TextFieldProps & PropsInput;

//React.ComponentType<Props>
const TextInput: any = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}:any) => (
        <TextField
            id="email"
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );

export default TextInput;
