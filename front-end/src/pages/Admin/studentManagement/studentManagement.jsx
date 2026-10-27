import  { useState } from "react";
import { 
    getStudentbyId, 
    updateStudentDetails, 
    deleteStudentDetails 
} from "../../../services/StudentService";
import { getErrorMessage } from "../../../utils/errorHandler";
import "./studentManagement.css";

export default function StudentManagement() {
    const [searchId, setSearchId] = useState("");
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        roll_number: "",
        cetRank: "",
        email: "",
        phone: "",
    });


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) return;

        setLoading(true);
        setError("");
        setSuccess("");
        setStudentData(null);
        setIsEditing(false);

        try {
            const data = await getStudentbyId(searchId);
            setStudentData(data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };


    const handleEditClick = () => {
        if (!studentData) return;
        setIsEditing(true);
        setFormData({
            fullName: studentData.name || "",
            roll_number: studentData.roll_number || "",
            cetRank: studentData.rank || "",
            email: studentData.email || "",
            phone: studentData.phone || "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                fullName: formData.fullName,
                roll_number: formData.roll_number,
                email: formData.email,
                phone: formData.phone,
                rank: formData.cetRank, 
            };

            await updateStudentDetails(studentData.id, payload);
            setSuccess("Student updated successfully!");
            setIsEditing(false);
            
            const updated = await getStudentbyId(studentData.id);
            setStudentData(updated);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deleteStudentDetails(id);
            setSuccess("Student deleted successfully!");
            setStudentData(null);
            setSearchId("");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-management-container">
            <h3>Student Database Management</h3>

            <form onSubmit={handleSearch} className="search-form" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input 
                    type="number" 
                    placeholder="Enter Student ID..." 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                    required
                    style={{ padding: "9px", width: "240px", border: "1px solid #cbd5e0", borderRadius: "4px" }}
                />
                <button type="submit" className="save-btn" style={{ padding: "9px 16px" }}>Fetch Details</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}

            {isEditing && (
                <form onSubmit={handleUpdateSubmit} className="edit-form">
                    <h4>Edit Student (ID: {studentData.id})</h4>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Roll Number</label>
                        <input type="number" name="roll_number" value={formData.roll_number} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>CET Rank</label>
                        <input type="number" name="cetRank" value={formData.cetRank} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="number" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Updating..." : "Update Student"}
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {studentData && !isEditing && (
                <div className="student-details-card" style={{ background: "#f8fafc", padding: "20px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                    <h4>Student Record Found</h4>
                    <p style={{ margin: "6px 0" }}><strong>ID:</strong> {studentData.id}</p>
                    <p style={{ margin: "6px 0" }}><strong>Name:</strong> {studentData.name}</p>
                    <p style={{ margin: "6px 0" }}><strong>Roll No:</strong> {studentData.roll_number}</p>
                    <p style={{ margin: "6px 0" }}><strong>Rank:</strong> {studentData.rank}</p>
                    <p style={{ margin: "6px 0" }}><strong>Email:</strong> {studentData.email}</p>
                    <p style={{ margin: "6px 0" }}><strong>Phone:</strong> {studentData.phone}</p>

                    <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDelete(studentData.id)}
                            disabled={loading}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}