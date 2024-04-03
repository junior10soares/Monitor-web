import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "./rootpage.module.scss";

function Root() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles.container}>
			{isLoading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "fixed",
						width: "100%",
						height: "100%",
						backgroundColor: "#c4c4c4d1",
						zIndex: 10000,
					}}
				>
					<CircularProgress />
				</Box>
			)}
			<Sidebar />
			<div className={styles.content}>
				<Navbar />
				<Outlet context={[isLoading, setIsLoading]} />
			</div>
		</div>
	);
}

export default Root;
