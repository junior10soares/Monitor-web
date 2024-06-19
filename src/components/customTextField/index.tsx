import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { CustomTextFieldProps } from "customTexteFieldProps";
import styles from "./customTextField.module.scss";

const maskMap = {
  cpf: "999.999.999-99",
};

export default function CustomTextField({
  id,
  label,
  formik,
  value,
  onChange,
  required = false,
  col,
  maskType,
  ...rest
}: CustomTextFieldProps & { maskType?: "cpf" | "email" }) {
  const [emailError, setEmailError] = useState<string | null>(null);

  const error = formik?.errors?.[id] as string | undefined;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = ev.target;

    if (maskType === "email") {
      value = value.toLowerCase().replace(/\s/g, "");
      ev.target.value = value;
    }

    if (typeof onChange === "function") {
      onChange(ev);
    } else {
      formik?.handleChange(ev);
    }
  };

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (maskType === "email") {
      const { value } = ev.target;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Endereço de email inválido. Deve conter '@' e um domínio, por exemplo: 'exemplo@dominio.com'.");
      } else {
        setEmailError(null);
      }
    }

    if (typeof formik?.handleBlur === "function") {
      formik.handleBlur(ev);
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (maskType === "email" && ev.key === " ") {
      ev.preventDefault();
    }
  };

  const renderInput = (inputProps: any) => (
    <TextField
      {...inputProps}
      id={id}
      label={label}
      error={!!error || !!emailError}
      required={required}
      variant="outlined"
      className="col12"
      helperText={formik?.touched?.[id] && formik?.errors?.[id] ? error : emailError || ''}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );

  return (
    <div className={`col${col} ${styles.customTextFieldContainer}`}>
      {maskType === "cpf" ? (
        <InputMask
          mask={maskMap.cpf}
          value={value ?? formik?.values?.[id]}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {(inputProps: any) => renderInput(inputProps)}
        </InputMask>
      ) : maskType === "email" ? (
        renderInput({ value: value ?? formik?.values?.[id], onChange: handleChange, onBlur: handleBlur, type: "email" })
      ) : (
        renderInput({ value: value ?? formik?.values?.[id], onChange: handleChange })
      )}
      {!!formik?.errors?.[id] && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  );
}
