import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      const savedStudent = await saveStudentDetails(formData);
      if (!savedStudent?.id) {
        setError("Student details were saved, but the server did not return a student ID. Please contact support.");
        return;
      }
      navigate("/course-preferences", {
        state: { studentId: savedStudent.id },
      });

    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, success, error };
};