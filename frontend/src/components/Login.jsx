import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    function handleChange(e) {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        // console.log(e.target.name, "value", e.target.value);
    };
    const sendRequest = async function () {
        const res = axios
            .post('http://localhost:5000/api/login', {
                email: inputs.email,
                password: inputs.password
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    function handleSubmit(e) {
        e.preventDefault();
        sendRequest().then(() => dispatch(authActions.login()))
            .then(() => history("/user"));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    marginLeft="auto"
                    marginRight="auto"
                    width={300}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant='h2'>Login</Typography>

                    <TextField
                        name='email'
                        onChange={handleChange}
                        type={'email'}
                        value={inputs.email}
                        variant='outlined'
                        placeholder='Email'
                        margin='normal' />

                    <TextField
                        name='password'
                        onChange={handleChange}
                        type='password'
                        value={inputs.password}
                        variant='outlined'
                        placeholder='Passwrod'
                        margin='normal' />

                    <Button variant='contained' type="submit">
                        Login
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default Login;