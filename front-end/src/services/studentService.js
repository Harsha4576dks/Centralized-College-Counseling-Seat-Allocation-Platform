import apiClient from "../api/client";

export const getStudentDetails = async (studentId) => {
    const response = await apiClient.get(`/students/${studentId}`);
    return response.data;
};

export const getStudentPreferences = async (studentId) => {
    const response = await apiClient.get(`/students/${studentId}/preferences`);
    return response.data;
};

export const updateStudentPreferences = async (studentId, preferences) => {
    const response = await apiClient.put(`/students/${studentId}/preferences`, preferences);
    return response.data;
};
