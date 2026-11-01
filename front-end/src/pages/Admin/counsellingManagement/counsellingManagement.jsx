import { useCounsellingRoundDetails } from "../../../hooks/counsellingRoundHook";
import "./counsellingManagement.css";

export default function CounsellingRoundManagement() {
    const {
        handleExecute,
        loading,
        success,
        error,
        allocationData,
    } = useCounsellingRoundDetails();

    return (
        <div className="branch-managemnt-container">
            <h3>Counselling Round Management</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}

            <div className="edit-form">
                <h4>Execute Counselling Round</h4>
                <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "20px" }}>
                    Clicking the button below will trigger the counselling round processing script in the background.
                </p>

                <div className="button-group">
                    <button 
                        type="button" 
                        onClick={handleExecute} 
                        className="save-btn" 
                        disabled={loading}
                    >
                        {loading ? "Executing..." : "Execute in Background"}
                    </button>
                </div>
            </div>

            {allocationData && (
                <section className="counselling-results-panel" aria-labelledby="counselling-results-title">
                    <header className="counselling-results-header">
                        <div>
                            <p className="counselling-results-eyebrow">ROUND SUMMARY</p>
                            <h4 id="counselling-results-title">Seat allocation results</h4>
                            <p>{allocationData.message || "The counselling round has finished processing."}</p>
                        </div>
                        <span className="counselling-results-status">
                            {allocationData.status || "Completed"}
                        </span>
                    </header>

                    <div className="counselling-results-count">
                        <strong>{Array.isArray(allocationData.allocations) ? allocationData.allocations.length : 0}</strong>
                        <span>
                            {Array.isArray(allocationData.allocations) && allocationData.allocations.length === 1
                                ? "seat allocated"
                                : "seats allocated"}
                        </span>
                    </div>

                    {Array.isArray(allocationData.allocations) && allocationData.allocations.length > 0 ? (
                        <div className="counselling-allocation-table-wrap">
                            <table className="counselling-allocation-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Allocation ID</th>
                                        <th scope="col">Student ID</th>
                                        <th scope="col">College branch ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allocationData.allocations.map((allocation) => (
                                        <tr key={allocation.id}>
                                            <td>{allocation.id}</td>
                                            <td>{allocation.student_id}</td>
                                            <td>{allocation.college_branch_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="counselling-no-allocations">No seats were allocated in this round.</p>
                    )}
                </section>
            )}
        </div>
    );
}