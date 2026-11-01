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
        <section className="student-preference" aria-labelledby="preference-title">
            <header className="preference-heading">
                <span className="preference-step-mark" aria-hidden="true">02</span>
                <div>
                    <p className="preference-eyebrow">YOUR CHOICES</p>
                    <h2 className="preference-title" id="preference-title">College preferences</h2>
                    <p className="preference-description">
                        Add a college and branch for each choice. Use a lower order number for a higher preference.
                    </p>
                </div>
            </header>

            {success && <div className="student-success" role="status">{success}</div>}
            {error && <div className="student-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} className="preference-form">
                <div className="form-group">
                    <label className="form-label" htmlFor="preference-student-id">Student ID</label>
                    <input
                        id="preference-student-id"
                        type="number"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        placeholder="Your saved student ID"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="preference-college-id">College ID</label>
                    <input
                        id="preference-college-id"
                        type="number"
                        name="college_id"
                        value={formData.college_id}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        placeholder="Enter the college ID"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="preference-branch-id">College branch ID</label>
                    <input
                        id="preference-branch-id"
                        type="number"
                        name="college_branch_id"
                        value={formData.college_branch_id}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        placeholder="Enter the branch ID"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="preference-order">Preference order</label>
                    <input
                        id="preference-order"
                        type="number"
                        name="preference_order"
                        value={formData.preference_order}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        placeholder="1 means your top choice"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-button-wrapper">
                    <Button
                        label={loading ? 'Saving...' : 'Save preference'}
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    />
                </div>
            </form>
        </section>
    );
}