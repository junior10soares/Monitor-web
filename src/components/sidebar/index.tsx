import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SedecBanner from "../../assets/sedecbanner.png";
import styles from "./styles.module.scss";

export default function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div id={styles.sidebar}>
				<img
					className={styles?.["sedec-banner"]}
					src={SedecBanner}
					alt="sedec banner"
				/>
				<div className={styles.buttonsDiv}>
					<div
						className={`${styles.button} ${
							location.pathname === "/" ? styles.active : ""
						}`}
					>
						<div className={styles.headerButton}>
							<HomeIcon className={styles?.buttonIcon} />
							<span>Home</span>
						</div>
						<ArrowForwardIosIcon className={styles?.arrowIcon} />
					</div>
					<div
						className={`${styles.button} ${
							location.pathname.includes("users")
								? styles.active
								: ""
						}`}
					>
						<div className={styles.headerButton}>
							<PersonIcon className={styles?.buttonIcon} />
							<span>Usuários</span>
						</div>
						<ArrowForwardIosIcon className={styles?.arrowIcon} />
					</div>
					<div
						className={`${styles.button} ${
							location.pathname.includes("turismo")
								? styles.active
								: ""
						}`}
					>
						<div className={styles.headerButton}>
							<DirectionsBusFilledIcon
								className={styles?.buttonIcon}
							/>
							<span>Ações turisticas</span>
						</div>
						<ArrowForwardIosIcon className={styles?.arrowIcon} />
					</div>
					<div
						className={styles.sairButton}
						onClick={() => handleClickOpen()}
					>
						<div className={styles.headerButton}>
							<LogoutIcon className={styles?.buttonIcon} />
							<span>Sair</span>
						</div>
						<ArrowForwardIosIcon className={styles?.arrowIcon} />
					</div>
				</div>

				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Confirmação"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Deseja mesmo sair sem salvar o formulário?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Não</Button>
						<Button
							onClick={() => {
								for (let index = 0; index < 5; index++) {
									localStorage.removeItem(`step${index + 1}`);
								}
								navigate("/login");
								handleClose();
							}}
							autoFocus
						>
							Sim
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
}
