import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

import {
    Link as LinkPage
  } from "react-router-dom";

import "./SignUp.css"

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
      paddingRight: 10
  },
  alignLabel: {
    alignItems: "center",
  },
  textCenterAlignment: {
    textAlign: "center"
  }
}));

export default function SignUp() {
    
    const classes = useStyles();

    const [formDetails, setFormDetails] = useState({});

    const [gender, setGender] = useState('female');
    const [firstName, setFirstName] = useState({
        error: false,
        value: ""
    });
    const [lastName, setLastName] = useState({
        error: false,
        value: ""
    });
    const [emailVal, setEmailVal] = useState({
        error: false,
        value: ""
    });
    const [mobile, setMobile] = useState({
        error: false,
        value: ""
    });
    const [password, setPassword] = useState({
        error: false,
        value: ""
    });

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
    const handleFirstNameChange = (e) => {
        const value = e.target.value;

        let errorLabel = '';
        if(!value) {
            errorLabel = 'First Name Cannot be empty';
        } else if(value !== "undefined"){
            if(!value.match(/^[a-zA-Z]+$/)){
                errorLabel = 'Only letters are allowed';
            }
        }
        setFirstName({
            value,
            error: errorLabel
        });
        
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
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
    const handleMobileChange = (e) => {
        const value = e.target.value;

        let errorLabel = '';
        if(!value) {
            errorLabel = 'Mobile Number Cannot be empty';
        } else if(value !== "undefined"){
            if(!value.match(/^[0-9]+$/)){
                errorLabel = 'Only Numbers are allowed';
                if(!value.length === 10) {
                    errorLabel = 'Enter 10 digit number';
                }
            }
        }
        setMobile({
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
            formFirstName: firstName,
            formLastName: lastName,
            formEmail: emailVal,
            formGender: gender,
            formMobile: mobile,
            formPassword: password
        });

        //reset
        setGender('female');
        setFirstName('');
        setLastName('');
        setEmailVal('');
        setMobile('');
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    error = {!firstName.error ? false : true}
                    label= "First Name"
                    defaultValue={firstName?.value}
                    onBlur={handleFirstNameChange}
                />
                <TextField
                    className="textField-hide"
                    error={!firstName.error ? false : true}
                    id="firstName-error-text"
                    defaultValue={firstName?.value}
                    helperText={firstName?.error}
                    variant="outlined"
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                defaultValue={lastName.value}
                onBlur={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange} row={true} className={classes.alignLabel}>
                    <FormLabel className={classes.label} component="legend">Gender</FormLabel>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={!mobile.error ? false : true}
                id="mobile"
                label="Mobile Number"
                name="mobile"
                defaultValue={mobile.value}
                onBlur={handleMobileChange}
              />
              <TextField
                    className="textField-hide"
                    error={!mobile.error ? false : true}
                    id="mobile-error-text"
                    defaultValue={mobile?.value}
                    helperText={mobile?.error}
                    variant="outlined"
                    />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
                Sign Up
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
        </form>
      </div>
          <Grid container 
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item>
                Already have an account? 
                <LinkPage to="/signin">
                    Sign in
                </LinkPage>
            </Grid>
          </Grid>
    </Container>
  );
}