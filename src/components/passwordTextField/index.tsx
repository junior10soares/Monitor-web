import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";
import { useState } from "react";
import "./passwordTextField.scss";

interface FormValues {
	label: string;
	name: string;
	formik: FormikProps<any>;
	col: number;
}

function PasswordTextField(props: FormValues) {
	const [showPass, setShowPass] = useState(false);
	return (
		<div className={`password-input-container col${props.col}`}>
			{!showPass ? (
				<TextField
					className="password-field"
					id="password"
					name="password"
					label={props.label}
					variant="outlined"
					type="password"
					value={props.formik.values[props.name]}
					onChange={props.formik.handleChange}
					error={!!props.formik.errors[props.name]}
					required
				/>
			) : (
				<TextField
					className="password-field"
					id="password"
					label={props.label}
					name="password"
					variant="outlined"
					value={props.formik.values[props.name]}
					onChange={props.formik.handleChange}
					error={!!props.formik.errors[props.name]}
					required
				/>
			)}

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
}

export default PasswordTextField;
