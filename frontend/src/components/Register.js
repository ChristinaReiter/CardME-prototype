import { useState } from 'react'
import { TextField, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { useNavigate } from "react-router-dom";
import AuthService from '../services/AuthService';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const navigate = useNavigate();



    const toggle = () => {
            setShowPw(!showPw);        
    }; 
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };     

    const handleRegister = (event) => {
      event.preventDefault();
      AuthService.register({name, email, password}).then(
        () => {
          navigate("/login");
          //window.location.reload();
        }
      )
  }
  
  
    return (
      <Box  display="flex" justifyContent="center" padding="5em">
        <form onSubmit={handleRegister}>
            <TextField 
                sx={{ m: 1 }}
                type="text"
                label="User Name"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required> 
            </TextField>
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
                Register
            </Button>
        </form>       
      </Box>
    );
  };
  
  export default Register