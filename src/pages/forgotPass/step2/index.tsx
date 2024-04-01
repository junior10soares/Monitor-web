import Button from "@mui/material/Button";
import ReactCodeInput from "react-code-input";
import styles from "./forgotPass.module.scss";

function Step2({ setStep }) {
	return (
		<div className={styles.container}>
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
							fields={4}
							inputMode="tel"
							className={styles.codeInput}
						/>
					</div>

					<Button
						type="button"
						variant="contained"
						className={styles?.["forgot-button"]}
						onClick={() => {
							setStep(3);
						}}
					>
						Continuar
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Step2;
