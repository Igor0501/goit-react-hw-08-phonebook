import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Section from 'components/Section';
import useFormFields from 'hooks/useFormFields';
import { logIn } from 'redux/auth/authOperations';
import { getError } from 'redux/auth/authSelectors';
import s from './LogInView.module.css';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { resetError } from 'redux/auth/authActions';

export default function LogInView() {
  const dispatch = useDispatch();
  const {
    state: userEmail,
    handleChange: handleUserEmailChange,
  } = useFormFields('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector(getError);

  const handleLogInSubmit = evt => {
    evt.preventDefault();

    dispatch(logIn({ email: userEmail, password: userPassword }));
    setUserPassword('');
  };

  return (
    <Section title="Please sign in to access the site" isHidden={false}>
      <form className={s.form} onSubmit={handleLogInSubmit}>
        <TextField
          id="outlined-basic"
          label="Email:"
          variant="outlined"
          type="email"
          autoFocus={true}
          className={s.input}
          value={userEmail}
          onChange={handleUserEmailChange}
        />
        <div className={s.passwordInputContainer}>
          <TextField
            id="outlined-basic"
            label="Password:"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            required
            className={`${s.input} ${s.passwordInput}`}
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            className={s.showPasswordButton}
          >
            {showPassword ? <VisibilityOff className={s.showPasswordIcon} /> : <Visibility className={s.showPasswordIcon} />}
          </IconButton>
        </div>
        <div className={s.formActions}> {/* Додайте новий блок для кнопки Log In */}
          <Button
            variant="contained"
            type="submit"
            disabled={!userEmail || userPassword.length < 7 ? true : false}
            className={s.registerBtn}
            endIcon={<SendIcon />}
          >
            Log In
          </Button>
        </div>
      </form>
      {error && (
        <Stack
          sx={{
            width: '400px',
            margin: '10px auto',
            boxShadow: 8,
            backgroundColor: '#fff',
          }}
          spacing={2}
        >
          <Alert
            severity="error"
            variant="outlined"
            onClose={() => {
              dispatch(resetError());
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(resetError());
                }}
              >
                Close
              </Button>
            }
          >
            {error}
          </Alert>
        </Stack>
      )}
    </Section>
  );
}
