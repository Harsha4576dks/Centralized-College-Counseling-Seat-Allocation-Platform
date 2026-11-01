import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import StudentDetails from "../StudentDetails/StudentDetails";
import PreferenceDetails from "../preference/preference";
import "./userDashboard.css";

export default function UserDashboard() {
  const location = useLocation();
  const [studentId, setStudentId] = useState(location.state?.studentId || null);
  const [activeTab, setActiveTab] = useState("student"); 

  return (
    <div className="user-dashboard-page">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="tab-header" role="tablist" aria-label="Counselling steps">
          <button 
            className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
            id="student-details-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "student"}
            aria-controls="student-details-panel"
            onClick={() => setActiveTab("student")}
          >
            <span className="tab-step">01</span>
            <span>Student details</span>
          </button>
          
          <button 
            className={`tab-btn ${activeTab === "preference" ? "active" : ""}`}
            id="student-preferences-tab"
            type="button"
            role="tab"
            aria-selected={activeTab === "preference"}
            aria-controls="student-preferences-panel"
            onClick={() => {
              if (!studentId) {
                alert("Please save your student details first to unlock preferences!");
                setActiveTab("student");
                return;
              }
              setActiveTab("preference");
            }}
          >
            <span className="tab-step">02</span>
            <span>College preferences</span>
          </button>
        </div>


        <div className="tab-content" role="tabpanel" id={activeTab === "student" ? "student-details-panel" : "student-preferences-panel"} aria-labelledby={activeTab === "student" ? "student-details-tab" : "student-preferences-tab"}>
          {activeTab === "student" && (
            <StudentDetails 
              onStudentSaved={(newId) => {
                setStudentId(newId);
                setActiveTab("preference"); 
              }} 
            />
          )}

          {activeTab === "preference" && (
            <PreferenceDetails studentId={studentId} />
          )}
        </div>
      </div>
    </div>
  );
}