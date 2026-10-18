import { useState } from "react";
import { saveStudentDetails, getStudentDetails, getStudentbyId,
         updateStudentDetails,  deleteStudentDetails } from "../services/StudentService";
import { getErrorMessage } from "../utils/errorHandler";

const initialFormData = {
  fullName: "",
  roll_number: "",
  cetRank: "",
  email: "",
  phone: "",
};

export const useStudentDetails = (onStudentSaved) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
      onStudentSaved?.(savedStudent.id);

    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };


  const fetchAllStudents = async () => {
    setLoading(true);
    setError("");
    try{
      const data = await getStudentDetails();
      setStudentList(data);
    }catch (fetchError) {
      setError(getErrorMessage(fetchError));
    } finally {
      setLoading(false);
    }
  };


  const fetchStudentbyID = async (studentId) => {
    setLoading(true);
    setError("");
    try {
      const data = await getStudentbyId(studentId);
      setSelectedStudent(data);
    } catch (fetchError){
      setError(getErrorMessage(fetchError));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (studentId, event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try{
      await updateStudentDetails(studentId, formData);
      setSuccess("Student details updated successffully");
    } catch (updateError) {
      setError(getErrorMessage(updateError));
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (studentId) => {
    if (! window.confirm("Are you sure you want to delete this student record ?")) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await deleteStudentDetails(studentId);
      setSuccess("Student record deleted succesfully");
      setStudentList((prev) => prev.filter((student) => student.id != studentId));
    }catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setLoading(false);
    }
  };


  return { formData, handleChange, handleSubmit, loading, success, 
    error, setFormData, studentList, selectedStudent, fetchAllStudents,
  fetchStudentbyID, handleUpdate, handleDelete };
};