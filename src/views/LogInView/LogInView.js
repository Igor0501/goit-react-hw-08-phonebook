import { useEffect, useState } from 'react'; // Import useEffect and useState
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
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
  const {
    state: userPassword,
    handleChange: handleUserPasswordChange,
  } = useFormFields('');
  const error = useSelector(getError);

  // State to track if the user wants to close the modal
  const [confirmClose, setConfirmClose] = useState(false);

  // Listen for the escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setConfirmClose(true);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogInSubmit = evt => {
    evt.preventDefault();

    dispatch(logIn({ email: userEmail, password: userPassword }));
  };

  const handleCloseModal = () => {
    if (confirmClose) {
    
      dispatch(resetError()); 
      setConfirmClose(false); 
    }
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
        <TextField
          id="outlined-basic"
          label="Password:"
          variant="outlined"
          type="password"
          required
          className={s.input}
          value={userPassword}
          onChange={handleUserPasswordChange}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!userEmail || userPassword.length < 7}
          className={s.registerBtn}
          endIcon={<SendIcon />}
        >
          Log In
        </Button>
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
          onClick={() => setConfirmClose(true)} // Open confirmation on overlay click
        >
          <Alert
            severity="error"
            variant="outlined"
            onClose={() => setConfirmClose(true)} // Open confirmation when closing alert
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleCloseModal}
              >
                Confirm Close
              </Button>
            }
          >
            {error}
          </Alert>
          {confirmClose && (
            <Button
              color="inherit"
              size="small"
              onClick={handleCloseModal}
            >
              Confirm Close
            </Button>
          )}
        </Stack>
      )}
    </Section>
  );
}
