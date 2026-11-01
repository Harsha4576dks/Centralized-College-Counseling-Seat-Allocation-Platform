import Button from "../../../components/Button/Button";
import { useStudentDetails } from "../../../hooks/studentHook";
import './StudentDetails.css';

export default function StudentDetails({ onStudentSaved }) {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    success,
    error,
  } = useStudentDetails(onStudentSaved);

  return (
    <section className="student-container" aria-labelledby="student-details-title">
      <header className="student-form-heading">
        <span className="student-step-mark" aria-hidden="true">01</span>
        <div>
          <p className="student-form-eyebrow">YOUR PROFILE</p>
          <h2 className="student-title" id="student-details-title">Student details</h2>
        </div>
      </header>

      {success && <div className="student-success" role="status">{success}</div>}
      {error && <div className="student-error" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} className="student-form">
        <div className="student-field">
          <label className="student-field-label" htmlFor="student-full-name">Full name</label>
          <input
            id="student-full-name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Enter your name as on your CET record"
            required
            className="student-field-input"
          />
        </div>

        <div className="student-field">
          <label className="student-field-label" htmlFor="student-roll-number">Roll number</label>
          <input
            id="student-roll-number"
            type="text"
            name="roll_number"
            value={formData.roll_number}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter your CET roll number"
            required
            className="student-field-input"
          />
        </div>

        <div className="student-field">
          <label className="student-field-label" htmlFor="student-cet-rank">CET rank</label>
          <input
            id="student-cet-rank"
            type="number"
            name="cetRank"
            value={formData.cetRank}
            onChange={handleChange}
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="Enter your rank"
            required
            className="student-field-input"
          />
          <span className="student-field-hint">Use the rank shown on your CET scorecard.</span>
        </div>

        <div className="student-field">
          <label className="student-field-label" htmlFor="student-email">Email address</label>
          <input
            id="student-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="student-field-input"
          />
        </div>

        <div className="student-field">
          <label className="student-field-label" htmlFor="student-phone">Phone number</label>
          <input
            id="student-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
            placeholder="Enter contact number"
            required
            className="student-field-input"
          />
        </div>

        <div className="student-submit">
          <Button
            label={loading ? 'Saving...' : 'Save & Continue'}
            type="submit"
            variant="primary"
            disabled={loading}
          />
          <span>Your details are used for the counselling allocation process.</span>
        </div>
      </form>
    </section>
  );
}