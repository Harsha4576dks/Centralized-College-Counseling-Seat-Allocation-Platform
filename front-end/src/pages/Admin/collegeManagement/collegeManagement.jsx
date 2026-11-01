import { useEffect, useState } from "react";
import {
    deleteCollegeDetails,
    getAllCollegeDetails,
    getCollegeDetailsById,
    saveCollegeDetails,
} from "../../../services/collegeService";
import { getErrorMessage } from "../../../utils/errorHandler";
import "./collegeManagement.css";

const emptyForm = {
    college_name: "",
    college_address: "",
    code: "",
    email: "",
    affiliation: "",
};

export default function CollegeManagement() {
    const [collegeList, setCollegeList] = useState([]);
    const [collegeData, setCollegeData] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let isCurrent = true;

        const fetchColleges = async () => {
            setListLoading(true);
            setError("");
            try {
                const colleges = await getAllCollegeDetails();
                if (isCurrent) {
                    setCollegeList(colleges);
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

        fetchColleges();
        return () => {
            isCurrent = false;
        };
    }, []);

    useEffect(() => {
        if (!isCreateOpen) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setIsCreateOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [isCreateOpen]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const college = await saveCollegeDetails(formData);
            setCollegeList((current) => [...current, college].sort((a, b) => a.id - b.id));
            setCollegeData(college);
            setFormData(emptyForm);
            setIsCreateOpen(false);
            setSuccess("College registered successfully.");
        } catch (createError) {
            setError(getErrorMessage(createError));
        } finally {
            setLoading(false);
        }
    };

    const showCollege = async (collegeId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const college = await getCollegeDetailsById(collegeId);
            setCollegeData(college);
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (collegeId) => {
        if (!window.confirm("Are you sure you want to delete this college?")) return;

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deleteCollegeDetails(collegeId);
            setCollegeList((current) => current.filter((college) => college.id !== collegeId));
            setCollegeData((current) => current?.id === collegeId ? null : current);
            setSuccess("College deleted successfully.");
        } catch (deleteError) {
            setError(getErrorMessage(deleteError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="college-management-container">
            <h3>College Database Management</h3>

            {error && <div className="student-error" role="alert">{error}</div>}
            {success && <div className="student-success" role="status">{success}</div>}

            <div className="college-directory-toolbar">
                <p>Add a college to the counselling directory.</p>
                <button
                    type="button"
                    className="college-create-trigger"
                    onClick={() => {
                        setError("");
                        setIsCreateOpen(true);
                    }}
                >
                    <span aria-hidden="true">+</span>
                    Register College
                </button>
            </div>

            {collegeData && (
                <section className="college-details-card college-record-panel" aria-labelledby="college-record-title">
                    <h4 id="college-record-title">College Details</h4>
                    <p><strong>College ID:</strong> {collegeData.id}</p>
                    <p><strong>Name:</strong> {collegeData.college_name}</p>
                    <p><strong>Code:</strong> {collegeData.code}</p>
                    <p><strong>Address:</strong> {collegeData.college_address}</p>
                    <p><strong>Email:</strong> {collegeData.email}</p>
                    <p><strong>Affiliation:</strong> {collegeData.affiliation}</p>
                </section>
            )}

            <section className="student-directory" aria-labelledby="college-directory-title">
                <div className="student-directory-heading">
                    <div>
                        <h4 id="college-directory-title">Registered colleges</h4>
                        <p>View college details or remove a college from the directory.</p>
                    </div>
                    <span className="student-count">
                        {listLoading
                            ? "Loading..."
                            : `${collegeList.length} ${collegeList.length === 1 ? "college" : "colleges"}`}
                    </span>
                </div>

                {listLoading ? (
                    <p className="student-list-status" role="status">Loading college list...</p>
                ) : collegeList.length === 0 ? (
                    <p className="student-list-status">No colleges are registered yet. Use Register College to add one.</p>
                ) : (
                    <div className="student-list-scroll">
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">College ID</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Affiliation</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collegeList.map((college) => (
                                    <tr key={college.id}>
                                        <td className="student-name-cell">{college.college_name}</td>
                                        <td>{college.id}</td>
                                        <td>{college.code}</td>
                                        <td>{college.affiliation}</td>
                                        <td>
                                            <div className="student-row-actions">
                                                <button
                                                    type="button"
                                                    className="edit-btn"
                                                    onClick={() => showCollege(college.id)}
                                                    disabled={loading}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(college.id)}
                                                    disabled={loading}
                                                >
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

            {isCreateOpen && (
                <div
                    className="college-create-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setIsCreateOpen(false);
                    }}
                >
                    <aside
                        className="college-create-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="create-college-title"
                    >
                        <div className="college-drawer-heading">
                            <div>
                                <p className="college-drawer-eyebrow">COLLEGE DIRECTORY</p>
                                <h4 id="create-college-title">Register a college</h4>
                                <p>Enter the institution details to add it to counselling.</p>
                            </div>
                            <button
                                type="button"
                                className="college-drawer-close"
                                onClick={() => setIsCreateOpen(false)}
                                aria-label="Close college form"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="college-create-form">
                            <label>
                                College name
                                <input name="college_name" value={formData.college_name} onChange={handleChange} required autoFocus />
                            </label>
                            <label>
                                College address
                                <input name="college_address" value={formData.college_address} onChange={handleChange} required />
                            </label>
                            <label>
                                College code
                                <input name="code" value={formData.code} onChange={handleChange} inputMode="numeric" pattern="[0-9]+" required />
                            </label>
                            <label>
                                Email
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </label>
                            <label>
                                Affiliation
                                <input name="affiliation" value={formData.affiliation} onChange={handleChange} required />
                            </label>
                            {error && <div className="student-error" role="alert">{error}</div>}
                            <div className="college-drawer-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsCreateOpen(false)} disabled={loading}>
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn" disabled={loading}>
                                    {loading ? "Saving..." : "Save College"}
                                </button>
                            </div>
                        </form>
                    </aside>
                </div>
            )}
        </div>
    );
}
