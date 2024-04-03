import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/erroPage";
import ForgotPass from "../pages/forgotPass";
import Login from "../pages/login";
import Root from "../pages/rootPage";
import UsersForm from "../pages/usuarios/cadastro";
import UsersList from "../pages/usuarios/listagem";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/esqueci-minha-senha",
		element: <ForgotPass />,
	},
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/users",
				element: <UsersList />,
			},
			{
				path: "/users/new",
				element: <UsersForm />,
			},
			{
				path: "/users/edit/:id",
				element: <UsersForm />,
			},
			{
				path: "/users/view/:id",
				element: <UsersForm />,
			},
		],
	},
]);
function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
