import apiClient from "../middleware/client";
import { getStudentDetails } from "./StudentService";


export const getSeatAllocationbyId =async (allocationId) => {
            try{
                const response = await apiClient.get(`/seat_allocations/${allocationId}`);
                return response.data;
            }catch (error) {
                throw error.response?.data?.detail ?? "Failed to fetch seat allocation";
            }
        };

export const getSeatbyStudentName = async (studentName, studentId) => {
    try{
        const students = await getStudentDetails();
        const normalizedName = studentName.trim().toLocaleLowerCase();
        const matchingStudents = students.filter(
            (student) => student.name?.trim().toLocaleLowerCase() === normalizedName
        );
        const student = studentId
            ? matchingStudents.find((match) => match.id === studentId)
            : matchingStudents.length === 1 ? matchingStudents[0] : null;

        if (!student && matchingStudents.length > 1) {
            throw "More than one student has this name. Select the correct student from the suggestions.";
        }
        if (!student) {
            throw matchingStudents.length === 0
                ? "No student found with this name."
                : "Select the student from the suggestions to view their allocation.";
        }

        return await getSeatbyStudentId(student.id);
     } catch (error) {
        throw error.response?.data?.detail ?? error;
     }
};

export const getSeatbyStudentId = async (studentId) => {
    try {
        const response = await apiClient.get(`/seat_allocations/search/student/${studentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail ?? "Failed to fetch seat allocation details by student";
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
