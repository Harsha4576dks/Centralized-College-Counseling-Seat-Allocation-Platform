import apiClient from "../middleware/client";

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


export const getPreferenceDetails = async (id) => {
    try {
        const response = await apiClient.get(`/course_preferences/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail || 'Failed to fetch preferences';
    }
};

export const updatePreferenceDetails = async (preferenceId, preferenceData) => {
    try{
        const preferencePayload = {
            student_id: Number(preferenceData.student_id),
            college_id: Number(preferenceData.college_id),
            college_branch_id: Number(preferenceData.college_branch_id),
            preference_order: Number(preferenceData.preference_order),
        };

        const response = await apiClient.put(`/course_preferences/${preferenceId}`, preferencePayload);
        return response.data;
    }catch(error) {
        throw error.response?.data?.detail || 'Failed to  update student preferences';
    }
};

export const deletePreferenceDetails = async (preferenceId)=> {
    try{
        const response = await apiClient.delete(`/course_preferences/${preferenceId}`);
        return response.data;
    }catch (error) {
        throw error.response?.data?.detail ?? 'Failed to delete student preferences';
    }
};