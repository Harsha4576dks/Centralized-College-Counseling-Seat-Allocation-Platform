import apiClient from "../api/client";

export const saveCounsellingRoundDetails = async (counsellingRoundData) => {
    try{
        const counsellingRoundPayload = {
            round_Number: Number(counsellingRoundData.round_Number),
            status: counsellingRoundData.status,
            start_date: counsellingRoundData.start_date,
            end_date: counsellingRoundData.end_date,
        };

        const response = await apiClient.post("/counselling_details/", counsellingRoundPayload);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch branch details";
    }
};