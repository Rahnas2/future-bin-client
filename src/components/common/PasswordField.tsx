import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type props = {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    error: boolean
    helperText?: string 
}

const PasswordField = (props: props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <TextField
            label={props.label}
            variant="outlined"
            name={props.name}
            type={showPassword ? 'text' : 'password'}
            value={props.value}
            onChange={props.onChange}
            error={props.error}
            helperText={props.helperText}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <MdVisibilityOff className='text-gray-500' /> : <MdVisibility className='text-gray-500' />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordField;