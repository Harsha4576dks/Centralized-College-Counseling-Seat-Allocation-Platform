import { useState } from "react";
import { useEmailResponse } from "../../../hooks/emailResponseHook";
import "./emailManagement.css";

export default function EmailManagement() {
    const [roundId, setRoundId] = useState("");
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

            <form
                className="edit-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleExecute(roundId);
                }}
            >
                <h4>Execute Email Response</h4>
                <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "20px" }}>
                    Enter the counselling round ID to send allotment emails in the background.
                </p>

                <div className="form-group">
                    <label htmlFor="email-round-id">Counselling Round ID</label>
                    <input
                        id="email-round-id"
                        type="number"
                        min="1"
                        value={roundId}
                        onChange={(event) => setRoundId(event.target.value)}
                        placeholder="Enter counselling round ID..."
                        className="form-input"
                        required
                    />
                </div>

            <div className="button-group">
                <button
                type="submit"
                className="save-btn"
                disabled={loading}
                >
                {loading ? "Submitting..." : "Send Allotment Emails"}
                </button>
            </div>

            </form>

           {emailResponseData && (
                <div className="edit-form" style={{ marginTop: "20px" }}>
                    <h4>Email Execution Request</h4>
                    <div className="allocation-results-box">
                        <p><strong>Status:</strong> {emailResponseData.status}</p>
                        <pre style={{ background: "#edf2f7", padding: "10px", borderRadius: "4px", fontSize: "13px" }}>
                            {JSON.stringify(emailResponseData, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    )
}
