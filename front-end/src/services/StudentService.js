import apiClient from "../middleware/client";

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

export const getStudentbyId = async (studentId) => {
    try{
        const response = await apiClient.get(`/students/${studentId}`);
        return response.data;
    }catch (error) {
        throw error.response?.data?.detail || 'Failed to fetch student details';
    }
};

export const updateStudentDetails = async (studentId, studentData) => {
    try {
         const studentPayload = {
            name: studentData.name ?? studentData.fullName,
            roll_number: Number(studentData.roll_number),
            email: studentData.email,
            phone: Number(studentData.phone),
            rank: Number(studentData.rank ?? studentData.cetRank),
         };

         const response = await apiClient.put(`/students/${studentId}`, studentPayload);
         return response.data;
    }catch (error) {
    throw error.response?.data?.detail ?? 'Failed to update student details';
}
}

export const deleteStudentDetails = async (studentId) => {
    try{
        const response = await apiClient.delete(`/students/${studentId}`);
        return response.data;
    }catch (error) {
        throw error.response?.data?.detail ?? 'Failed to delete student record';
    }
};