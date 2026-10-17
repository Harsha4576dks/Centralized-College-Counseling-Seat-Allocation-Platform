import { useState } from "react";
import { useLocation } from "react-router-dom";
import { savePreferences } from "../services/preferenceService";
import { getErrorMessage } from "../utils/errorHandler";

export const usePreferenceDetails = () => {
    const location = useLocation();
    const studentId = location.state?.studentId;
    const [formData, setFormData] = useState({
        student_id: studentId ? String(studentId) : "",
        college_id: "",
        college_branch_id: "",
        preference_order: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess ] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.student_id) {
            setError("Enter a student ID before saving preferences.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await savePreferences(formData);
            setSuccess("student preferences saved successfully.");
        }catch (submitError) {
            setError(getErrorMessage(submitError));
        }finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, loading, success, error };
};