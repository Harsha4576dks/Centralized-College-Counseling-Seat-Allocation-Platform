import { useEffect, useState } from "react";
import {
    deleteCollegeBranchDetails,
    getAllCollegeBranchDetails,
    getBranchbyId,
    saveCollegeBranchDetails,
    updateBranchDetails,
} from "../../../services/collegeBranchService";
import { getErrorMessage } from "../../../utils/errorHandler";
import "./collegeBranchManagement.css";

const emptyForm = {
    college_id: "",
    branch_name: "",
    total_seats: "",
    available_seats: "",
};

export default function CollegeBranchManagement() {
    const [branchList, setBranchList] = useState([]);
    const [branchData, setBranchData] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let isCurrent = true;

        const fetchBranches = async () => {
            setListLoading(true);
            setError("");
            try {
                const branches = await getAllCollegeBranchDetails();
                if (isCurrent) {
                    setBranchList(branches);
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

        fetchBranches();
        return () => {
            isCurrent = false;
        };
    }, []);

    useEffect(() => {
        if (!isDrawerOpen) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setIsDrawerOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [isDrawerOpen]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const openCreateDrawer = () => {
        setFormData(emptyForm);
        setIsEditing(false);
        setError("");
        setIsDrawerOpen(true);
    };

    const openEditDrawer = (branch) => {
        setBranchData(branch);
        setFormData({
            college_id: branch.college_id || "",
            branch_name: branch.branch_name || "",
            total_seats: branch.total_seats || "",
            available_seats: branch.available_seats || "",
        });
        setIsEditing(true);
        setError("");
        setIsDrawerOpen(true);
    };

    const showBranch = async (branchId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const branch = await getBranchbyId(branchId);
            setBranchData(branch);
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            if (isEditing) {
                const updated = await updateBranchDetails(branchData.id, formData);
                setBranchData(updated);
                setBranchList((current) =>
                    current.map((branch) => branch.id === updated.id ? updated : branch)
                );
                setSuccess("College branch updated successfully.");
            } else {
                const created = await saveCollegeBranchDetails(formData);
                setBranchList((current) => [...current, created].sort((a, b) => a.id - b.id));
                setBranchData(created);
                setSuccess("College branch registered successfully.");
            }
            setIsDrawerOpen(false);
        } catch (saveError) {
            setError(getErrorMessage(saveError));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (branchId) => {
        if (!window.confirm("Are you sure you want to delete this college branch?")) return;

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deleteCollegeBranchDetails(branchId);
            setBranchList((current) => current.filter((branch) => branch.id !== branchId));
            setBranchData((current) => current?.id === branchId ? null : current);
            setSuccess("College branch deleted successfully.");
        } catch (deleteError) {
            setError(getErrorMessage(deleteError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="branch-management-container">
            <h3>College Branch Database Management</h3>

            {error && <div className="student-error" role="alert">{error}</div>}
            {success && <div className="student-success" role="status">{success}</div>}

            <div className="college-directory-toolbar">
                <p>Add a branch to a college in the counselling directory.</p>
                <button type="button" className="college-create-trigger" onClick={openCreateDrawer}>
                    <span aria-hidden="true">+</span>
                    Register Branch
                </button>
            </div>

            {branchData && (
                <section className="branch-details-card college-record-panel" aria-labelledby="branch-record-title">
                    <h4 id="branch-record-title">Branch Details</h4>
                    <p><strong>Branch ID:</strong> {branchData.id}</p>
                    <p><strong>College ID:</strong> {branchData.college_id}</p>
                    <p><strong>Branch Name:</strong> {branchData.branch_name}</p>
                    <p><strong>Total Seats:</strong> {branchData.total_seats}</p>
                    <p><strong>Available Seats:</strong> {branchData.available_seats}</p>
                    <div className="student-details-actions">
                        <button type="button" className="edit-btn" onClick={() => openEditDrawer(branchData)}>
                            Edit
                        </button>
                        <button type="button" className="delete-btn" onClick={() => handleDelete(branchData.id)} disabled={loading}>
                            Delete
                        </button>
                    </div>
                </section>
            )}

            <section className="student-directory" aria-labelledby="branch-directory-title">
                <div className="student-directory-heading">
                    <div>
                        <h4 id="branch-directory-title">Registered college branches</h4>
                        <p>View, edit, or remove a branch directly from this list.</p>
                    </div>
                    <span className="student-count">
                        {listLoading
                            ? "Loading..."
                            : `${branchList.length} ${branchList.length === 1 ? "branch" : "branches"}`}
                    </span>
                </div>

                {listLoading ? (
                    <p className="student-list-status" role="status">Loading branch list...</p>
                ) : branchList.length === 0 ? (
                    <p className="student-list-status">No college branches are registered yet. Use Register Branch to add one.</p>
                ) : (
                    <div className="student-list-scroll">
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th scope="col">Branch name</th>
                                    <th scope="col">Branch ID</th>
                                    <th scope="col">College ID</th>
                                    <th scope="col">Total seats</th>
                                    <th scope="col">Available seats</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchList.map((branch) => (
                                    <tr key={branch.id}>
                                        <td className="student-name-cell">{branch.branch_name}</td>
                                        <td>{branch.id}</td>
                                        <td>{branch.college_id}</td>
                                        <td>{branch.total_seats}</td>
                                        <td>{branch.available_seats}</td>
                                        <td>
                                            <div className="student-row-actions">
                                                <button type="button" className="edit-btn" onClick={() => showBranch(branch.id)} disabled={loading}>
                                                    View
                                                </button>
                                                <button type="button" className="edit-btn" onClick={() => openEditDrawer(branch)} disabled={loading}>
                                                    Edit
                                                </button>
                                                <button type="button" className="delete-btn" onClick={() => handleDelete(branch.id)} disabled={loading}>
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

            {isDrawerOpen && (
                <div
                    className="college-create-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setIsDrawerOpen(false);
                    }}
                >
                    <aside className="college-create-drawer" role="dialog" aria-modal="true" aria-labelledby="branch-drawer-title">
                        <div className="college-drawer-heading">
                            <div>
                                <p className="college-drawer-eyebrow">COLLEGE DIRECTORY</p>
                                <h4 id="branch-drawer-title">{isEditing ? "Edit college branch" : "Register a college branch"}</h4>
                                <p>{isEditing ? "Update branch and seat details." : "Add a branch and its seat capacity."}</p>
                            </div>
                            <button type="button" className="college-drawer-close" onClick={() => setIsDrawerOpen(false)} aria-label="Close branch form">
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="college-create-form">
                            <label>
                                College ID
                                <input type="number" min="1" name="college_id" value={formData.college_id} onChange={handleChange} required autoFocus />
                            </label>
                            <label>
                                Branch name
                                <input name="branch_name" value={formData.branch_name} onChange={handleChange} required />
                            </label>
                            <label>
                                Total seats
                                <input type="number" min="0" name="total_seats" value={formData.total_seats} onChange={handleChange} required />
                            </label>
                            <label>
                                Available seats
                                <input type="number" min="0" name="available_seats" value={formData.available_seats} onChange={handleChange} required />
                            </label>
                            {error && <div className="student-error" role="alert">{error}</div>}
                            <div className="college-drawer-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsDrawerOpen(false)} disabled={loading}>
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn" disabled={loading}>
                                    {loading ? "Saving..." : isEditing ? "Update Branch" : "Save Branch"}
                                </button>
                            </div>
                        </form>
                    </aside>
                </div>
            )}
        </div>
    );
}
