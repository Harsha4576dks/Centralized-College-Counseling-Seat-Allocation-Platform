import { useCounsellingRoundDetails } from "../../hooks/counsellingRoundHook";
import "../../styles/counsellingRoundManagement.css";

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
                <div className="edit-form" style={{ marginTop: "20px" }}>
                    <h4>Seat Allocation Results</h4>
                    <div className="allocation-results-box">
                        <p><strong>Status:</strong> Completed successfully</p>
                        <pre style={{ background: "#edf2f7", padding: "10px", borderRadius: "4px", fontSize: "13px" }}>
                            {JSON.stringify(allocationData, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}