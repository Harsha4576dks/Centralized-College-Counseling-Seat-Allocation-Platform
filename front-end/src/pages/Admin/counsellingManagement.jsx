import { useCounsellingRoundDetails } from "../../hooks/counsellingRoundHook";
import "../../styles/counsellingRoundManagement.css";

export default function CounsellingRoundManagement() {
    const {
        formData,
        handleChange,
        handleSubmit,
        loading,
        success,
        error,
    } = useCounsellingRoundDetails();

    return (
        <div className="branch-managemnt-container">
            <h3>Counselling Round Management</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}

            <form onSubmit={handleSubmit} className="edit-form">
                <h4>Add New Counselling Round</h4>

                <div className="form-group">
                    <label>Round Number</label>
                    <input 
                        type="number" 
                        name="round_Number" 
                        value={formData.round_Number} 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                        placeholder="Enter round number..."
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <input 
                        type="text" 
                        name="status" 
                        value={formData.status} 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                        placeholder="e.g., Active, Completed"
                    />
                </div>

                <div className="form-group">
                    <label>Start Date</label>
                    <input 
                        type="date" 
                        name="start_date" 
                        value={formData.start_date} 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />
                </div>

                <div className="form-group">
                    <label>End Date</label>
                    <input 
                        type="date" 
                        name="end_date" 
                        value={formData.end_date} 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? "Saving..." : "Save Counselling Round"}
                    </button>
                </div>
            </form>
        </div>
    );
}