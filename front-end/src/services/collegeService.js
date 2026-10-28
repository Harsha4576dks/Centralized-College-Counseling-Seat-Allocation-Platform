import apiClient from "../middleware/client";

const createCollegePayload = (collegeData) => ({
    college_name: collegeData.college_name,
    college_address: collegeData.college_address,
    code: Number(collegeData.code),
    email: collegeData.email,
    affiliation: collegeData.affiliation,
});

export const saveCollegeDetails = async (collegeData) => {
    try {
        const response = await apiClient.post("/colleges/", createCollegePayload(collegeData));
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to store college details";
    }
};

export const getCollegeDetailsById = async (collegeId) => {
    try {
        const response = await apiClient.get(`/colleges/${collegeId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch college details";
    }
};


export const deleteCollegeDetails = async (collegeId) => {
    try {
        const response = await apiClient.delete(`/colleges/${collegeId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to delete college details";
    }
};
