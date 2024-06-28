import HttpsIcon from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import SedecBanner from "../../assets/sedecbanner.png";
import PasswordTextField from "../../components/passwordTextField";
import "../../global.scss";
import "./login.scss";
import { axiosBase } from "../../services/axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleCheckEmailandLogin = async (values, { setErrors }) => {
		setIsLoading(true);
		try {
			const errors = {};
			if (!values.email) {
				errors.email = "Este campo é obrigatório!";
				toast.error(errors.email, { position: "top-center", autoClose: 3000 });
			}
			if (!values.password) {
				errors.password = "Este campo é obrigatório";
				toast.error(errors.password, { position: "top-center", autoClose: 3000 });
			}
			if (Object.keys(errors).length > 0) {
				setErrors(errors);
				setIsLoading(false);
				return;
			}

			const email = values?.email;
			const password = values?.password;
			const res = await axiosBase.post('/auth/login', { email, password });

			if (res.data.token) {
				localStorage.setItem("token", res.data.token);

				const token = localStorage.getItem("token");
				const response = await axiosBase.get('/auth/me', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				const { initialPassword } = response.data;

				if (initialPassword) {
					navigate("/esqueci-minha-senha", { state: { initialStep: 3 } });
				} else {
					navigate("/users");
				}
			} else {
				toast.error("Senha ou email incorretos", {
					position: "top-center",
					autoClose: 3000
				});
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message || "Erro ao verificar o e-mail.", {
					position: "top-center",
					autoClose: 3000
				});
			} else {
				toast.error("Erro ao verificar o e-mail.", {
					position: "top-center",
					autoClose: 3000
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={handleCheckEmailandLogin}
		>
			{(formik) => (
				<div className="container">
					<ToastContainer />

					<div className="login-form-container">
						<img
							className="sedec-banner"
							src={SedecBanner}
							alt="sedec banner"
						/>
						<form action="" className="login-form" onSubmit={formik.handleSubmit}>
							<TextField
								id="email"
								label="Usuário"
								variant="outlined"
								value={formik?.values?.email}
								onChange={formik?.handleChange}
								required
								error={!!formik?.errors?.email}
							/>
							<span className="error">{formik?.errors?.email}</span>
							<PasswordTextField
								formik={formik}
								col={12}
								label="Senha"
								name="password"
							/>
							<span className="error">
								{formik?.errors?.password}
							</span>
							<div
								className="forgot-pass-div"
								onClick={() => navigate("/esqueci-minha-senha")}
							>
								<HttpsIcon />
								<a href="">Esqueci minha senha</a>
							</div>

							<Button
								type="submit"
								variant="contained"
								className="login-button"
								disabled={isLoading}
							>
								{isLoading ? 'Verificando...' : 'Acessar'}
							</Button>
						</form>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default Login;
