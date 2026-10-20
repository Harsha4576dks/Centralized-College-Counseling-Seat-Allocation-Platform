import { useState } from "react";
import { executeEmailResponse } from "../services/emailService";
import { getErrorMessage } from "../utils/errorHandler";

export const useEmailResponse = () => {
    const [loading, setLoading ] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [emailResponseData, setEmailResponseData] = useState(null);

    const handleExecute = async(roundId) => {
        if (!roundId) {
            setError("Please enter a counselling round ID.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = await executeEmailResponse(roundId);
            setEmailResponseData(data);
            setSuccess(data.message ?? "Email execution request accepted.");
        } catch (submitError) {
            setError(getErrorMessage(submitError));
        }finally {
            setLoading(false);
        }
    };

    return {
        handleExecute, loading, success, error, emailResponseData
    };
};
