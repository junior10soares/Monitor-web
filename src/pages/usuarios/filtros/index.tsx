import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/customTextField";
import styles from "./filters.module.scss";
import { useState } from "react";

function Filters({ formik, onFilter }) {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onFilter(value.trim());
	};

	return (
		<div className={styles.container}>
			<CustomTextField
				col={3}
				formik={formik}
				id="search"
				label="Buscar por nome ou email"
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
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
