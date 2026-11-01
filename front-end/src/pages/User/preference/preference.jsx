import Button from "../../../components/Button/Button";
import { usePreferenceDetails } from "../../../hooks/preferencesHook";
import './preference.css';

export default function PreferenceDetails({ studentId }) {
    const {
        formData,
        handleChange,
        handleSubmit,
        loading,
        loadingColleges,
        success,
        error,
        collegeSuggestions,
        collegeError,
        activeCollegeIndex,
        selectedCollege,
        handleCollegeSelect,
        handleCollegeKeyDown,
        branchSuggestions,
        branchError,
        loadingBranches,
        activeBranchIndex,
        selectedBranch,
        handleBranchSelect,
        handleBranchKeyDown,
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
            {collegeError && <div className="student-error" role="alert">{collegeError}</div>}
            {branchError && <div className="student-error" role="alert">{branchError}</div>}

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

                <div className="form-group college-autocomplete">
                    <label className="form-label" htmlFor="preference-college-name">College name</label>
                    <input
                        id="preference-college-name"
                        type="text"
                        name="college_name"
                        value={formData.college_name}
                        onChange={handleChange}
                        onKeyDown={handleCollegeKeyDown}
                        autoComplete="off"
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={collegeSuggestions.length > 0 && !selectedCollege}
                        aria-controls={
                            collegeSuggestions.length > 0 && !selectedCollege
                                ? "college-suggestions"
                                : undefined
                        }
                        aria-activedescendant={
                            activeCollegeIndex >= 0 && collegeSuggestions[activeCollegeIndex]
                                ? `college-suggestion-${collegeSuggestions[activeCollegeIndex].id}`
                                : undefined
                        }
                        placeholder={loadingColleges ? "Loading colleges..." : "Start typing a college name"}
                        required
                        className="form-input"
                    />
                    {collegeSuggestions.length > 0 && !selectedCollege && (
                        <ul className="college-suggestions" id="college-suggestions" role="listbox" aria-label="Colleges">
                            {collegeSuggestions.map((college, index) => (
                                <li key={college.id} role="presentation">
                                    <button
                                        id={`college-suggestion-${college.id}`}
                                        type="button"
                                        role="option"
                                        aria-selected={index === activeCollegeIndex}
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => handleCollegeSelect(college)}
                                    >
                                        {college.college_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {formData.college_name.trim() && !loadingColleges &&
                        collegeSuggestions.length === 0 && !selectedCollege && (
                            <span className="college-suggestion-empty" role="status">No colleges match that name.</span>
                        )}
                </div>

                <div className="form-group college-autocomplete">
                    <label className="form-label" htmlFor="preference-branch-name">Branch</label>
                    <input
                        id="preference-branch-name"
                        type="text"
                        name="branch_name"
                        value={formData.branch_name}
                        onChange={handleChange}
                        onKeyDown={handleBranchKeyDown}
                        autoComplete="off"
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={branchSuggestions.length > 0 && !selectedBranch}
                        aria-controls={
                            branchSuggestions.length > 0 && !selectedBranch
                                ? "branch-suggestions"
                                : undefined
                        }
                        aria-activedescendant={
                            activeBranchIndex >= 0 && branchSuggestions[activeBranchIndex]
                                ? `branch-suggestion-${branchSuggestions[activeBranchIndex].id}`
                                : undefined
                        }
                        placeholder={
                            !selectedCollege
                                ? "Choose a college first"
                                : loadingBranches
                                    ? "Loading branches..."
                                    : "Type a branch name or ID"
                        }
                        disabled={!selectedCollege || loadingBranches || Boolean(branchError)}
                        required
                        className="form-input"
                    />
                    {branchSuggestions.length > 0 && !selectedBranch && (
                        <ul className="college-suggestions" id="branch-suggestions" role="listbox" aria-label="Branches">
                            {branchSuggestions.map((branch, index) => (
                                <li key={branch.id} role="presentation">
                                    <button
                                        id={`branch-suggestion-${branch.id}`}
                                        type="button"
                                        role="option"
                                        aria-selected={index === activeBranchIndex}
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => handleBranchSelect(branch)}
                                    >
                                        {branch.branch_name} <span>(ID: {branch.id})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedCollege && formData.branch_name.trim() &&
                        !loadingBranches && branchSuggestions.length === 0 && !selectedBranch && (
                            <span className="college-suggestion-empty" role="status">
                                No branches match that name or ID for this college.
                            </span>
                        )}
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