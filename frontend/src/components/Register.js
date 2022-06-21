import { useState } from 'react'
import { TextField, Box, Button } from '@mui/material';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  
    return (
      <Box  display="flex" justifyContent="center" padding="5em">
        <form>
            <TextField 
                type="text"
                placeholder='"User Name"'
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required> 
            </TextField>
            <TextField 
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required> 
            </TextField>
            <TextField 
                type="text"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required> 
            </TextField>
            <Button
                variant="outlined">
                Submit
            </Button>
        </form>       
      </Box>
    );
  };
  
  export default Register