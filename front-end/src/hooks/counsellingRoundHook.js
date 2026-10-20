import { useState } from "react";
import { saveCounsellingRoundDetails } from "../services/counsellingRoundService";
import { getErrorMessage } from "../utils/errorHandler";

export const useCounsellingRoundDetails = () => {
    const [formData, setFormData] = useState({
        round_Number: "",
        status: "",
        start_date: "",
        end_date: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError]  = useState("");

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

        try {
            await saveCounsellingRoundDetails(formData);
            setSuccess("counselling round details saved successfully");
            setFormData({
                round_Number: "",
                status: "",
                start_date: "",
                end_date: "",
            });
        } catch (submitError) {
            setError(getErrorMessage(submitError));
        } finally {
            setLoading(false);
        }
    };

    return {
        formData, setFormData, handleChange, handleSubmit, loading, success, error
    }
}