import { useState } from "react";
import { executeCounsellingRound } from "../services/counsellingRoundService";
import { getErrorMessage } from "../utils/errorHandler";

export const useCounsellingRoundDetails = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError]  = useState("");
    const [allocationData, seatAllocationData] = useState(null);

    const handleExecute = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = await executeCounsellingRound();
            seatAllocationData(data);
            setSuccess("counselling round execution triggered successfully");
            
        } catch (submitError) {
            setError(getErrorMessage(submitError));
        } finally {
            setLoading(false);
        }
    };

    return {
               handleExecute, loading, success, error, allocationData
    };
};