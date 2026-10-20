import { useState } from "react";
import { getSeatAllocationbyId, getSeatbyStudentId, deleteSeatAllocationDetails } from "../services/seatAllocationService";
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



    const handleFetchByStudentId = async (studentId) => {
        if (!studentId) {
            setError("Please enter a Student ID.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");
        setAllocationData(null);

        try {
            const data = await getSeatbyStudentId(studentId);
            setAllocationData(data);
            setSuccess("Seat allocation details fetched successfully by Student ID.");
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
        handleFetchByStudentId,
        handleDeleteAllocation,
    };
};