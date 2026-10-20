import apiClient from "../api/client";


export const getSeatAllocationbyId =async (allocationId) => {
            try{
                const response = await apiClient.get(`/seat_allocations/${allocationId}`);
                return response.data;
            }catch (error) {
                throw error.response?.data?.detail ?? "Failed to fetch seat allocation";
            }
        };

export const getSeatbyStudentId = async (studentId) => {
    try{
        const response = await apiClient.get(`/seat_allocations/search/student/${studentId}`);
        return response.data;
     } catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch seat allocation details by student ID";
     }
};

export const deleteSeatAllocationDetails = async (allocationId) => {
    try{
        const response = await apiClient.delete(`/seat_allocations/${allocationId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to  delete seat allocation details";
    }
};
