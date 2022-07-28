import { useState } from 'react'
import { TextField, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { useNavigate } from "react-router-dom";
import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({setCurrentAccount}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const toggle = () => {
    setShowPw(!showPw);        
    }; 

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    }; 

    const navigate = useNavigate();

     const handleLogin = (e) => {
      e.preventDefault();
      AuthService.login({ email, password }).then(
        res => {
          if(res.status){
            toast(res.message)
          }else{
          navigate("/profile/view");
          setCurrentAccount(res);
          }
        
     }).catch( () => {
        toast("Login failed")
      }) 

     

    }
 
  return (
    <Box  display="flex" justifyContent="center" padding="5em">
      <form onSubmit={ handleLogin }>
            <TextField
                sx={{ m: 1 }} 
                type="text"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required> 
            </TextField>
            <TextField 
                sx={{ m: 1 }}
                type={showPw ? 'text' : 'password'}
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggle}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}> 
            </TextField> 
          <Button
              sx={{ m: 2 }}
              color="secondary"
              variant="contained"
              type="submit">
              Login
          </Button>
      </form>
      <ToastContainer />       
    </Box>
  );
};

export default Login