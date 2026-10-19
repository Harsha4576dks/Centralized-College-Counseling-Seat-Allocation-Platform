import { useState } from "react";
import { savePreferences, getPreferenceDetails,
         updatePreferenceDetails, deletePreferenceDetails} from "../services/preferenceService";
import { getErrorMessage } from "../utils/errorHandler";

export const usePreferenceDetails = (studentId) => {
    const [formData, setFormData] = useState({
        student_id: studentId ? String(studentId) : "",
        college_id: "",
        college_branch_id: "",
        preference_order: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess ] = useState("");
    const [error, setError] = useState("");
    const [preferenceList,  setPreferenceList] = useState([]);

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


    const fetchAllPreferences = async () => {
        setLoading(true);
        setError("");
        try{
            const data = await getPreferenceDetails();
            setPreferenceList(data);
        }catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };



    const handleUpdate = async (preferenceId, event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await updatePreferenceDetails(preferenceId, formData);
            setSuccess("preference details updated successfully");
        }catch (updateError) {
            setError(getErrorMessage(updateError));
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (preferenceId) => {
        if (! window.confirm("Are you sure you want to delete this preference ")) return;
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await deletePreferenceDetails(preferenceId);
            setSuccess("preference record deleted successfully");
            setPreferenceList((prev) => prev.filter((course_preference) => course_preference.id != preferenceId));
        }catch (deleteError) {
            setError(getErrorMessage(deleteError));
        }finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, fetchAllPreferences,
         updatePreferenceDetails, deletePreferenceDetails, 
         handleUpdate, handleDelete, setFormData, preferenceList, loading, success, error };
};