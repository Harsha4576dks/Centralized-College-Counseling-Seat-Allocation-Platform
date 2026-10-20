import apiClient from "../api/client";

export const executeEmailResponse = async () =>  {
    try{
        const response = await apiClient.post("/Email/execute");
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to execute email response";
    }
};