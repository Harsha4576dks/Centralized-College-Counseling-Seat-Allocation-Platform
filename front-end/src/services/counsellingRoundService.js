import apiClient from "../middleware/client";

export const executeCounsellingRound = async () => {
    try{
        const response = await apiClient.post("/counselling_details/execute");
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to execute counselling round";
    }
};