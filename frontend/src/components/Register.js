import { useState } from 'react'
import { TextField, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import { useNavigate } from "react-router-dom";


function Register() {
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
    

    async function createAccount(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const data = await response.json();
        console.log(data);

        if(data.status === 201) {
            alert("Account Created");
            navigate("/login");        
        }
    }
  
  
    return (
      <Box  display="flex" justifyContent="center" padding="5em">
        <form onSubmit={createAccount}>
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