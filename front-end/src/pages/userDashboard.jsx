import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudentDetails from "./StudentDetails";
import PreferenceDetails from "./preference";
import "../styles/userPage.css";

export default function UserDashboard() {
  const location = useLocation();
  const [studentId, setStudentId] = useState(location.state?.studentId || null);
  const [activeTab, setActiveTab] = useState("student"); 

  return (
    <div>
      <Navbar />
      
      <div className="dashboard-container">
        <h2> User Dashboard</h2>
        

        <div className="tab-header">
          <button 
            className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
            onClick={() => setActiveTab("student")}
          >
             Student Details
          </button>
          
          <button 
            className={`tab-btn ${activeTab === "preference" ? "active" : ""}`}
            onClick={() => {
              if (!studentId) {
                alert("Please save your student details first to unlock preferences!");
                setActiveTab("student");
                return;
              }
              setActiveTab("preference");
            }}
          >
         College Preferences
          </button>
        </div>


        <div className="tab-content">
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