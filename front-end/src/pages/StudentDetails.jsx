import Button from "../components/Button";
import { useStudentDetails } from "../hooks/studentHook";
import '../styles/studentDetails.css';

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
    <div>
      <div className="student-container">
        <h2 className="student-title">Enter Student Details</h2>
        <p className="student-desc">Please fill out your credentials for the counseling allocation process.</p>

        {success && <div className="student-success">{success}</div>}
        {error && <div className="student-error">{error}</div>}

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Roll Number</label>
            <input 
              type="text" 
              name="roll_number" 
              value={formData.roll_number} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">CET Rank</label>
            <input 
              type="number" 
              name="cetRank" 
              value={formData.cetRank} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-button-wrapper">
            <Button 
              label={loading ? 'Saving...' : 'Save & Continue'} 
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