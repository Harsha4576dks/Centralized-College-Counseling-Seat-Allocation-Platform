import apiClient from "../middleware/client";

export const executeEmailResponse = async (roundId) =>  {
    try{
        const response = await apiClient.post(`/Email/execute/${roundId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to execute email response";
    }
};
