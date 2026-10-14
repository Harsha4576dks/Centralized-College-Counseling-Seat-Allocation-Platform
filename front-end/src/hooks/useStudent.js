import { useState, useEffect} from "react";
import { getStudentDetails,  getStudentPreferences,  updateStudentPreferences} from '../services/studentService';

export const useStudent = (studentId) => {
    const [student, setStudent] = useState(null);
    const [preferences, setPreferences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        if(!studentId) return;

        const fetchData = async ()=>{
            setLoading(true);
            setError(null);
            try{
                const detailsData = await getStudentDetails(studentId);
                const preferencesData = await getStudentPreferences(studentId);

                setStudent(detailsData);
                setPreferences(preferencesData);
            }catch (err) {
                setError(err.response?.data?.detail || err.message || 'Failed to load student data');
            }finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [studentId]);


    const savePreferences  = async (newPreferences) => {
        setLoading(true);
        try{
            const updated = await updateStudentPreferences(studentId, newPreferences);
            setPreferences(updated);
            return updated;
        }catch (err) {
            setError(err.response?.data?.detail || 'Failed to update preferences');
        } finally {
            setLoading(false);
        }
    };

    return {student, preferences, loading, error, savePreferences};
};