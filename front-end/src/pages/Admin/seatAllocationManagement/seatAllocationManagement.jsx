import { useEffect, useMemo, useState } from "react";
import { useSeatAllocationDetails } from "../../../hooks/seatAllocationHook";
import { getStudentDetails } from "../../../services/StudentService";
import { getErrorMessage } from "../../../utils/errorHandler";
import "./seatAllocationManagement.css";

export default function SeatAllocationManagement() {
    const {
        allocationData,
        loading,
        success,
        error,
        handleFetchByAllocationId,
        handleFetchByStudentName,
        handleDeleteAllocation,
    } = useSeatAllocationDetails();

    const [allocationIdInput, setAllocationIdInput] = useState("");
    const [studentNameInput, setStudentNameInput] = useState("");
    const [students, setStudents] = useState([]);
    const [studentListError, setStudentListError] = useState("");
    const [showStudentSuggestions, setShowStudentSuggestions] = useState(false);

    useEffect(() => {
        let isCurrent = true;

        const fetchStudents = async () => {
            try {
                const studentRecords = await getStudentDetails();
                if (isCurrent) setStudents(studentRecords);
            } catch (fetchError) {
                if (isCurrent) setStudentListError(getErrorMessage(fetchError));
            }
        };

        fetchStudents();
        return () => {
            isCurrent = false;
        };
    }, []);

    const matchingStudents = useMemo(() => {
        const query = studentNameInput.trim().toLocaleLowerCase();
        if (!query || !showStudentSuggestions) return [];
        return students
            .filter((student) => student.name?.toLocaleLowerCase().startsWith(query))
            .slice(0, 8);
    }, [showStudentSuggestions, studentNameInput, students]);

    const onSearchByAllocationId = (e) => {
        e.preventDefault();
        handleFetchByAllocationId(allocationIdInput);
    };

    const onSearchByStudentName = (e) => {
        e.preventDefault();
        setShowStudentSuggestions(false);
        handleFetchByStudentName(studentNameInput);
    };

    const selectStudent = (student) => {
        setStudentNameInput(student.name);
        setShowStudentSuggestions(false);
        handleFetchByStudentName(student.name);
    };

    return (
        <div className="branch-managemnt-container">
            <h3>Seat Allocation Management</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}


            <div className="search-sections-wrapper">
                <form onSubmit={onSearchByAllocationId} className="edit-form search-box">
                    <h4>Search by Allocation ID</h4>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={allocationIdInput} 
                            onChange={(e) => setAllocationIdInput(e.target.value)} 
                            placeholder="Enter Allocation ID..."
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Searching..." : "Fetch by Allocation ID"}
                        </button>
                    </div>
                </form>


                <form onSubmit={onSearchByStudentName} className="edit-form search-box">
                    <h4>Search by Student Name</h4>
                    <div className="form-group student-name-autocomplete">
                        <input 
                            type="text" 
                            value={studentNameInput} 
                            onChange={(e) => {
                                setStudentNameInput(e.target.value);
                                setShowStudentSuggestions(true);
                            }} 
                            onFocus={() => setShowStudentSuggestions(true)}
                            onBlur={() => window.setTimeout(() => setShowStudentSuggestions(false), 120)}
                            placeholder="Enter Student Name..."
                            className="form-input"
                            autoComplete="off"
                            role="combobox"
                            aria-autocomplete="list"
                            aria-expanded={matchingStudents.length > 0}
                            aria-controls="seat-allocation-student-suggestions"
                            required
                        />
                        {matchingStudents.length > 0 && (
                            <ul id="seat-allocation-student-suggestions" className="student-name-suggestions" role="listbox">
                                {matchingStudents.map((student) => (
                                    <li key={student.id} role="option" aria-selected="false">
                                        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => selectStudent(student)}>
                                            <span>{student.name}</span>
                                            <small>Student ID {student.id}</small>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Searching..." : "Fetch by Student Name"}
                        </button>
                    </div>
                    {studentListError && <p className="student-list-error" role="alert">{studentListError}</p>}
                </form>
            </div>


            {allocationData && (
                <div className="edit-form results-panel" style={{ marginTop: "20px" }}>
                    <h4>Allocation Details</h4>
                    <div className="allocation-results-box">
                        <pre style={{ background: "#edf2f7", padding: "12px", borderRadius: "4px", fontSize: "13px", overflowX: "auto" }}>
                            {JSON.stringify(allocationData, null, 2)}
                        </pre>
                        
                        {allocationData.id && (
                            <div className="button-group" style={{ marginTop: "15px" }}>
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteAllocation(allocationData.id)} 
                                    className="delete-btn"
                                    disabled={loading}
                                >
                                    Delete Allocation
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}