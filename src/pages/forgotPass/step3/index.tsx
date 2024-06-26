import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import PasswordTextField from "../../../components/passwordTextField";
import styles from "./forgotPass.module.scss";
import { Loading } from "../../../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { axiosBase } from "../../../services/axios";

function Step3({ setStep }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleChangePassword = async (values, { setErrors }) => {

		try {
			setIsLoading(true);

			const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
			const specialCharPattern = /[^\w\s]/;

			let hasError = false;

			if (!values.password) {
				setErrors({ password: "Senha é obrigatória." });
				toast.error("Senha é obrigatória.", { position: "top-center", autoClose: 3000 });
				hasError = true;
			} else if (values.password.length < 6) {
				setErrors({ password: "A senha deve ter no mínimo 6 caracteres." });
				toast.error("A senha deve ter no mínimo 6 caracteres.", { position: "top-center", autoClose: 3000 });
				hasError = true;
			} else if (!passwordRules.test(values.password)) {
				setErrors({ password: "Mescle a senha com letras e números." });
				toast.error("Mescle a senha com letras e números.", { position: "top-center", autoClose: 3000 });
				hasError = true;
			} else if (specialCharPattern.test(values.password)) {
				setErrors({ password: "Proibido caracteres especiais como acento ou ponto e vírgula." });
				toast.error("Proibido caracteres especiais como acento ou ponto e vírgula.", { position: "top-center", autoClose: 3000 });
				hasError = true;
			}

			if (!values.confirmPassword) {
				setErrors({ confirmPassword: "Confirmação de senha é obrigatória." });
				toast.error("Confirmação de senha é obrigatória.", { position: "top-center", autoClose: 3000 });
				hasError = true;
			} else if (values.password !== values.confirmPassword) {
				setErrors({ confirmPassword: "As senhas não coincidem." });
				toast.error("As senhas não coincidem.", { position: "top-center", autoClose: 3000 });
				hasError = true;
			}

			if (hasError) {
				setIsLoading(false);
				return;
			}

			const email = localStorage.getItem("email");
			const token = localStorage.getItem("token");
			const password = values.password;

			await axiosBase.post('/auth/reset-password', {
				email,
				token,
				password
			});

			toast.success('Sua senha foi trocada com sucesso!', {
				position: 'top-center',
				autoClose: 1500
			});

			localStorage.clear();

			setTimeout(() => {
				navigate('/login');
			}, 2000);

		} catch (error) {
			toast.error("Token inválido, digite novamente seu token.", {
				position: "top-center",
				autoClose: 1000
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackClick = () => {
		setStep(2);
	};

	return (
		<div className={styles.container}>
			{isLoading && <Loading />}
			<ToastContainer />
			<div className={styles?.["forgot-form-container"]}>
				<Formik
					initialValues={{ password: "", confirmPassword: "" }}
					onSubmit={handleChangePassword}
				>
					{(formik) => (
						<Form className={styles?.["forgot-form"]} onSubmit={formik.handleSubmit}>
							<div className={styles.titleDiv}>
								<h1 className={styles.title}>Esqueci a senha</h1>
								<span className={styles.subtitle}>
									Escolha uma nova senha que você deseja utilizar para os próximos
									acessos.
								</span>

								<PasswordTextField
									col={12}
									label="Senha"
									name="password"
									formik={formik}
								/>
								<PasswordTextField
									col={12}
									label="Confirme a senha"
									name="confirmPassword"
									formik={formik}
								/>

								<div className={styles.recomendations}>
									<h1>Recomendações:</h1>
									<ul className={styles.recomendationList}>
										<li>Deve conter no mínimo 6 caracteres.</li>
										<li>Proibido caracteres especiais como acento ou ponto e vírgula.</li>
										<li>Mescle a senha com letras e números.</li>
									</ul>
								</div>
							</div>

							<Button
								type="submit"
								variant="contained"
								className={styles?.["forgot-button"]}
							>
								Continuar
							</Button>
							<Button
								type="button"
								variant="contained"
								className={styles?.["forgot-button"]}
								onClick={handleBackClick}
							>
								Voltar
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Step3;
