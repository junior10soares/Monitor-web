import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const axiosBase = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
});

// Interceptors
axiosInstance.interceptors.request.use(
	(config): InternalAxiosRequestConfig => {
		if (!config.url?.includes("login")) {
			config.headers.setAuthorization(
				`Bearer ${localStorage.getItem("token")}`,
			);
		}

		return config;
	},
	(error): any => {
		console.log(error);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	async (response): Promise<any> => {
		return response;
	},
	async (error): Promise<any> => {
		console.log(error);
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.replace("/");
		}
		return Promise.reject(error);
	},
);
