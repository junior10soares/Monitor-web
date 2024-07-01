import React from 'react';
import { useField } from 'formik';
import {
    FormControl,
    FormHelperText,
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
    required?: boolean
}

const roleDisplayMapping = {
    'USER_ESTADO': 'Estado',
    'USER_MUNICIPIO': 'Município',
    'USER_REGIAO': 'Região Turística',
};

const displayRoleMapping = {
    'Estado': 'USER_ESTADO',
    'Município': 'USER_MUNICIPIO',
    'Região Turística': 'USER_REGIAO',
};

const CustomTextFieldSelect: React.FC<CustomTextFieldProps> = ({
    name,
    id,
    label,
    options,
    formik,
    fullWidth = false,
    required = false
}) => {
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const backendValue = displayRoleMapping[selectedValue];
        formik.setFieldValue(name, backendValue);
    };

    return (
        <FormControl fullWidth={fullWidth} error={meta.touched && Boolean(meta.error)}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                {...field}
                id={id}
                label={label}
                value={roleDisplayMapping[field.value] || ""}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                fullWidth={fullWidth}
                defaultValue=""
                required={required}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={roleDisplayMapping[option]}>
                        {roleDisplayMapping[option]}
                    </MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error ? (
                <FormHelperText style={{ margin: 0 }}>{meta.error}</FormHelperText>
            ) : null}
        </FormControl>
    );
};

export default CustomTextFieldSelect;