import { TextField } from '@mui/material';

export const CustomTextField = ({ name, label, type, value, onChange, ...props }) => (
    <TextField
        label={label}
        variant="outlined"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
    />
);