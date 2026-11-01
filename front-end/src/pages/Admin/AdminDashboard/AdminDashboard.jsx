import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import StudentManagement from "../studentManagement/studentManagement";
import "./AdminDashboard.css";
import PreferenceManagement from "../preferenceManagement/preferenceManagement";
import CollegeManagement from "../collegeManagement/collegeManagement";
import CollegeBranchManagement from "../collegeBranchManagement/collegeBranchManagement";
import CounsellingRoundManagement from "../counsellingManagement/counsellingManagement";
import SeatAllocationManagement from "../seatAllocationManagement/seatAllocationManagement";
import EmailManagement from "../emailManagement/emailManagement";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("student");

    return (
        <div className="admin-workspace">
            <Navbar />

            <div className="dashboard-container">
                <header className="admin-dashboard-heading">
                    <p className="admin-dashboard-eyebrow">CET COUNSELLING CELL</p>
                    <h2>Admin Dashboard</h2>
                    <p>Manage student records, colleges, and counselling operations.</p>
                </header>

                <div className="admin-dashboard-layout">
                    <div className="tab-header vertical-tabs" role="tablist" aria-label="Admin management sections">
                        <button
                            type="button"
                            id="admin-tab-student"
                            role="tab"
                            aria-selected={activeTab === "student"}
                            className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
                            onClick={() => setActiveTab("student")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">01</span>
                            Student Details
                        </button>

                        <button
                            type="button"
                            id="admin-tab-preferences"
                            role="tab"
                            aria-selected={activeTab === "preferences"}
                            className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
                            onClick={() => setActiveTab("preferences")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">02</span>
                            Student Preferences
                        </button>

                        <button
                            type="button"
                            id="admin-tab-college"
                            role="tab"
                            aria-selected={activeTab === "college"}
                            className={`tab-btn ${activeTab === "college" ? "active" : ""}`}
                            onClick={() => setActiveTab("college")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">03</span>
                            College Details
                        </button>

                        <button
                            type="button"
                            id="admin-tab-branches"
                            role="tab"
                            aria-selected={activeTab === "collegeBranches"}
                            className={`tab-btn ${activeTab === "collegeBranches" ? "active" : ""}`}
                            onClick={() => setActiveTab("collegeBranches")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">04</span>
                            College Branches
                        </button>

                        <button
                            type="button"
                            id="admin-tab-round"
                            role="tab"
                            aria-selected={activeTab === "counsellingRound"}
                            className={`tab-btn ${activeTab === "counsellingRound" ? "active" : ""}`}
                            onClick={() => setActiveTab("counsellingRound")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">05</span>
                            Counselling Round
                        </button>

                        <button
                            type="button"
                            id="admin-tab-allocation"
                            role="tab"
                            aria-selected={activeTab === "seatAllocation"}
                            className={`tab-btn ${activeTab === "seatAllocation" ? "active" : ""}`}
                            onClick={() => setActiveTab("seatAllocation")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">06</span>
                            Seat Allocation
                        </button>

                        <button
                            type="button"
                            id="admin-tab-email"
                            role="tab"
                            aria-selected={activeTab === "emailResponse"}
                            className={`tab-btn ${activeTab === "emailResponse" ? "active" : ""}`}
                            onClick={() => setActiveTab("emailResponse")}
                        >
                            <span className="admin-tab-mark" aria-hidden="true">07</span>
                            Email Response
                        </button>
                    </div>

                    <div
                        className="tab-content-area"
                        role="tabpanel"
                        aria-labelledby={`admin-tab-${{
                            student: "student",
                            preferences: "preferences",
                            college: "college",
                            collegeBranches: "branches",
                            counsellingRound: "round",
                            seatAllocation: "allocation",
                            emailResponse: "email",
                        }[activeTab]}`}
                    >
                        {activeTab === "student" && <StudentManagement />}
                        {activeTab === "preferences" && <PreferenceManagement />}
                        {activeTab === "college" && <CollegeManagement />}
                        {activeTab === "collegeBranches" && <CollegeBranchManagement />}
                        {activeTab === "counsellingRound" && <CounsellingRoundManagement />}
                        {activeTab === "seatAllocation" && <SeatAllocationManagement />}
                        {activeTab === "emailResponse" && <EmailManagement />}
                    </div>
                </div>
            </div>
        </div>
    );
}
