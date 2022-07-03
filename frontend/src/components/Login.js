import { useState } from 'react'
import { TextField, Box, Button } from '@mui/material';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loggingIn(event) {
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
      console.log(data);
  }


  return (
    <Box  display="flex" justifyContent="center" padding="5em">
      <form onSubmit={loggingIn}>
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
              variant="outlined"
              type="submit">
              Submit
          </Button>
      </form>       
    </Box>
  );
};

export default Login