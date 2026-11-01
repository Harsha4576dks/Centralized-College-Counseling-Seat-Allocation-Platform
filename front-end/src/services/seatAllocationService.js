import apiClient from "../middleware/client";


export const getSeatAllocationbyId =async (allocationId) => {
            try{
                const response = await apiClient.get(`/seat_allocations/${allocationId}`);
                return response.data;
            }catch (error) {
                throw error.response?.data?.detail ?? "Failed to fetch seat allocation";
            }
        };

export const getSeatbyStudentName = async (studentName) => {
    try{
        const response = await apiClient.get("/seat_allocations/search/student-name", {
            params: { student_name: studentName },
        });
        return response.data;
     } catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch seat allocation details by student name";
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
