import HttpsIcon from "@mui/icons-material/Https";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import SedecBanner from "../../assets/sedecbanner.png";
import PasswordTextField from "../../components/passwordTextField";
import "../../global.scss";
import "./login.scss";

function Login() {
	const navigate = useNavigate();
	return (
		<div className="container">
			<div className="login-form-container">
				<img
					className="sedec-banner"
					src={SedecBanner}
					alt="sedec banner"
				/>
				<form action="" className="login-form">
					<TextField
						id="user"
						label="Usuário"
						variant="outlined"
						required
					/>
					<PasswordTextField />

					<div className="forgot-pass-div">
						<HttpsIcon />
						<a href="#">Esqueci minha senha</a>
					</div>

					<Button
						type="button"
						variant="contained"
						className="login-button"
						onClick={() => {
							navigate("/users");
						}}
					>
						Acessar
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Login;
