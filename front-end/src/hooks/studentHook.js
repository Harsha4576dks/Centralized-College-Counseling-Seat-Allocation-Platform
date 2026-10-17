import { useState } from "react";
import { saveStudentDetails } from "../services/StudentService";
import { getErrorMessage } from "../utils/errorHandler";

const initialFormData = {
  fullName: "",
  roll_number: "",
  cetRank: "",
  email: "",
  phone: "",
};

export const useStudentDetails = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      await saveStudentDetails(formData);
      setSuccess("Student details saved successfully!");
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, success, error };
};