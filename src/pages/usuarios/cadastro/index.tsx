import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
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
				Perfil
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				Permissões
			</CustomTabPanel>
		</div>
	);
}

export default Form;