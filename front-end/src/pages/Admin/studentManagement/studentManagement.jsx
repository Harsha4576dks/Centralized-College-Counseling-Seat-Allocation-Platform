import { useEffect, useState } from "react";
import { 
    getStudentDetails,
    getStudentbyId, 
    updateStudentDetails, 
    deleteStudentDetails 
} from "../../../services/StudentService";
import { getErrorMessage } from "../../../utils/errorHandler";
import "./studentManagement.css";

export default function StudentManagement() {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [studentList, setStudentList] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        roll_number: "",
        cetRank: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        let isCurrent = true;

        const fetchStudents = async () => {
            setListLoading(true);
            setError("");
            try {
                const students = await getStudentDetails();
                if (isCurrent) {
                    setStudentList(students);
                }
            } catch (fetchError) {
                if (isCurrent) {
                    setError(getErrorMessage(fetchError));
                }
            } finally {
                if (isCurrent) {
                    setListLoading(false);
                }
            }
        };

        fetchStudents();
        return () => {
            isCurrent = false;
        };
    }, []);

    const handleEditClick = () => {
        if (!studentData) return;
        setIsEditing(true);
        setFormData({
            fullName: studentData.name || "",
            roll_number: studentData.roll_number || "",
            cetRank: studentData.rank || "",
            email: studentData.email || "",
            phone: studentData.phone || "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                fullName: formData.fullName,
                roll_number: formData.roll_number,
                email: formData.email,
                phone: formData.phone,
                rank: formData.cetRank, 
            };

            const updated = await updateStudentDetails(studentData.id, payload);
            setSuccess("Student updated successfully!");
            setIsEditing(false);
            setStudentData(updated);
            setStudentList((currentStudents) =>
                currentStudents.map((student) => student.id === updated.id ? updated : student)
            );
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deleteStudentDetails(id);
            setSuccess("Student deleted successfully!");
            setStudentData(null);
            setStudentList((currentStudents) => currentStudents.filter((student) => student.id !== id));
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const showStudent = async (studentId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        setIsEditing(false);

        try {
            const student = await getStudentbyId(studentId);
            setStudentData(student);
        } catch (fetchError) {
            setError(getErrorMessage(fetchError));
        } finally {
            setLoading(false);
        }
    };

    const editStudent = (student) => {
        setStudentData(student);
        setError("");
        setSuccess("");
        setIsEditing(true);
        setFormData({
            fullName: student.name || "",
            roll_number: student.roll_number || "",
            cetRank: student.rank || "",
            email: student.email || "",
            phone: student.phone || "",
        });
    };

    return (
        <div className="student-management-container">
            <h3>Student Database Management</h3>

            {error && <div className="student-error">{error}</div>}
            {success && <div className="student-success">{success}</div>}

            {isEditing && studentData && (
                <form onSubmit={handleUpdateSubmit} className="edit-form student-record-panel">
                    <h4>Edit Student (ID: {studentData.id})</h4>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Roll Number</label>
                        <input type="number" name="roll_number" value={formData.roll_number} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>CET Rank</label>
                        <input type="number" name="cetRank" value={formData.cetRank} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="number" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Updating..." : "Update Student"}
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {studentData && !isEditing && (
                <div className="student-details-card student-record-panel">
                    <h4>Student Record Found</h4>
                    <p><strong>ID:</strong> {studentData.id}</p>
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Roll No:</strong> {studentData.roll_number}</p>
                    <p><strong>Rank:</strong> {studentData.rank}</p>
                    <p><strong>Email:</strong> {studentData.email}</p>
                    <p><strong>Phone:</strong> {studentData.phone}</p>

                    <div className="student-details-actions">
                        <button type="button" className="edit-btn" onClick={handleEditClick}>Edit</button>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDelete(studentData.id)}
                            disabled={loading}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            <section className="student-directory" aria-labelledby="student-directory-title">
                <div className="student-directory-heading">
                    <div>
                        <h4 id="student-directory-title">Registered students</h4>
                        <p>View or manage a student record directly from this list.</p>
                    </div>
                    <span className="student-count">
                        {listLoading ? "Loading..." : `${studentList.length} ${studentList.length === 1 ? "student" : "students"}`}
                    </span>
                </div>

                {listLoading ? (
                    <p className="student-list-status" role="status">Loading student list...</p>
                ) : studentList.length === 0 ? (
                    <p className="student-list-status">No student records are available.</p>
                ) : (
                    <div className="student-list-scroll">
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Student ID</th>
                                    <th scope="col">Roll number</th>
                                    <th scope="col">CET rank</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((student) => (
                                    <tr key={student.id}>
                                        <td className="student-name-cell">{student.name}</td>
                                        <td>{student.id}</td>
                                        <td>{student.roll_number}</td>
                                        <td>{student.rank}</td>
                                        <td>
                                            <div className="student-row-actions">
                                                <button
                                                    type="button"
                                                    className="edit-btn"
                                                    onClick={() => showStudent(student.id)}
                                                    disabled={loading}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    type="button"
                                                    className="edit-btn"
                                                    onClick={() => editStudent(student)}
                                                    disabled={loading}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(student.id)}
                                                    disabled={loading}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

        </div>
    );
}