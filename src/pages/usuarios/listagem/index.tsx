import EditIcon from "@mui/icons-material/Edit";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box, Switch, useTheme } from "@mui/material";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../filtros";
import styles from "./list.module.scss";
import { Loading } from "../../../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import { axiosBase } from "../../../services/axios";

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
	const [filteredRows, setFilteredRows] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [isLoading, setIsLoading] = useState(false);

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

	const handleFilterUsers = (searchTerm) => {
		const filteredUsers = rows.filter(
			(user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredRows(filteredUsers);
	};

	useEffect(() => {
		(async function fetch() {
			const token = localStorage.getItem("token");
			const response = await axiosBase.get('/user', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.data.content) {
				setRows(response.data.content);
				setFilteredRows(response.data.content);
			}
		})();
	}, []);

	const handleActiveDesactiveUser = async (id: number, isActive: boolean) => {
		try {
			setIsLoading(true);

			const token = localStorage.getItem("token");

			if (!isActive) {
				await axiosBase.put(`/user/${id}/activate`, { id }, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				toast.success("Usuário foi ativado", {
					position: "top-center",
					autoClose: 1000
				});
			} else {
				await axiosBase.put(`/user/${id}/deactivate`, { id }, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				toast.error("Usuário foi desativado", {
					position: "top-center",
					autoClose: 1000
				});
			}

			// const userData = await buscarPorId(id);
			// const updatedActiveStatus = isActive ? true : false
			// await updateUser(id, { ...userData, active: updatedActiveStatus });

			const updatedRows = rows.map(row =>
				row.id === id ? { ...row, active: !isActive } : row
			);
			setRows(updatedRows); // atualiza todas as linhas 
			setFilteredRows(updatedRows);

		} catch (error) {
			console.error("Erro ao ativar/desativar usuário:", error);
		} finally {
			setIsLoading(false)
		}
	};

	return (
		<>
			<div className={styles.container}>
				{isLoading && <Loading />}

				<ToastContainer />

				<Filters onFilter={handleFilterUsers} />

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
									<TableCell>CPF</TableCell>
									<TableCell align="center">Ações</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? filteredRows.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage,
									)
									: filteredRows
								).map((row) => (
									<TableRow
										key={row.id}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
											opacity: !row.active ? 0.5 : 1
										}}
									>
										<TableCell></TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.document}</TableCell>
										<TableCell align="center">
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
												<EditIcon
													onClick={() => navigate(`/users/edit/${row.id}`)}
													className={styles.iconButton}
												/>
												<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
													{row.role !== 'SISADMIN' && (
														<>
															<Switch
																defaultChecked={row.active}
																color="success"
																onClick={() => handleActiveDesactiveUser(row.id, row.active)}
															/>
															<span>Ativo</span>
														</>
													)}
												</div>
											</div>
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
