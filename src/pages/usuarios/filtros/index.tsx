import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import styles from "./filters.module.scss";

function Filters(formik) {
	const navigate = useNavigate();
	return (
		<div className={styles.container}>
			<CustomTextField
				id="search"
				label="Buscar"
				formik={formik}
				col={3}
				type="text"
				value={""}
			/>
			<Button
				type="button"
				variant="contained"
				className={styles.buscarButton}
				onClick={() => {
					navigate("/users/new");
				}}
			>
				Novo Usuário
			</Button>
		</div>
	);
}

export default Filters;
