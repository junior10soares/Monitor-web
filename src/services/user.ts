import { userType } from "user";
import { axiosInstance } from "./axios";

async function getAllUsers() {
	const res = await axiosInstance.get("/user");
	return res.data;
}

async function saveUser(data: userType) {
	const res = await axiosInstance.post("/user", data);
	return res.data;
}

async function updateUser(id: number, data: userType) {
	const res = await axiosInstance.put(`/user/${id}`, data);
	return res.data;
}

async function buscarPorId(id: string) {
	const res = await axiosInstance.get(`/user/${id}`);
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
