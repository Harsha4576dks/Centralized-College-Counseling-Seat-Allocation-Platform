import { useState } from "react";
import Navbar from "../../components/Navbar";
import StudentManagement from "../Admin/studentManagement";
import "../../styles/adminPage.css";
import PreferenceManagement from "./preferenceManagement";
import CollegeManagement from "./collegeManagement";
import CollegeBranchManagement from "./collegeBranchManagement";
import CounsellingRoundManagement from "./counsellingManagement";
import SeatAllocationManagement from "./seatAllocationManagement"; 

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div>
            <Navbar />
            
            <div className="dashboard-container">
                <h2>Admin Dashboard</h2>

                <div className="admin-dashboard-layout">
                    <div className="tab-header vertical-tabs">
                        <button 
                            className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
                            onClick={() => setActiveTab("student")}
                        >
                            Student Details
                        </button>

                        <button 
                            className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
                            onClick={() => setActiveTab("preferences")}
                        >
                            Student Preferences
                        </button>
                   
                        <button 
                            className={`tab-btn ${activeTab === "college" ? "active" : ""}`}
                            onClick={() => setActiveTab("college")}
                        >
                            College Details
                        </button>
                   
                        <button 
                            className={`tab-btn ${activeTab === "collegeBranches" ? "active" : ""}`}
                            onClick={() => setActiveTab("collegeBranches")}
                        >
                            College Branches
                        </button>
                   
                        <button 
                            className={`tab-btn ${activeTab === "counsellingRound" ? "active" : ""}`}
                            onClick={() => setActiveTab("counsellingRound")}
                        >
                            Counselling Round
                        </button>
                   
                        <button 
                            className={`tab-btn ${activeTab === "seatAllocation" ? "active" : ""}`}
                            onClick={() => setActiveTab("seatAllocation")}
                        >
                            Seat Allocation
                        </button>
                    </div>

                    <div className="tab-content-area">
                        {activeTab === "student" && <StudentManagement />}
                        {activeTab === "preferences" && <PreferenceManagement />}
                        {activeTab === "college" && <CollegeManagement />}
                        {activeTab === "collegeBranches" && <CollegeBranchManagement />}
                        {activeTab === "counsellingRound" && <CounsellingRoundManagement />}
                        {activeTab === "seatAllocation" && <SeatAllocationManagement />}
                    </div>
                </div>
            </div>
        </div>
    );
}