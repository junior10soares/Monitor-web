import { userType } from "user";
import { axiosBase, axiosInstance } from "./axios";

async function getAllUsers() {
	const res = await axiosInstance.get("/user");
	return res.data;
}

async function saveUser(data: userType, headers: any) {
	const res = await axiosBase.post("/user", data, { headers });
	return res.data;
}

async function updateUser(id: number, data: userType, headers: any) {
	const res = await axiosBase.put(`/user/${id}`, data, { headers });
	return res.data;
}

async function buscarPorId(id: string, headers: any) {
	const res = await axiosBase.get(`/user/${id}`, { headers });
	return res.data;
}

export { buscarPorId, getAllUsers, saveUser, updateUser };

export async function activeUser(id: number) {
	const response = await axiosInstance.put(`/user/${id}/activate`, { id });
	return response.data;
}

export async function desactiveUser(id: number) {
	const response = await axiosInstance.put(`/user/${id}/deactivate`, { id });
	return response.data;
}
