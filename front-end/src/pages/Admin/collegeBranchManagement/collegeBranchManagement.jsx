import { useState } from "react";
import { useCollegeBranchDetails } from "../../../hooks/collegeBranchHook";
import "./collegeBranchManagement.css";

export default function CollegeBranchManagement() {
    const {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        fetchBranchById,
        handleUpdate,
        handleDelete,
        branchData,
        setBranchData,
        loading,
        success,
        error: hookError,
    } = useCollegeBranchDetails();

    const [searchId, setSearchId] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId) return;

        setSearchError("");
        setBranchData(null);
        setIsEditing(false);

        const data = await fetchBranchById(searchId);
        if (!data) {
            setSearchError("College branch not found.");
        }
    };


    const handleEditClick = () => {
        if (!branchData) return;
        setIsEditing(true);
        setFormData({
            college_id: branchData.college_id || "",
            branch_name: branchData.branch_name || "",
            total_seats: branchData.total_seats || "",
            available_seats: branchData.available_seats || "",
        });
    };


    const onSubmitAction = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await handleUpdate(branchData.id, e);
            setIsEditing(false);
        } else {
            await handleSubmit(e);
            setFormData({
                college_id: "",
                branch_name: "",
                total_seats: "",
                available_seats: "",
            });
        }
    };

    return (
        <div className="branch-management-container">
            <h3>College Branch Database Management</h3>


            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="number" 
                    placeholder="Enter Branch ID to Search..." 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                    className="search-input"
                />
                <button type="submit" className="search-btn">
                    Search Branch
                </button>
            </form>

            {searchError && <div className="student-error">{searchError}</div>}
            {hookError && <div className="student-error">{hookError}</div>}
            {success && <div className="student-success">{success}</div>}


            <form onSubmit={onSubmitAction} className="edit-form">
                <h4>{isEditing ? `Edit Branch (ID: ${branchData?.id})` : "Register New College Branch"}</h4>
                
                <div className="form-group">
                    <label>College ID</label>
                    <input type="number" 
                    name="college_id" 
                    value={formData.college_id} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label>Branch Name</label>
                    <input type="text" 
                    name="branch_name" 
                    value={formData.branch_name} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label>Total Seats</label>
                    <input type="number" 
                    name="total_seats" 
                    value={formData.total_seats} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label>Available Seats</label>
                    <input type="number" 
                    name="available_seats" 
                    value={formData.available_seats} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>

                <div className="button-group">
                    <button type="submit" 
                    className="save-btn" disabled={loading}>
                        {loading ? "Processing..." : isEditing ? "Update Branch" : "Save Branch"}
                    </button>
                    {isEditing && (
                        <button type="button" 
                        className="cancel-btn" 
                        onClick={() => { setIsEditing(false); setBranchData(null); }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>


            {branchData && !isEditing && (
                <div className="branch-details-card">
                    <h4>Branch Record Found</h4>
                    <p><strong>ID:</strong> {branchData.id}</p>
                    <p><strong>College ID:</strong> {branchData.college_id}</p>
                    <p><strong>Branch Name:</strong> {branchData.branch_name}</p>
                    <p><strong>Total Seats:</strong> {branchData.total_seats}</p>
                    <p><strong>Available Seats:</strong> {branchData.available_seats}</p>

                    <div className="card-actions">
                        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={async () => {
                                await handleDelete(branchData.id);
                                setSearchId("");
                            }}
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