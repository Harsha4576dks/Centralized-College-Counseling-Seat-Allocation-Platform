import apiClient from "../api/client";


export const saveCollegeBranchDetails = async (collegeBranchData) => {
    try{
        const collegeBranchPayload = {
        college_id: Number(collegeBranchData.college_id),
        branch_name: collegeBranchData.branch_name,
        total_seats: Number(collegeBranchData.total_seats),
        available_seats: Number(collegeBranchData.available_seats),
    };
        const response = await apiClient.post("/branches/", collegeBranchPayload);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to store branch details";
    }
};

export const getBranchbyName = async (collegeName) => {
    try{
        const response = await apiClient.get(`/branches/${collegeName}`);
        return response.data;
    }catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch branch details";
    }
};

export const getBranchbyId = async (collegeBranchId) => {
    try{
        const response = await apiClient.get(`/branches/id/${collegeBranchId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch branch details";
    }
};

export const updateBranchDetails = async (collegeBranchId, collegeBranchData) => {
    try{
        const collegeBranchPayload = {
            college_id: Number(collegeBranchData.college_id),
            branch_name: collegeBranchData.branch_name,
            total_seats: Number(collegeBranchData.total_seats),
            available_seats: Number(collegeBranchData.available_seats),
        };

        const response = await apiClient.put(`/branches/${collegeBranchId}`, collegeBranchPayload);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail || "Failed to update branch details"
    }
};

export const deleteCollegeBranchDetails =async (collegeBranchId) => {
    try{
        const response = await apiClient.delete(`/branches/${collegeBranchId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to delete branch details";
    }
};