import { useState } from 'react'
import { TextField, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { useNavigate } from "react-router-dom";


function Login() {

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


  async function loginAccount(event) {
      event.preventDefault();
      const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email,
              password
          })
      });
      const data = await response.json();

      if(data.account) {
        localStorage.setItem("token", data.account)  // not the way
        alert("Login Successful");
        navigate("/profile/view");        
      } else {
        alert("Login Failed");

      console.log(data);
      }
  }


  return (
    <Box  display="flex" justifyContent="center" padding="5em">
      <form onSubmit={loginAccount}>
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
              Submit
          </Button>
      </form>       
    </Box>
  );
};

export default Login