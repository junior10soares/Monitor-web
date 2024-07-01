import { useEffect, useState } from "react";
import { axiosBase } from "../../services/axios";

type UserProps = {
	name: string;
	role: string;
}

export default function Sidebar() {

	const infoDataUser: { [key: string]: string } = {
		'USER_ESTADO': 'Estado',
		'USER_MUNICIPIO': 'Município',
		'USER_REGIAO': 'Região Turística',
		'SISADMIN': 'Admin'
	};

	const [dataUser, setDataUser] = useState<UserProps | null>(null);

	useEffect(() => {
		(async function fetch() {
			const token = localStorage.getItem("token");
			const response = await axiosBase.get('/auth/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setDataUser(response.data)

		})();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				height: '80px',
				alignItems: 'center',
				justifyContent: 'flex-end',
				gap: '20px',
				marginRight: '20px',
				padding: '10px 20px',
				borderRadius: '8px',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
				fontFamily: 'Roboto, sans-serif',
				color: '#333',
				width: '100%'
			}}
		>
			<span style={{ fontWeight: '700', color: '#0073e6' }}>Bem vindo, </span>
			<span style={{ color: '#0073e6' }}>{dataUser?.name}</span>
			<span style={{ fontStyle: 'italic', color: '#0073e6' }}>
				{dataUser?.role ? infoDataUser[dataUser?.role] : ''}
			</span>
		</div>
	);
}
