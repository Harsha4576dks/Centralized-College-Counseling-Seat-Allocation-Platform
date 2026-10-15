import apiClient from "../api/client";

export const saveStudentDetails = async  (studentData) => {
    try{
        const response = await apiClient.post('/students/details', studentData);
        return response.data;
    }catch (error){
        throw error.response?.data?.detail || 'Failed to save student details';
    }
};


export const getStudentDetails = async () => {
    try{
        const response = await apiClient.get('/students/details');
        return response.data;
    }catch (error) {
        throw error.response?.data?.detail || 'Failed to fetch student details';
    }
};