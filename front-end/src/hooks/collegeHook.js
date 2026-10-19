import { useState } from "react";
import { saveCollegeDetails, getCollegeDetailsById, deleteCollegeDetails } from "../services/collegeService";
import { getErrorMessage } from "../utils/errorHandler";


export const useCollegeDetails = () => {
    const [formData, setFormData] = useState({
        college_name: "",
        college_address: "",
        code: "",
        email: "",
        affiliation: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] =  useState("");
    const [error, setError] = useState("");
    const [collegeList, setCollegeList] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };


    const handleSubmit =async (event)  => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            const college = await saveCollegeDetails(formData);
            setCollegeList((previousColleges) => [...previousColleges, college]);
            setSuccess("college details saved successfully");
            return true;
        } catch (submitError)  {
            setError(getErrorMessage(submitError));
            return false;
        } finally {
            setLoading(false);
        }
    };


    const fetchCollegeById = async (collegeId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try{
            const college = await getCollegeDetailsById(collegeId);
            setCollegeList([college]);
        } catch (fetchError) {
            setCollegeList([]);
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };

    

    const handleDelete = async (collegeId) => {
        if (! window.confirm("Are you sure you want to delete this record")) return;
        setLoading(true);
        setError("");
        setSuccess("");

        try{
            await deleteCollegeDetails(collegeId);
            setSuccess("college record deleted successfully");
            setCollegeList((prev) => prev.filter((collegeDetails) => collegeDetails.id != collegeId));
        }catch (deleteError) {
            setError(getErrorMessage(deleteError));
        } finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, fetchCollegeById,
            deleteCollegeDetails,
            handleDelete, setFormData, collegeList,
            loading, success, error  }
};