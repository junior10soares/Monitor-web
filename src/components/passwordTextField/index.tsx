import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";
import "./passwordTextField.scss";

interface PasswordTextFieldProps {
	label: string;
	name: string;
	formik: FormikProps<any>
	col: number;
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
	label,
	name,
	formik,
	col,
}) => {
	const [showPass, setShowPass] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		formik?.handleChange(e);
	};

	return (
		<div className={`password-input-container col${col}`}>
			<TextField
				className="password-field"
				id={name}
				name={name}
				label={label}
				variant="outlined"
				type={showPass ? "text" : "password"}
				value={formik?.values[name]}
				onChange={handleChange}
				error={!!formik?.errors[name]}
				required
			/>

			<div className="eye-icon-div">
				{showPass ? (
					<VisibilityOffIcon
						className="pass-icon"
						onClick={() => {
							setShowPass(!showPass);
						}}
					/>
				) : (
					<RemoveRedEyeIcon
						className="pass-icon"
						onClick={() => {
							setShowPass(!showPass);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default PasswordTextField;
