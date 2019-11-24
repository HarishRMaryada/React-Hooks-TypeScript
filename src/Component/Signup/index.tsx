import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

//material ui input redux-form
import TextInput from "../../Common/Inputs/TextField";

//types
import { Signup, SignUpState } from "./redux/signup.types";
import { AppState } from "../../Store/types";

//actions
import * as SignUpActions from "./redux/signup.actions";

type Props = {
  signup: SignUpState;
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp: React.FC<Props & InjectedFormProps> = (
  props: Props & InjectedFormProps
) => {
  const classes = useStyles();

  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    signup: { requesting, successful, messages, errors }
  } = props;

  const signupSubmit = (values: any) => {};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(signupSubmit)}>
          <Field
            id="email"
            name="email"
            component={TextInput}
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            autoFocus
          />
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            component={TextInput}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  signup: state.signup
});

const mapDispatchToProps = (dispatch: object) => {
  return { signupRequest: SignUpActions.signupRequest };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "SignUpForm"
  })(Signup)
);


//https://stackoverflow.com/questions/46078452/typing-redux-forms-v7-with-typescript-and-react