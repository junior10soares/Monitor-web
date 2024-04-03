import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Tab,
	Tabs,
	Typography,
	styled,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { SyntheticEvent, useState } from "react";
import CustomTextField from "../../../components/customTextField";
import PasswordTextField from "../../../components/passwordTextField";
import styles from "./form.module.scss";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const VisuallyHiddenInput = styled("input")({
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 0.1,
});

function Form() {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	return (
		<div className={styles.container}>
			<Box className={styles.tabHeader}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab
						label="Perfil"
						{...a11yProps(0)}
						className={styles.tabButton}
					/>
					<Tab
						label="Permissões"
						{...a11yProps(1)}
						className={styles.tabButton}
					/>
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<form className={styles.profileForm}>
					<div className={styles.profileContainer}>
						<h1 className="col12">Perfil</h1>
						<div className={`col4 ${styles.profileImage}`}>
							<Avatar
								sx={{
									bgcolor: deepPurple[500],
								}}
								className={styles.profileAvatar}
							>
								D
							</Avatar>
							<Button
								component="label"
								role={undefined}
								variant="contained"
								tabIndex={-1}
								startIcon={<CloudUploadIcon />}
								className={styles.inputFileProfile}
								sx={{
									padding: "1rem",
									paddingInline: "5rem",
								}}
							>
								Upload file
								<VisuallyHiddenInput type="file" />
							</Button>
						</div>
						<CustomTextField
							id="name"
							label="Nome Completo"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="cpf"
							label="CPF"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="email"
							label="E-mail"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="address"
							label="Endereço"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="municipio"
							label="Município"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="phone"
							label="Celular"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="profile"
							label="Perfil do usuário"
							formik={{}}
							col={4}
						/>
						<CustomTextField
							id="status"
							label="Status"
							formik={{}}
							col={4}
						/>
					</div>
					<div className={styles.passwordContainer}>
						<PasswordTextField col={4} />
						<PasswordTextField col={4} label="Repetir Senha" />
						<div className={`col12 ${styles.passInfo}`}>
							<h1>Recomendações:</h1>
							<ul>
								<li>Deve conter no mínimo 6 caracteres.</li>
								<li>
									Proibido caracteres especiais como acento ou
									ponto e virgula.
								</li>
								<li>Mescle a senha com letras e números.</li>
							</ul>
						</div>
					</div>
				</form>
				<div className={styles.buttonsFooter}>
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
						sx={{ background: "white", color: "black" }}
					>
						Voltar
					</Button>
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
						onClick={() => setValue(1)}
					>
						Continuar
					</Button>
				</div>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<form className={styles.permissionForm}>
					<div className={styles.permissionContainer}>
						<h1 className="col12">Permissões</h1>
						<div>
							<FormGroup className={styles.permissionsCheckbox}>
								<div className="col5">
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox defaultChecked />}
										label="Criar novo usuário de qualquer perfil"
									/>
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox />}
										label="Resetar a senha de qualquer usuário"
									/>
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox />}
										label="Poderá cadastrar notificações do tipo SISTEMA"
									/>
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox />}
										label="Outro item aqui a ser definido"
									/>
								</div>
								<div className="col5">
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox defaultChecked />}
										label="Desativar o acesso de qualquer usuário"
									/>
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox />}
										label="NÃO será permitida a deleção de usuários"
									/>
									<FormControlLabel
										className={`col12 ${styles.permissionItemActive}`}
										control={<Checkbox />}
										label="Outro item aqui a ser definido"
									/>
								</div>
							</FormGroup>
						</div>
					</div>
				</form>
				<div className={styles.buttonsFooter}>
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
						sx={{ background: "white", color: "black" }}
						onClick={() => setValue(0)}
					>
						Voltar
					</Button>
					<Button
						type="submit"
						variant="contained"
						className={styles.primaryButton}
						onClick={() => setValue(1)}
					>
						Salvar
					</Button>
				</div>
			</CustomTabPanel>
		</div>
	);
}

export default Form;
