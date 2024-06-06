import EditIcon from "@mui/icons-material/Edit";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Avatar, Box, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "user";
import { getAllUsers } from "../../../services/user";
import Filters from "../filtros";
import styles from "./list.module.scss";

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number,
	) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</Box>
	);
}

function ListUsers() {
	const navigate = useNavigate();

	const [rows, setRows] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		(async function fetch() {
			const res = await getAllUsers();
			if (res.content) {
				setRows(res.content);
			}
		})();
	}, []);

	return (
		<>
			<div className={styles.container}>
				<Filters />

				<div className={styles.gridContainer}>
					<h1 className={styles.listHeader}>Listagem de Usuários</h1>

					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							size="small"
							aria-label="a dense table"
						>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Nome</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Ações</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? rows.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage,
									  )
									: rows
								).map((row: userType) => (
									<TableRow
										key={row.id}
										sx={{
											"&:last-child td, &:last-child th":
												{ border: 0 },
										}}
									>
										<TableCell>
											<Avatar
												sx={{
													bgcolor: deepPurple[500],
												}}
											>
												{row.name[0]}
											</Avatar>
										</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>
											<>
												<EditIcon
													onClick={() =>
														navigate(
															`/users/edit/${row.id}`,
														)
													}
													className={
														styles.iconButton
													}
												/>

												{/* <DeleteIcon
													onClick={() => {}}
													className={
														styles.iconButton
													}
												/> */}
											</>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											{ label: "Todos", value: -1 },
										]}
										colSpan={3}
										count={rows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										slotProps={{
											select: {
												inputProps: {
													"aria-label":
														"Linhas por página",
												},
												native: true,
											},
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={
											handleChangeRowsPerPage
										}
										ActionsComponent={
											TablePaginationActions
										}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</div>
			</div>
		</>
	);
}

export default ListUsers;
