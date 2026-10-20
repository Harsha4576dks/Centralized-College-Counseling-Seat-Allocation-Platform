import { useState } from "react";
import { 
    saveCollegeBranchDetails, 
    getBranchbyId, 
    getBranchbyName, 
    updateBranchDetails, 
    deleteCollegeBranchDetails 
} from "../services/collegeBranchService"; 
import { getErrorMessage } from "../utils/errorHandler";

export const useCollegeBranchDetails = () => {
    const [formData, setFormData] = useState({
        college_id: "",
        branch_name: "",
        total_seats: "",
        available_seats: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [branchData, setBranchData] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
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
            await saveCollegeBranchDetails(formData);
            setSuccess("College branch details saved successfully.");
            setFormData({
                college_id: "",
                branch_name: "",
                total_seats: "",
                available_seats: "",
            });
        } catch (submitError) {
            setError(getErrorMessage(submitError));
        } finally {
            setLoading(false);
        }
    };


    const fetchBranchById = async (branchId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        setBranchData(null);

        try {
            const data = await getBranchbyId(branchId);
            setBranchData(data);
            return data;
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };


    const fetchBranchByName = async (branchName) => {
        setLoading(true);
        setError("");
        setSuccess("");
        setBranchData(null);

        try {
            const data = await getBranchbyName(branchName);
            setBranchData(data);
            return data;
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };


    const handleUpdate = async (branchId, event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await updateBranchDetails(branchId, formData);
            setSuccess("College branch details updated successfully.");
            
            const updated = await getBranchbyId(branchId);
            setBranchData(updated);
        } catch (updateError) {
            setError(getErrorMessage(updateError));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (branchId) => {
        if (!window.confirm("Are you sure you want to delete this college branch record?")) return;
        
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await deleteCollegeBranchDetails(branchId);
            setSuccess("College branch record deleted successfully.");
            setBranchData(null);
        } catch (deleteError) {
            setError(getErrorMessage(deleteError));
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        fetchBranchById,
        fetchBranchByName,
        handleUpdate,
        handleDelete,
        branchData,
        setBranchData,
        loading,
        success,
        error
    };
};