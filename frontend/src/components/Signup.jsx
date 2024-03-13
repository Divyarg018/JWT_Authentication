import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios '

function Signup() {
    const [inputs, setInputs] = useState({
        name: "",
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


    function handleSubmit(e) {
        e.preventDefault();
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
                    <Typography variant='h2'>Signup</Typography>

                    <TextField
                        name='name'
                        onChange={handleChange}
                        value={inputs.name}
                        variant='outlined'
                        placeholder='Name'
                        margin='normal' />

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
                        Signup
                    </Button>
                </Box>
            </form>
        </div>
    )
}

export default Signup;