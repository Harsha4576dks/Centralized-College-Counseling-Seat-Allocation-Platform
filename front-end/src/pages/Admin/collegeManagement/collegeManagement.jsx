import { useState } from "react";
import { useCollegeDetails } from "../../../hooks/collegeHook";
import "./collegeManagement.css";

export default function CollegeManagement() {
    const {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        handleDelete,
        fetchCollegeById,
        collegeList,
        loading,
        success,
        error: hookError,
    } = useCollegeDetails();

    const [searchId, setSearchId] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const onSubmit = async (event) => {
        const saved = await handleSubmit(event);
        if (saved) {
            setFormData({
                college_name: "",
                college_address: "",
                code: "",
                email: "",
                affiliation: "",
            });
        }
    };

    const onSearch = async (event) => {
        event.preventDefault();
        setHasSearched(true);
        await fetchCollegeById(Number(searchId));
    };

    return (
        <div className="college-management-container">
            <h3>College Database Management</h3>

            {hookError && <div className="student-error">{hookError}</div>}
            {success && <div className="student-success">{success}</div>}

            <form onSubmit={onSubmit} className="edit-form">
                <h4>Register New College</h4>
                
                <div className="form-group">
                    <label>College Name</label>
                    <input type="text" 
                    name="college_name" 
                    value={formData.college_name} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label>College Address</label>
                    <input type="text" 
                    name="college_address" 
                    value={formData.college_address} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label>College Code</label>
                    <input type="text" 
                    name="code" 
                    value={formData.code} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                     name="email" 
                     value={formData.email} 
                     onChange={handleChange} 
                     required className="form-input" />
                </div>

                <div className="form-group">
                    <label>Affiliation</label>
                    <input type="text" 
                    name="affiliation" 
                    value={formData.affiliation} 
                    onChange={handleChange} 
                    required className="form-input" />
                </div>

                <div className="button-group">
                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? "Saving..." : "Save College"}
                    </button>
                </div>
            </form>

            <form onSubmit={onSearch} className="search-form">
                <input
                    type="number"
                    min="1"
                    placeholder="Enter College ID..."
                    value={searchId}
                    onChange={(event) => setSearchId(event.target.value)}
                    required
                    className="search-input"
                />
                <button type="submit" className="search-btn" disabled={loading}>
                    Fetch College
                </button>
            </form>

            <section className="college-list">
                <h4>College Details</h4>
                {loading && <p>Loading college...</p>}
                {!loading && hasSearched && collegeList.length === 0 && <p>No college found.</p>}
                {collegeList.map((college) => (
                    <div className="college-details-card" key={college.id}>
                        <p><strong>ID:</strong> {college.id}</p>
                        <p><strong>Name:</strong> {college.college_name}</p>
                        <p><strong>Code:</strong> {college.code}</p>
                        <p><strong>Address:</strong> {college.college_address}</p>
                        <p><strong>Email:</strong> {college.email}</p>
                        <p><strong>Affiliation:</strong> {college.affiliation}</p>

                        <div className="card-actions">
                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDelete(college.id)}
                                disabled={loading}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}