import { axiosInstance } from "./axios";

async function login(email: string, password: string) {
	const res = await axiosInstance.post("/auth/login", { email, password });
	return res.data;
}

export { login };
