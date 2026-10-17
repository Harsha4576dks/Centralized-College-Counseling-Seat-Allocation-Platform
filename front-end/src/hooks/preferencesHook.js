import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { savePreferences } from "../services/preferenceService";
import { getErrorMessage } from "../utils/errorHandler";

const initialFormData = {
    student_id: "",
    college_id: "",
    college_branch_id: "",
    preference_order: "",
};

export const usePreferenceDetails = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess ] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await savePreferences(formData);
            setSuccess("student preferences saved successfully.");

            setTimeout(()=> {
                navigate('/course_preferences')
            }, 1000);

        }catch (submitError) {
            setError(getErrorMessage(submitError));
        }finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, loading, success, error };
};