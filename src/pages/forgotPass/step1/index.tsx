import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./forgotPass.module.scss";

function Step1({ setStep }) {
	return (
		<div className={styles.container}>
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
						/>
					</div>

					<Button
						type="button"
						variant="contained"
						className={styles?.["forgot-button"]}
						onClick={() => {
							setStep(2);
						}}
					>
						Continuar
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Step1;
