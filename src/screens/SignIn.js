import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
    Link as LinkPage
  } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textCenterAlignment: {
    textAlign: "center"
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [formDetails, setFormDetails] = useState({});

  const [emailVal, setEmailVal] = useState({
      error: false,
      value: ""
  });
  const [password, setPassword] = useState({
      error: false,
      value: ""
  });

  const handleEmailChange = (e) => {
    const value = e.target.value;

    let errorLabel = '';
    if(!value) {
        errorLabel = 'Email Cannot be empty';
    } else if(typeof value !== "undefined"){
        let lastAtPos = value.lastIndexOf('@');
        let lastDotPos = value.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
            errorLabel = "Email is not valid";
         }
    }
    setEmailVal({
        value,
        error: errorLabel
    });
  };
  const handlePasswordChange = (e) => {
      const value = e.target.value;

      let errorLabel = '';
      if(!value) {
          errorLabel = 'Password Cannot be empty';
      }
      setPassword({
          value,
          error: errorLabel
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormDetails({
        formEmail: emailVal,
        formPassword: password
    });

    //reset
    setEmailVal('');
    setPassword('');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    error = {!emailVal.error ? false : true}
                    autoComplete="email"
                    defaultValue={emailVal.value}
                    onBlur={handleEmailChange}
                  />
              <TextField
                    className="textField-hide"
                    error={!emailVal.error ? false : true}
                    id="email-error-text"
                    defaultValue={emailVal?.value}
                    helperText={emailVal?.error}
                    variant="outlined"
                    />
            </Grid>
              <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      error={!password.error ? false : true}
                      defaultValue={password.value}
                      onBlur={handlePasswordChange}
                    />
                  <TextField
                        className="textField-hide"
                        error={!password.error ? false : true}
                        id="mobile-error-text"
                        defaultValue={password?.value}
                        helperText={password?.error}
                        variant="outlined"
                        />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
          </Grid>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.textCenterAlignment}
              >
                <Grid item xs={12}>
                  <LinkPage to="/movies"> Go to Movies</LinkPage>
                </Grid>
            </Grid>
          <Grid container 
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item>
              <Typography variant="body2">
                {
                    `Don't have an account?`
                }
                <LinkPage to="/">
                  Sign Up
                </LinkPage>
              </Typography>
            </Grid>
            
          </Grid>
        </form>
      </div>
    </Container>
  );
}