import { useState } from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import { saveStudentDetails } from "../services/StudentService";
import './Home.css';
import './studentDetails.css';

export default function StudentDetails(){
 

    const [formData, setFormData] = useState({fullName: '', roll_number: '', cetRank: '', email: '', phone: ''});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await saveStudentDetails(formData);
      setSuccess('Student details saved successfully!');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
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