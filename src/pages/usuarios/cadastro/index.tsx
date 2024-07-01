import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Tab,
	Tabs,
	Typography
} from "@mui/material";
import { Formik } from "formik";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userType } from "user";
import CustomTextField from "../../../components/customTextField";
import { buscarPorId, saveUser, updateUser } from "../../../services/user";
import styles from "./form.module.scss";
import { recoverPassword } from "../../../services/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from "../../../components/Loading";
import CustomTextFieldSelect from "../../../components/custonTextFieldSelect";
import { axiosBase } from "../../../services/axios";
import InputMask from "../../../components/inputMask";

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


function Form() {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const params = useParams();
	const location = useLocation();
	const isEditRoute = location.pathname.includes('/users/edit');
	const [isLoading, setIsLoading] = useState(false)
	const [userMe, setUserMe] = useState()
	const roles = ["USER_ESTADO", "USER_MUNICIPIO", "USER_REGIAO"]

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	const handleResetPassword = async (formik, event) => {
		event.preventDefault();

		try {
			setIsLoading(true)
			const email = formik.values.email
			const token = localStorage.getItem("token");
			const headers = {
				Authorization: `Bearer ${token}`
			};
			const recoverResponse = await recoverPassword(email, headers);
			setIsButtonDisabled(true);
			toast.success("Seu token foi enviado por email", {
				position: "top-center"
			});

		} catch (error) {
			console.error("Erro ao resetar senha:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		async function fetchUser() {
			try {
				setIsLoading(true);
				const token = localStorage.getItem("token");
				const response = await axiosBase.get('/auth/me', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setUserMe(response.data.role);
			} catch (error) {
				console.error('Erro ao carregar usuários:', error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchUser();
	}, []);

	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				document: "",
				role: "",
			}}
			onSubmit={async (values: userType, { setErrors }) => {
				const errors = {};

				if (!values.name) {
					errors.name = "Nome completo é obrigatório";
				}
				if (!values.email) {
					errors.email = "E-mail é obrigatório";
				}
				if (!values.document) {
					errors.document = "CPF/CNPJ é obrigatório";
				} else if (values.document.replace(/[^0-9]/g, '').length < 11) {
					errors.document = "CPF/CNPJ deve ter no mínimo 11 caracteres";
				}
				if (!values.role) {
					errors.role = "Tipo é obrigatório";
				}

				if (Object.keys(errors).length > 0) {
					setErrors(errors);
					return;
				}

				try {
					setIsLoading(true);
					let res = {};
					const token = localStorage.getItem("token");
					const headers = {
						Authorization: `Bearer ${token}`
					};
					if (values.id) {
						res = await updateUser(values.id, values, headers);
						toast.success('Usuário atualizado com sucesso', {
							position: 'top-center',
							autoClose: 1500
						});
					} else {
						res = await saveUser(values, headers);
						toast.success('Usuário criado com sucesso', {
							position: 'top-center',
							autoClose: 1500
						});
					}
					setTimeout(() => {
						navigate('/users');
					}, 2000);
				} catch (error) {
					const errorMessage = error.response?.data?.message || 'Erro ao submeter formulário';
					toast.error(errorMessage, {
						position: 'top-center',
						autoClose: 3000
					});
				} finally {
					setIsLoading(false);
				}
			}}
		>
			{(formik) => {
				useEffect(() => {
					(async function fetch() {
						const token = localStorage.getItem("token");
						const headers = {
							Authorization: `Bearer ${token}`
						};
						if (params.id) {
							const res = await buscarPorId(params.id, headers);
							formik.setValues(res);
						}
					})();
				}, []);

				return (
					<div className={styles.container}>
						{isLoading && <Loading />}
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
								{/* <Tab
									label="Permissões"
									{...a11yProps(1)}
									className={styles.tabButton}
								/> */}
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<form className={styles.profileForm}>
								<div className={styles.profileContainer}>
									<h1 className="col10">Perfil</h1>
									<div>
										{/* <Avatar
											sx={{
												bgcolor: deepPurple[500],
											}}
											className={styles.profileAvatar}
										>
											{formik.values.name[0]}
										</Avatar> */}
										{/* <Button
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
									</Button> */}
									</div>
									<CustomTextField
										id="name"
										label="Nome Completo"
										formik={formik}
										value={formik.values.name}
										col={6}
									/>
									<InputMask
										style={{ width: "175px" }}
										id="document"
										label="CPF/CNPJ"
										formik={formik}
										col={6}
										mascara="000.000.000-00"
										secondMask="00.000.000/0000-00"
										definitions={{
											"#": /[1-9]/,
										}}
										value={formik.values.document}
										onChange={formik.handleChange}
									/>
									<CustomTextField
										id="email"
										label="E-mail"
										formik={formik}
										value={formik.values.email}
										col={12}
										maskType="email"
									/>
									{userMe !== 'USER_REGIAO' && (
										<CustomTextFieldSelect
											name="role"
											id="role"
											label="Tipo"
											formik={formik}
											options={
												userMe === 'SISADMIN' ? roles
													: userMe === 'USER_ESTADO' ? ['USER_MUNICIPIO', 'USER_REGIAO']
														: userMe === 'USER_MUNICIPIO' ? ['USER_REGIAO']
															: []
											}
											col={6}
											value={formik.values.role}
											fullWidth
										/>
									)}
									<ToastContainer />
									{isEditRoute ? (
										<>
											<Button
												type="submit"
												variant="contained"
												className={styles.primaryButton}
												style={{ margin: 'auto' }}
												disabled={isButtonDisabled}
												onClick={(event) => handleResetPassword(formik, event)}
											>
												Alterar senha
											</Button>
										</>
									) : (
										<div style={{ display: 'flex', gap: '15px', width: '100%' }}>
											{/* <PasswordTextField
												formik={formik}
												col={12}
												label="Senha"
												name="senha"
											/>
											<PasswordTextField
												col={12}
												formik={formik}
												label="Repetir Senha"
												name="repeat-senha"
											/> */}
										</div>
									)}
								</div>
								{/* {!isEditRoute && (
									<div className={styles.passwordContainer}>
										<div className={`col12 ${styles.passInfo}`}>
											<h1>Recomendações:</h1>
											<ul>
												<li>
													Deve conter no mínimo 6
													caracteres.
												</li>
												<li>
													Proibido caracteres especiais
													como acento ou ponto e virgula.
												</li>
												<li>
													Mescle a senha com letras e
													números.
												</li>
											</ul>
										</div>
									</div>
								)} */}
							</form>
							<div className={styles.buttonsFooter}>
								<Button
									type="button"
									variant="contained"
									className={styles.primaryButton}
									sx={{ background: "white", color: "black" }}
									onClick={() => {
										navigate("/users");
									}}
								>
									Voltar
								</Button>
								<Button
									type="submit"
									variant="contained"
									className={styles.primaryButton}
									onClick={() => {
										formik.submitForm();
									}}
								>
									Salvar
								</Button>
							</div>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<form className={styles.permissionForm}>
								<div className={styles.permissionContainer}>
									<h1 className="col12">Permissões</h1>
									<div>
										<FormGroup
											className={
												styles.permissionsCheckbox
											}
										>
											<div className="col5">
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															defaultChecked
															style={{
																color: 'white',
															}}
														/>
													}
													label="Criar novo usuário de qualquer perfil"
												/>
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															style={{
																color: 'white',
															}}
														/>
													}
													label="Resetar a senha de qualquer usuário"
												/>
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															style={{
																color: 'white',
															}}
														/>
													}
													label="Poderá cadastrar notificações do tipo SISTEMA"
												/>
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															style={{
																color: 'white',
															}}
														/>
													}
													label="Outro item aqui a ser definido"
												/>
											</div>
											<div className="col5">
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															defaultChecked
															style={{
																color: 'white',
															}}
														/>
													}
													label="Desativar o acesso de qualquer usuário"
												/>
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															style={{
																color: 'white',
															}}
														/>
													}
													label="NÃO será permitida a deleção de usuários"
												/>
												<FormControlLabel
													className={`col12 ${styles.permissionItemActive}`}
													control={
														<Checkbox
															style={{
																color: 'white',
															}}
														/>
													}
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
			}}
		</Formik >
	);
}

export default Form;
