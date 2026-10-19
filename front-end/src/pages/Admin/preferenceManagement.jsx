import { useState } from "react";
import { 
    getPreferenceDetails, 
    updatePreferenceDetails, 
    deletePreferenceDetails 
} from "../../services/preferenceService";
import { getErrorMessage } from "../../utils/errorHandler";
import "../../styles/preferenceManagement.css";

export default function PreferenceManagement() {
    const [searchId, setSearchId] = useState("");
    const [preferenceData, setPreferenceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        student_id: "",
        college_id: "",
        college_branch_id: "",
        preference_order: "",
    });

    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) return;

        setLoading(true);
        setError("");
        setSuccess("");
        setPreferenceData(null);
        setIsEditing(false);

        try {
            const data = await getPreferenceDetails(searchId);
            setPreferenceData(data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };


    const handleEditClick = () => {
        if (!preferenceData) return;
        setIsEditing(true);
        setFormData({
            student_id: preferenceData.student_id || "",
            college_id: preferenceData.college_id || "",
            college_branch_id: preferenceData.college_branch_id || "",
            preference_order: preferenceData.preference_order || "",
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
                student_id: Number(formData.student_id),
                college_id: Number(formData.college_id),
                college_branch_id: Number(formData.college_branch_id),
                preference_order: Number(formData.preference_order),
            };

            await updatePreferenceDetails(preferenceData.id, payload);
            setSuccess("Preference updated successfully!");
            setIsEditing(false);
            

            const updated = await getPreferenceDetails(preferenceData.id);
            setPreferenceData(updated);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this preference?")) return;

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deletePreferenceDetails(id);
            setSuccess("Preference deleted successfully!");
            setPreferenceData(null);
            setSearchId("");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="preference-management-container">
            <h3>Preference Database Management</h3>


            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="number" 
                    placeholder="Enter Preference ID..." 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                    required
                    className="search-input"
                />
                <button type="submit" className="fetch-btn">
                    Fetch Preference
                </button>
            </form>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}


            {isEditing && (
                <form onSubmit={handleUpdateSubmit} className="edit-form">
                    <h4>Edit Preference (ID: {preferenceData.id})</h4>
                    
                    <div className="form-group">
                        <label>Student ID</label>
                        <input type="number" name="student_id" value={formData.student_id} onChange={handleChange} required className="form-input" />
                    </div>
                    
                    <div className="form-group">
                        <label>College ID</label>
                        <input type="number" name="college_id" value={formData.college_id} onChange={handleChange} required className="form-input" />
                    </div>
                    
                    <div className="form-group">
                        <label>College Branch ID</label>
                        <input type="number" name="college_branch_id" value={formData.college_branch_id} onChange={handleChange} required className="form-input" />
                    </div>
                    
                    <div className="form-group">
                        <label>Preference Order</label>
                        <input type="number" name="preference_order" value={formData.preference_order} onChange={handleChange} required className="form-input" />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Updating..." : "Update Preference"}
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {preferenceData && !isEditing && (
                <div className="preference-details-card">
                    <h4>Preference Record Found</h4>
                    <p><strong>Preference ID:</strong> {preferenceData.id}</p>
                    <p><strong>Student ID:</strong> {preferenceData.student_id}</p>
                    <p><strong>College ID:</strong> {preferenceData.college_id}</p>
                    <p><strong>College Branch ID:</strong> {preferenceData.college_branch_id}</p>
                    <p><strong>Preference Order:</strong> {preferenceData.preference_order}</p>

                    <div className="card-actions">
                        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDelete(preferenceData.id)}
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