import React from 'react';
import { useField } from 'formik';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

interface CustomTextFieldProps {
    name: string;
    id: string;
    label: string;
    options: string[];
    col: number;
    formik: any;
    fullWidth?: boolean;
    value?: string | undefined
}

const CustomTextFieldSelect: React.FC<CustomTextFieldProps> = ({
    name,
    id,
    label,
    options,
    formik,
    fullWidth = false,
}) => {
    const [field, meta] = useField(name);

    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                {...field}
                id={id}
                label={label}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth={fullWidth}
                defaultValue=""
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomTextFieldSelect;
