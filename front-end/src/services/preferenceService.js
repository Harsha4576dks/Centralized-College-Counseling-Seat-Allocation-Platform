import apiClient from "../api/client";

export const savePreferences = async (preferenceData) => {
    try{
        const preferencePayload = {
            student_id: Number(preferenceData.student_id),
            college_id: Number(preferenceData.college_id),
            college_branch_id:Number(preferenceData.college_branch_id),
            preference_order: Number(preferenceData.preference_order),
        };
        const response = await apiClient.post('/course_preferences/', preferencePayload);
        return response.data;
    }catch (error){
        throw error.response?.data?.detail ?? 'Failed to store student preferences';
    }
};

