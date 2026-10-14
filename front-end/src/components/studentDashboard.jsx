import { useStudent } from '../hooks/useStudent';

export default function StudentDashboard({studentId}) {
    const {student, preferences, loading, error} = useStudent(studentId);

    if (loading) return <div>Loading details...</div>;
    if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

    return (
        <div style={{padding: '20px'}}>
            {student && (
                <header>
                    <h2>{student.name}</h2>
                    <p>Email: {student.email}</p>
                    <p>Roll Number: {student.roll_number}</p>
                    <p>Rank: {student.rank}</p>
                </header>
            )}

            <h3>Preferences</h3>
            <ul>
                {preferences.map((item, index)=> (
                    <li key={item.id || index}>
                        Preference #{item.preference_order}: {item.college_name || item.course_id}
                    </li>
                ))}
            </ul>
        </div>
    );
}