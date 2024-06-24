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

async function updateUser(data: userType) {
	const { id, ...payload } = data;
	const res = await axiosInstance.put(`/user/${id}`, payload);
	return res.data;
}

async function buscarPorId(id: string) {
	const res = await axiosInstance.get(`/user/${id}`);
	return res.data;
}

export { buscarPorId, getAllUsers, saveUser, updateUser };
