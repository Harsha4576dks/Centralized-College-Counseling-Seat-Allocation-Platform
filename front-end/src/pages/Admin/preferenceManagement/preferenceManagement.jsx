import { useEffect, useState } from "react";
import {
    getPreferenceDetails,
    getPreferenceList,
    updatePreferenceDetails,
    deletePreferenceDetails,
} from "../../../services/preferenceService";
import { getErrorMessage } from "../../../utils/errorHandler";
import "./preferenceManagement.css";

export default function PreferenceManagement() {
    const [preferenceData, setPreferenceData] = useState(null);
    const [preferenceList, setPreferenceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        student_id: "",
        college_id: "",
        college_branch_id: "",
        preference_order: "",
    });

    useEffect(() => {
        let isCurrent = true;

        const fetchPreferences = async () => {
            setListLoading(true);
            setError("");
            try {
                const preferences = await getPreferenceList();
                if (isCurrent) {
                    setPreferenceList(preferences);
                }
            } catch (fetchError) {
                if (isCurrent) {
                    setError(getErrorMessage(fetchError));
                }
            } finally {
                if (isCurrent) {
                    setListLoading(false);
                }
            }
        };

        fetchPreferences();
        return () => {
            isCurrent = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const editPreference = (preference) => {
        setPreferenceData(preference);
        setError("");
        setSuccess("");
        setIsEditing(true);
        setFormData({
            student_id: preference.student_id || "",
            college_id: preference.college_id || "",
            college_branch_id: preference.college_branch_id || "",
            preference_order: preference.preference_order || "",
        });
    };

    const showPreference = async (preferenceId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        setIsEditing(false);
        try {
            const preference = await getPreferenceDetails(preferenceId);
            setPreferenceData(preference);
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
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
            const updated = await updatePreferenceDetails(preferenceData.id, payload);
            setPreferenceData(updated);
            setPreferenceList((current) =>
                current.map((preference) => preference.id === updated.id ? updated : preference)
            );
            setSuccess("Preference updated successfully!");
            setIsEditing(false);
        } catch (updateError) {
            setError(getErrorMessage(updateError));
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
            setPreferenceData(null);
            setPreferenceList((current) => current.filter((preference) => preference.id !== id));
            setSuccess("Preference deleted successfully!");
        } catch (deleteError) {
            setError(getErrorMessage(deleteError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="preference-management-container">
            <h3>Preference Database Management</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}

            {isEditing && preferenceData && (
                <form onSubmit={handleUpdateSubmit} className="edit-form preference-record-panel">
                    <h4>Edit Preference (ID: {preferenceData.id})</h4>
                    <div className="form-group">
                        <label>Student ID</label>
                        <input type="number" name="student_id" value={formData.student_id} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>College ID</label>
                        <input type="number" name="college_id" value={formData.college_id} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>College Branch ID</label>
                        <input type="number" name="college_branch_id" value={formData.college_branch_id} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Preference Order</label>
                        <input type="number" name="preference_order" value={formData.preference_order} onChange={handleChange} required />
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
                <div className="preference-details-card preference-record-panel">
                    <h4>Preference Record Found</h4>
                    <p><strong>Preference ID:</strong> {preferenceData.id}</p>
                    <p><strong>Student ID:</strong> {preferenceData.student_id}</p>
                    <p><strong>College ID:</strong> {preferenceData.college_id}</p>
                    <p><strong>College Branch ID:</strong> {preferenceData.college_branch_id}</p>
                    <p><strong>Preference Order:</strong> {preferenceData.preference_order}</p>
                    <div className="card-actions">
                        <button type="button" className="edit-btn" onClick={() => editPreference(preferenceData)}>Edit</button>
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

            <section className="student-directory" aria-labelledby="preference-directory-title">
                <div className="student-directory-heading">
                    <div>
                        <h4 id="preference-directory-title">Registered preferences</h4>
                        <p>View or manage a preference directly from this list.</p>
                    </div>
                    <span className="student-count">
                        {listLoading
                            ? "Loading..."
                            : `${preferenceList.length} ${preferenceList.length === 1 ? "preference" : "preferences"}`}
                    </span>
                </div>

                {listLoading ? (
                    <p className="student-list-status" role="status">Loading preference list...</p>
                ) : preferenceList.length === 0 ? (
                    <p className="student-list-status">No preference records are available.</p>
                ) : (
                    <div className="student-list-scroll">
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th scope="col">Preference ID</th>
                                    <th scope="col">Student ID</th>
                                    <th scope="col">College ID</th>
                                    <th scope="col">Branch ID</th>
                                    <th scope="col">Preference order</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preferenceList.map((preference) => (
                                    <tr key={preference.id}>
                                        <td>{preference.id}</td>
                                        <td>{preference.student_id}</td>
                                        <td>{preference.college_id}</td>
                                        <td>{preference.college_branch_id}</td>
                                        <td>{preference.preference_order}</td>
                                        <td>
                                            <div className="student-row-actions">
                                                <button type="button" className="edit-btn" onClick={() => showPreference(preference.id)} disabled={loading}>
                                                    View
                                                </button>
                                                <button type="button" className="edit-btn" onClick={() => editPreference(preference)} disabled={loading}>
                                                    Edit
                                                </button>
                                                <button type="button" className="delete-btn" onClick={() => handleDelete(preference.id)} disabled={loading}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
