import { useState } from "react";
import { useSeatAllocationDetails } from "../../hooks/seatAllocationHook";
import "../../styles/seatAllocationManagement.css";

export default function SeatAllocationManagement() {
    const {
        allocationData,
        loading,
        success,
        error,
        handleFetchByAllocationId,
        handleFetchByStudentId,
        handleDeleteAllocation,
    } = useSeatAllocationDetails();

    const [allocationIdInput, setAllocationIdInput] = useState("");
    const [studentIdInput, setStudentIdInput] = useState("");

    const onSearchByAllocationId = (e) => {
        e.preventDefault();
        handleFetchByAllocationId(allocationIdInput);
    };

    const onSearchByStudentId = (e) => {
        e.preventDefault();
        handleFetchByStudentId(studentIdInput);
    };

    return (
        <div className="branch-managemnt-container">
            <h3>Seat Allocation Management</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}


            <div className="search-sections-wrapper">
                <form onSubmit={onSearchByAllocationId} className="edit-form search-box">
                    <h4>Search by Allocation ID</h4>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={allocationIdInput} 
                            onChange={(e) => setAllocationIdInput(e.target.value)} 
                            placeholder="Enter Allocation ID..."
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Searching..." : "Fetch by Allocation ID"}
                        </button>
                    </div>
                </form>


                <form onSubmit={onSearchByStudentId} className="edit-form search-box">
                    <h4>Search by Student ID</h4>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={studentIdInput} 
                            onChange={(e) => setStudentIdInput(e.target.value)} 
                            placeholder="Enter Student ID..."
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Searching..." : "Fetch by Student ID"}
                        </button>
                    </div>
                </form>
            </div>


            {allocationData && (
                <div className="edit-form results-panel" style={{ marginTop: "20px" }}>
                    <h4>Allocation Details</h4>
                    <div className="allocation-results-box">
                        <pre style={{ background: "#edf2f7", padding: "12px", borderRadius: "4px", fontSize: "13px", overflowX: "auto" }}>
                            {JSON.stringify(allocationData, null, 2)}
                        </pre>
                        
                        {allocationData.id && (
                            <div className="button-group" style={{ marginTop: "15px" }}>
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteAllocation(allocationData.id)} 
                                    className="delete-btn"
                                    disabled={loading}
                                >
                                    Delete Allocation
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}