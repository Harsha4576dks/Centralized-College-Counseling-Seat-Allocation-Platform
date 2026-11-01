import { useState } from "react";
import { getSeatAllocationbyId, getSeatbyStudentName, deleteSeatAllocationDetails } from "../services/seatAllocationService";
import { getErrorMessage } from "../utils/errorHandler";

export const useSeatAllocationDetails = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [allocationData, setAllocationData] = useState(null);


    const handleFetchByAllocationId = async (allocationId) => {
        if (!allocationId) {
            setError("Please enter an Allocation ID.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");
        setAllocationData(null);

        try {
            const data = await getSeatAllocationbyId(allocationId);
            setAllocationData(data);
            setSuccess("Seat allocation details fetched successfully by Allocation ID.");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };



    const handleFetchByStudentName = async (studentName) => {
        const name = studentName.trim();
        if (!name) {
            setError("Please enter a Student Name.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");
        setAllocationData(null);

        try {
            const data = await getSeatbyStudentName(name);
            setAllocationData(data);
            setSuccess("Seat allocation details fetched successfully by Student Name.");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    
    const handleDeleteAllocation = async (allocationId) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await deleteSeatAllocationDetails(allocationId);
            setSuccess("Seat allocation deleted successfully.");
            setAllocationData(null);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return {
        allocationData,
        loading,
        success,
        error,
        handleFetchByAllocationId,
        handleFetchByStudentName,
        handleDeleteAllocation,
    };
};