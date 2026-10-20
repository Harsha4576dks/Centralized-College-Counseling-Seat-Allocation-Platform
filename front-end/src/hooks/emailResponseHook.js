import { useState } from "react";
import { executeEmailResponse } from "../services/emailService";
import { getErrorMessage } from "../utils/errorHandler";

export const useEmailResponse = () => {
    const [loading, setLoading ] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [emailData, emailResponseData] = useState(null);

    const handleExecute = async() => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = await executeEmailResponse();
            emailResponseData(data);
            setSuccess("email response execution triggered successfully");
        } catch (submitError) {
            setError(getErrorMessage(submitError));
        }finally {
            setLoading(false);
        }
    };

    return {
        handleExecute, loading, success, error, emailData
    };
};