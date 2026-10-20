import { useEmailResponse } from "../../hooks/emailResponseHook";
import "../../styles/emailManagement.css";

export default function EmailManagement() {
    const {
        handleExecute,
        loading,
        success,
        error,
        emailResponseData,
    } = useEmailResponse();

    return (
        <div className="branch-management-container">
            <h3>Email Execution</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}

            <div className="edit-form">
                <h4>Execute Email Response</h4>
                <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "20px" }}>
                    Clicking the button below will trigger the email response script in the background.
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

           {emailResponseData && (
                <div className="edit-form" style={{ marginTop: "20px" }}>
                    <h4>Seat Allocation Results</h4>
                    <div className="allocation-results-box">
                        <p><strong>Status:</strong> Completed successfully</p>
                        <pre style={{ background: "#edf2f7", padding: "10px", borderRadius: "4px", fontSize: "13px" }}>
                            {JSON.stringify(emailResponseData, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    )
}