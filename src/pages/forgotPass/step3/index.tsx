import Button from "@mui/material/Button";
import PasswordTextField from "../../../components/passwordTextField";
import styles from "./forgotPass.module.scss";

function Step3({ setStep }) {
	return (
		<div className={styles.container}>
			<div className={styles?.["forgot-form-container"]}>
				<form action="" className={styles?.["forgot-form"]}>
					<div className={styles.titleDiv}>
						<h1 className={styles.title}>Esqueci a senha</h1>
						<span className={styles.subtitle}>
							Escolha uma nova senha que você deseja utilizar para
							os próximos acessos.
						</span>

						<PasswordTextField />
						<PasswordTextField
							label="Repetir Senha"
							name="repeatePass"
						/>
						<div className={styles.recomendations}>
							<h1>Recomendações:</h1>
							<ul className={styles.recomendationList}>
								<li>Deve conter no mínimo 6 caracteres.</li>
								<li>
									Proibido caracteres especiais como acento ou
									ponto e virgula.
								</li>
								<li>Mescle a senha com letras e números.</li>
							</ul>
						</div>
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

export default Step3;
