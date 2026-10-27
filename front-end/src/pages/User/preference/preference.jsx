import Button from "../../../components/Button/Button";
import { usePreferenceDetails } from "../../../hooks/preferencesHook";
import './preference.css';

export default function PreferenceDetails({ studentId }) {
    const {
        formData,
        handleChange,
        handleSubmit,
        loading,
        success,
        error,
    } = usePreferenceDetails(studentId);

    return (
        <div>
            <div className="student-preference">
                <h2 className="preference-title">Enter Student College Preferences</h2>

                {success && <div className="student-success">{success}</div>}
                {error && <div className="student-error">{error}</div>}

                <form onSubmit={handleSubmit} className="preference-form">
                    
                    <div className="form-group">
                        <label className="form-label">Student ID</label>
                        <input 
                            type="number" 
                            name="student_id" 
                            value={formData.student_id} 
                            onChange={handleChange}
                            min="1"
                            required
                            className="form-input"
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">College ID</label>
                        <input 
                            type="number" 
                            name="college_id" 
                            value={formData.college_id} 
                            onChange={handleChange} 
                            required 
                            className="form-input"
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">College Branch ID</label>
                        <input 
                            type="number" 
                            name="college_branch_id" 
                            value={formData.college_branch_id} 
                            onChange={handleChange} 
                            required 
                            className="form-input"
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">Preference Order</label>
                        <input 
                            type="number" 
                            name="preference_order" 
                            value={formData.preference_order} 
                            onChange={handleChange} 
                            required 
                            className="form-input"
                        />
                    </div>


                    <div className="form-button-wrapper">
                        <Button 
                            label={loading ? 'Saving...' : 'Save Preference'} 
                            type="submit" 
                            variant="primary" 
                            disabled={loading} 
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}