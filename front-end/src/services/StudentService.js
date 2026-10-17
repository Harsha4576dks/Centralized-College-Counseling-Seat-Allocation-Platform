import apiClient from "../api/client";

export const saveStudentDetails = async  (studentData) => {
    try{
        const studentPayload = {
            name: studentData.fullName,
            roll_number: Number(studentData.roll_number),
            email: studentData.email,
            phone: Number(studentData.phone),
            rank: Number(studentData.cetRank),
        };
        const response = await apiClient.post('/students/', studentPayload);
        return response.data;
    }catch (error){
        throw error.response?.data?.detail ?? 'Failed to save student details';
    }
};


export const getStudentDetails = async () => {
    try{
        const response = await apiClient.get('/students');
        return response.data;
    }catch (error) {
        throw error.response?.data?.detail || 'Failed to fetch student details';
    }
};