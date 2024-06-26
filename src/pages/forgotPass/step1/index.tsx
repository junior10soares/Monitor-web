import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./forgotPass.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosBase } from "../../../services/axios";

function Step1({ setStep }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(false);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleContinueClick = async () => {
		setIsLoading(true);
		try {
			const res = await axiosBase.get('/auth/check-email-reset-password', {
				params: {
					email: email
				}
			});

			if (res.status === 200) {
				setIsValidEmail(true);
				localStorage.setItem('email', email);
				setStep(2);
			} else {
				setIsValidEmail(false);
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				toast.error("Token expirado, solicitar um novo token.", {
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

	const handleBackClick = () => {
		navigate("/login");
	};

	return (
		<div className={styles.container}>
			<ToastContainer />
			<div className={styles?.["forgot-form-container"]}>
				<form action="" className={styles?.["forgot-form"]}>
					<div className={styles.titleDiv}>
						<h1 className={styles.title}>Esqueci a senha</h1>
						<span className={styles.subtitle}>
							Digite o seu e-mail, você receberá um código de
							verificação em sua caixa de mensagens.
						</span>
						<TextField
							id="email"
							label="E-mail"
							variant="outlined"
							required
							value={email}
							onChange={handleEmailChange}
						/>
					</div>
					<Button
						type="button"
						variant="contained"
						className={styles?.["forgot-button"]}
						onClick={handleContinueClick}
					>
						{isLoading ? 'Verificando...' : 'Continuar'}
					</Button>
					<Button
						type="button"
						variant="contained"
						className={styles?.["forgot-button"]}
						onClick={handleBackClick}
					>
						Voltar
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Step1;
