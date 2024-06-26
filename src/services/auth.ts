import { axiosInstance } from "./axios";

async function login(email: string, password: string) {
	const res = await axiosInstance.post("/auth/login", { email, password });
	return res.data;
}

export { login };

export async function resetPassword(email: string, password: string, token: string) {
	const res = await axiosInstance.post("/auth/reset-password", { email, password, token });
	return res.data;
}

export async function recoverPassword(email: string) {
	const res = await axiosInstance.post("/auth/recover-password", { email });
	return res.data;
}

export async function getUserMe() {
	const res = await axiosInstance.get("/auth/me");
	return res.data;
}
