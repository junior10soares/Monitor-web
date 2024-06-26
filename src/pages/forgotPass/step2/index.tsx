import Button from "@mui/material/Button";
import ReactCodeInput from "react-code-input";
import styles from "./forgotPass.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

function Step2({ setStep }) {

	const [token, setToken] = useState("");

	const handleCodeChange = (value) => {
		setToken(value);
	};

	const handleContinueClick = () => {
		if (token.length === 6) {
			localStorage.setItem('token', token);
			setStep(3);
		} else {
			toast.error("Digite todos os 6 digitos", {
				position: "top-center",
				autoClose: 1000
			});
		}
	};

	const handleBackClick = () => {
		setStep(1)
	};

	return (
		<div className={styles.container}>
			<ToastContainer />
			<div className={styles?.["forgot-form-container"]}>
				<form action="" className={styles?.["forgot-form"]}>
					<div className={styles.titleDiv}>
						<h1 className={styles.title}>Esqueci a senha</h1>
						<span className={styles.subtitle}>
							Digite o código enviado para o seu e-mail, para que
							você consiga recuperar a senha.
						</span>
					</div>
					<div className={styles.codeInputContainer}>
						<ReactCodeInput
							name="code"
							type="number"
							fields={6}
							inputMode="tel"
							className={styles.codeInput}
							onChange={handleCodeChange}
						/>
					</div>
					<Button
						type="button"
						variant="contained"
						className={styles?.["forgot-button"]}
						onClick={handleContinueClick}
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
				</form>
			</div>
		</div>
	);
}

export default Step2;
