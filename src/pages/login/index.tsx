import HttpsIcon from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import SedecBanner from "../../assets/sedecbanner.png";
import PasswordTextField from "../../components/passwordTextField";
import "../../global.scss";
import { login } from "../../services/auth";
import "./login.scss";

function Login() {
	const navigate = useNavigate();
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validate={(_values) => {
				const errors: any = {};
				if (!_values.email) {
					errors.email = "Este campo é obrigatório!";
				}
				if (!_values.password) {
					errors.password = "Este campo é obrigatório";
				}
				return errors;
			}}
			onSubmit={async (values) => {
				const res = await login(values.email, values.password);
				if (res.token) {
					localStorage.setItem("token", res.token);
					navigate("/users");
				}
			}}
		>
			{(formik) => (
				<div className="container">
					<div className="login-form-container">
						<img
							className="sedec-banner"
							src={SedecBanner}
							alt="sedec banner"
						/>
						<form action="" className="login-form">
							<TextField
								id="email"
								label="Usuário"
								variant="outlined"
								value={formik.values.email}
								onChange={formik.handleChange}
								required
								error={!!formik.errors.email}
							/>
							<span className="error">{formik.errors.email}</span>
							<PasswordTextField
								formik={formik}
								col={12}
								label="Senha"
								name="password"
							/>
							<span className="error">
								{formik.errors.password}
							</span>
							<div
								className="forgot-pass-div"
								onClick={() => navigate("/esqueci-minha-senha")}
							>
								<HttpsIcon />
								<a href="#">Esqueci minha senha</a>
							</div>

							<Button
								type="button"
								variant="contained"
								className="login-button"
								onClick={() => {
									formik.submitForm();
								}}
							>
								Acessar
							</Button>
						</form>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default Login;
